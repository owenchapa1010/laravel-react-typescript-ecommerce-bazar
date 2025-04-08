import { Head, Link } from "@inertiajs/react";
import CurrencyFormatter from "@/Components/Core/CurrencyFormatter";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, Order } from "@/types";

function Success({ orders }: PageProps<{ orders: Order[] }>) {
    return (
        <AuthenticatedLayout>
            <Head title="Payment Was Completed" />
            <div className="w-full max-w-4xl mx-auto py-20 px-6 sm:px-8 lg:px-10">
                <div className="flex flex-col items-center text-center space-y-8">
                    <CheckCircleIcon className="w-24 h-24 text-emerald-500" />
                    <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white">
                        Payment Successful
                    </h1>
                    <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl">
                        Your payment has been successfully processed. Thank you for your purchase! Here are the details of your order.
                    </p>
                </div>

                <div className="mt-14 space-y-10">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="bg-white dark:bg-gray-800 rounded-xl p-10 border border-gray-300 dark:border-gray-700 shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                        >
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                                Order Summary
                            </h2>

                            <div className="space-y-6">
                                <div className="flex justify-between text-lg text-gray-600 dark:text-gray-400">
                                    <span className="font-semibold">Seller</span>
                                    <Link
                                        href="#"
                                        className="text-blue-600 dark:text-blue-400 hover:underline"
                                    >
                                        {order.vendorUser.store_name}
                                    </Link>
                                </div>

                                <div className="flex justify-between text-lg text-gray-600 dark:text-gray-400">
                                    <span className="font-semibold">Order Number</span>
                                    <Link
                                        href="#"
                                        className="text-blue-600 dark:text-blue-400 hover:underline"
                                    >
                                        #{order.id}
                                    </Link>
                                </div>

                                <div className="flex justify-between text-lg text-gray-600 dark:text-gray-400">
                                    <span className="font-semibold">Items</span>
                                    <span>{order.orderItems.length}</span>
                                </div>

                                <div className="flex justify-between text-lg text-gray-600 dark:text-gray-400">
                                    <span className="font-semibold">Total</span>
                                    <CurrencyFormatter amount={order.total_price} />
                                </div>
                            </div>

                            <div className="mt-10 flex justify-between gap-6">
                                <Link
                                    href="#"
                                    className="inline-block bg-blue-600 text-white rounded-lg py-4 px-8 text-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
                                >
                                    View Order Details
                                </Link>
                                <Link
                                    href={route("dashboard")}
                                    className="inline-block bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg py-4 px-8 text-lg font-semibold hover:bg-gray-400 dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
                                >
                                    Back To Home
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Success;
