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
    const hasCartItems = Object.keys(cartItems).length > 0;

    return (
        <AuthenticatedLayout>
            <Head title="Your cart" />

            <div className="container mx-auto p-4 md:p-6 lg:p-8">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                    {/* Cart Items Section */}
                    <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-md transition-all duration-300 overflow-hidden">
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
                                Shopping Cart
                            </h2>
                            
                            {!hasCartItems ? (
                                <div className="py-8 text-gray-500 text-center">
                                    You don't have any items yet.
                                </div>
                            ) : (
                                <div className="space-y-8">
                                    {Object.values(cartItems).map(cartItem => (
                                        <div key={cartItem.user.id} className="rounded-lg overflow-hidden">
                                            {/* Seller Header */}
                                            <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
                                                <Link 
                                                    href="/" 
                                                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium hover:underline transition"
                                                >
                                                    {cartItem.user.name}
                                                </Link>
                                                
                                                <form action={route('cart.checkout')} method="post">
                                                    <input type="hidden" name="_token" value={csrf_token} />
                                                    <input type="hidden" name="vendor_id" value={cartItem.user.id} />
                                                    <button className="flex items-center px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700 transition">
                                                        <CreditCardIcon className="w-4 h-4 mr-2" />
                                                        <span>Pay Only For This Seller</span>
                                                    </button>
                                                </form>
                                            </div>
                                            
                                            {/* Seller Items */}
                                            <div className="space-y-4">
                                                {cartItem.items.map(item => (
                                                    <CartItem item={item} key={item.id} />
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Order Summary Section */}
                    <div className="lg:w-80 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col h-fit">
                        <div className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                            Order Summary
                        </div>
                        
                        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                            <span className="text-gray-600 dark:text-gray-300">
                                Subtotal ({totalQuantity} items)
                            </span>
                            <span className="font-medium text-lg">
                                <CurrencyFormatter amount={totalPrice}/>
                            </span>
                        </div>
                        
                        <form action={route('cart.checkout')} method="post" className="w-full">
                            <input type="hidden" name="_token" value={csrf_token} />
                            <PrimaryButton className="w-full rounded-full py-3 flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white font-medium">
                                <CreditCardIcon className="w-5 h-5 mr-2" />
                                Proceed To Checkout
                            </PrimaryButton>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Index;