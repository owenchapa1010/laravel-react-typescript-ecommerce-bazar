import { PageProps, GroupedCartItems } from "@/types";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from "@inertiajs/react";
import { CreditCardIcon } from "@heroicons/react/16/solid";
import CurrencyFormatter from "@/Components/Core/CurrencyFormatter";
import PrimaryButton from "@/Components/Core/PrimaryButton";
import CartItem from "@/Components/App/CartItem";

function Index({
    csrf_token,
    cartItems,
    totalQuantity,
    totalPrice
}: PageProps<{ cartItems: Record<number, GroupedCartItems> }>) {
    return (
        <div>
            <AuthenticatedLayout>
                <Head title="Your cart" />

                <div className="container mx-auto p-8 flex flex-col lg:flex-row gap-8">
                    {/* Contenedor principal del carrito */}
                    <div className="card flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-all duration-300">
                        <div className="card-body">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                                Shopping Cart
                            </h2>
                            <div className="my-6">
                                {Object.keys(cartItems).length === 0 && (
                                    <div className="py-4 text-gray-500 text-center">
                                        You don't have any items yet.
                                    </div>
                                )}
                                {Object.values(cartItems).map(cartItem => (
                                    <div key={cartItem.user.id} className="mb-8">
                                        <div className="flex items-center justify-between pb-4 border-b border-gray-300 dark:border-gray-600 mb-4">
                                            <Link href="/" className="text-blue-600 hover:underline">
                                                {cartItem.user.name}
                                            </Link>
                                            <div>
                                                <form action={route('cart.checkout')} method="post">
                                                    <input type="hidden" name="_token" value={csrf_token} />
                                                    <input type="hidden" name="vendor_id" value={cartItem.user.id} />
                                                    <button className="btn btn-sm btn-outline-primary">
                                                        <CreditCardIcon className="w-5 h-5 mr-2" />
                                                        Pay Only For This Seller
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                        {cartItem.items.map(item => (
                                            <CartItem item={item} key={item.id} />
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Contenedor para Proceed to Checkout */}
                    <div className="card bg-white dark:bg-gray-800 lg:w-64 rounded-lg shadow-lg p-6 flex flex-col items-center">
                        <div className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                            Subtotal ({totalQuantity} items):
                        </div>
                        <CurrencyFormatter amount={totalPrice}/>
                        <form action={route('cart.checkout')} method="post" className="w-full">
                            <input type="hidden" name="_token" value={csrf_token} />
                            <PrimaryButton className="w-full rounded-full py-3 flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white">
                                <CreditCardIcon className="w-5 h-5 mr-2" />
                                Proceed To Checkout
                            </PrimaryButton>
                        </form>
                    </div>
                </div>
            </AuthenticatedLayout>
        </div>
    );
}

export default Index;
