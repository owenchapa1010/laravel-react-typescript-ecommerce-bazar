import ProductItem from '@/Components/App/ProductItem';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps, PaginationProps, Product } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Home({
    products,
}: PageProps<{ products: PaginationProps<Product> }>) {

    return (
        <AuthenticatedLayout>
            <Head title="Home" />
            
            {/* Hero Section */}
            <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 mix-blend-multiply"></div>
                <div className="container mx-auto px-4 sm:px-6 relative z-10">
                    <div className="max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto text-center">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
                            Find Your Perfect Items
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8">
                            Discover our curated collection of premium products, handpicked for quality and style.
                        </p>
                        
                        {/* Implement in a future a Search Bar 
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <div className="relative flex-grow">
                                <input 
                                    type="text" 
                                    placeholder="What are you looking for?" 
                                    className="w-full py-2 sm:py-3 px-4 sm:px-5 pr-10 sm:pr-12 rounded-lg shadow-lg text-gray-800 border-0 focus:ring-2 focus:ring-blue-400"
                                />
                                <Search className="absolute right-3 sm:right-4 top-2.5 sm:top-3.5 text-gray-400" size={20} />
                            </div>
                            <Link 
                                href="#featured-products" 
                                className="bg-white hover:bg-gray-100 text-blue-600 font-medium py-2 sm:py-3 px-4 sm:px-6 rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap"
                            >
                                Browse Now
                                <ArrowRight size={16} />
                            </Link>
                        </div>*/}
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="bg-gray-50 dark:bg-gray-800 py-6 sm:py-8 border-b border-gray-200 dark:border-gray-700">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="flex overflow-x-auto scrollbar-hide py-1 gap-2 sm:gap-4 justify-start sm:justify-center">
                        {['Electronics', 'Fashion', 'Home & Kitchen', 'Books', 'Sports', 'Beauty', 'Toys'].map((category) => (
                            <Link 
                                key={category} 
                                href="#" 
                                className="px-3 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm sm:text-base font-medium shadow-sm hover:shadow whitespace-nowrap transition-all duration-300 hover:bg-blue-50 dark:hover:bg-gray-600"
                            >
                                {category}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section id="featured-products" className="py-10 sm:py-12 md:py-16 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 md:mb-10">
                        <div className="mb-4 sm:mb-0">
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                                Newest 
                            </h2>
                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1 sm:mt-2">
                                Check the newest items in our store.
                            </p>
                        </div>
                        <Link 
                            href="/products" 
                            className="text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1 self-start sm:self-auto"
                        >
                        </Link>
                    </div>
                    
                    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                        {products.data.map((product) => (
                            <ProductItem product={product} key={product.id} />
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Trust Badges Section */}
            <footer>
                <section className="py-8 sm:py-10 md:py-12 bg-gray-50 dark:bg-gray-800">
                    <div className="container mx-auto px-4 sm:px-6">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-gray-800 dark:text-white mb-6 sm:mb-8 md:mb-10">
                            ¿Why choose Blue Avenue?
                        </h2>
                        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">

                            {/* Ecofriendly */}
                            <div className="p-4 sm:p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                                <div className="flex justify-center mb-3 sm:mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-12 w-12 sm:h-16 sm:w-16 text-green-600 dark:text-green-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m20.893 13.393-1.135-1.135a2.252 2.252 0 0 1-.421-.585l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 0 1-1.383-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.411-2.353a2.25 2.25 0 0 0 .286-.76m11.928 9.869A9 9 0 0 0 8.965 3.525m11.928 9.868A9 9 0 1 1 8.965 3.525" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-base sm:text-lg text-gray-900 dark:text-white mt-3 sm:mt-4 mb-1 sm:mb-2">Ecofriendly</h3>
                                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Environmentally friendly products</p>
                            </div>

                            {/* Nationwide Shipping */}
                            <div className="p-4 sm:p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                                <div className="flex justify-center mb-3 sm:mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-12 w-12 sm:h-16 sm:w-16 text-blue-600 dark:text-blue-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-base sm:text-lg text-gray-900 dark:text-white mt-3 sm:mt-4 mb-1 sm:mb-2">Nationwide Shipping</h3>
                                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Deliver to any part of the country</p>
                            </div>

                            {/* Trendy Clothing & Accessories */}
                            <div className="p-4 sm:p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                                <div className="flex justify-center mb-3 sm:mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-12 w-12 sm:h-16 sm:w-16 text-purple-600 dark:text-purple-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-base sm:text-lg text-gray-900 dark:text-white mt-3 sm:mt-4 mb-1 sm:mb-2">Trendy Clothing & Accessories</h3>
                                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Discover the latest in fashion</p>
                            </div>

                            {/* Tula, Tlahue, Mixquiahuala, and Progreso */}
                            <div className="p-4 sm:p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                                <div className="flex justify-center mb-3 sm:mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-12 w-12 sm:h-16 sm:w-16 text-orange-600 dark:text-orange-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-base sm:text-lg text-gray-900 dark:text-white mt-3 sm:mt-4 mb-1 sm:mb-2">Tula, Tlahue, Mixquiahuala, and Progreso</h3>
                                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Coverage in various areas</p>
                            </div>

                        </div>
                    </div>
                </section>
            </footer>
        </AuthenticatedLayout>
    );
}