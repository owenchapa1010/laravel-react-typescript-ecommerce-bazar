<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Services\CartService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index(CartService $cartService)
    {
        return Inertia::render('Cart/Index', [
            'cartItems' => $cartService->getCartItemsGrouped(),
        ]);
    }

    public function store(Request $request, Product $product, CartService $cartService)
    {
        $request->mergeIfMissing([
            'quantity' =>1
        ]);

        $data = $request->validate([
            'option_ids' => ['nullable', 'array'],
            'quantity'=>['required', 'integer', 'min:1'],

        ]);

        $cartService->addItemToCart(
            $product,
            $data['quantity'], 
            $data['option_ids'] ?: [],
        );

        return back()->with('success', 'Product Was Added To Cart.');
    }

    public function update(Request $request, Product $product, CartService $cartService)
    {
        $request->validate([
            'quantity' => ['integer', 'min:1'],

        ]);

        $optionIds = $request->input('option_ids') ?: [];
        $quantity = $request->input('quantity');

        $cartService->updateItemQuantity($product->id, $quantity, $optionIds);

        return back()->with('success','Quantity Was Updated.');
    }

    public function destroy(Request $request, Product $product, CartService $cartService)
    {
        $optionIds = $request->input('option_ids');

        $cartService->removeItemFromCart($product->id, $optionIds);

        return back()->with('success', 'Product Was Removed From Cart.');
    }

    public function checkout(){

    }
}
