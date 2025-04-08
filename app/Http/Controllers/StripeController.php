<?php

namespace App\Http\Controllers;

use App\Enums\OrderStatusEnum;
use App\Http\Resources\OrderViewResource;
use App\Models\CartItem;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class StripeController extends Controller
{
    public function success(Request $request)
    {
        $user = Auth::user();
        $session_id = $request->get('session_id');
        $orders = Order::where('stripe_session_id', $session_id)
            ->get();
        if ($orders->count() === 0){
            abort(404);
        }
        foreach($orders as $order){
            if ($order->user_id !== $user->id){
                abort(403);
            }
        }
        return Inertia::render('Stripe/Success', [
            'orders' => OrderViewResource::collection($orders)->collection->toArray(),
        ]);
    }

    public function failure()
    {
        //Implement failure logic here in a future
    }

    public function webhook(Request $request)
    {
        $stripe = new \Stripe\StripeClient(config('app.stripe_secret_key'));
        $endpoint_secret = config('app.stripe_webhook_secret');

        $payload = $request->getContent();
        $sig_header = $request->header('Stripe-Signature');
        $event = null;

        try {
            $event = \Stripe\Webhook::constructEvent($payload, $sig_header, $endpoint_secret);
        } catch (\UnexpectedValueException $e) {
            Log::error($e);
            return response('Invalid payload', 400);
        } catch (\Stripe\Exception\SignatureVerificationException $e) {
            Log::error($e);
            return response('Invalid signature', 400);
        }

        Log::info('===== STRIPE WEBHOOK EVENT =====');
        Log::info($event->type);
        Log::info($event);

        switch ($event->type) {
            case 'charge.updated':
                $charge = $event->data->object;
                $transactionId = $charge['balance_transaction'];
                $paymentIntent = $charge['payment_intent'];

                $balanceTransaction = $stripe->balanceTransactions->retrieve($transactionId, []);

                $orders = Order::where('payment_intent', $paymentIntent)->get();
                $totalAmount = $balanceTransaction['amount'];
                $stripeFee = 0;

                foreach ($balanceTransaction['fee_details'] as $fee_detail) {
                    if ($fee_detail['type'] === 'stripe_fee') {
                        $stripeFee = $fee_detail['amount'];
                    }
                }

                $platformFeePercent = config('app.platform_fee_pct');

                foreach ($orders as $order) {
                    $vendorShare = $order->total_price / $totalAmount;

                    $order->online_payment_commission = $vendorShare * $stripeFee;
                    $order->website_comission = ($order->total_price - $order->online_payment_commission) / 100 * $platformFeePercent;
                    $order->vendor_subtotal = $order->total_price - $order->online_payment_commission - $order->website_comission;
                    $order->save();
                }

                break;

            case 'checkout.session.completed':
                $session = $event->data->object;
                $pi = $session['payment_intent'];

                $orders = Order::query()
                    ->with('orderItems')
                    ->where('stripe_session_id', $session['id'])
                    ->get();

                $productsToDeletedFromCart = [];

                foreach ($orders as $order) {
                    $order->payment_intent = $pi;
                    $order->status = OrderStatusEnum::Paid;
                    $order->save();

                    $productsToDeletedFromCart = array_merge(
                        $productsToDeletedFromCart,
                        $order->orderItems->pluck('product_id')->toArray()
                    );

                    foreach ($order->orderItems as $orderItem) {
                        /** @var OrderItem $orderItem */
                        $options = $orderItem->variation_type_option_ids;
                        $product = $orderItem->product;

                        if ($options) {
                            sort($options);
                            $variation = $product->variations()
                                ->where('variation_type_option_ids', $options)
                                ->first();

                            if ($variation && $variation->quantity !== null) {
                                $variation->quantity -= $orderItem->quantity;
                                $variation->save();
                            }
                        } elseif ($product->quantity !== null) {
                            $product->quantity -= $orderItem->quantity;
                            $product->save();
                        }
                    }
                }

                if ($orders->isNotEmpty()) {
                    CartItem::query()
                        ->where('user_id', $orders->first()->user_id)
                        ->whereIn('product_id', $productsToDeletedFromCart)
                        ->where('saved_for_later', false)
                        ->delete();
                }

                break;

            default:
                Log::info('Received unknown event type: ' . $event->type);
                break;
        }

        return response('', 200);
    }
}
