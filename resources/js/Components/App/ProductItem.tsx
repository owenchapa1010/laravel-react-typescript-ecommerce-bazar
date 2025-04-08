import { Product } from "@/types";
import React from "react";
import { Link } from "@inertiajs/react";
import CurrencyFormatter from "../Core/CurrencyFormatter";

function ProductItem({ product }: { product: Product }) {
    return (
        <div className="relative group transition-all duration-300">
            <div className="rounded-xl bg-white dark:bg-gray-900 shadow-sm group-hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-800 h-full flex flex-col ring-0 ring-offset-0 group-hover:ring-2 group-hover:ring-white-400 group-hover:ring-offset-2 group-hover:ring-offset-transparent">
                <Link href={route('product.show', product.slug)}>
                    <div className="relative overflow-hidden">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-72 object-cover transform group-hover:scale-105 transition duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                </Link>
                <div className="p-5 flex flex-col justify-between flex-grow">
                    <div>
                        <div className="flex items-center mb-2">
                            <Link href="/" className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
                                {product.department.name}
                            </Link>
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white line-clamp-2 ">
                            {product.title}
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 mb-4">
                            by <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">{product.user.name}</Link>
                        </p>
                    </div>
                    <div className="flex items-center justify-between pt-4 mt-2 border-t border-gray-100 dark:border-gray-800">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-3 px-5 rounded-lg transition-all duration-300 shadow-sm hover:shadow">
                            Add to Cart
                        </button>
                        <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                            <CurrencyFormatter amount={product.price} />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductItem;
