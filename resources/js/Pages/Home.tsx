import ProductItem from '@/Components/App/ProductItem';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps, PaginationProps, Product } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Search } from 'lucide-react';

export default function Home({
    products,
}: PageProps<{ products: PaginationProps<Product> }>) {
    return (
        <AuthenticatedLayout>
            <Head title="Home" />
            
            {/* Hero Section */}
            <section className="relative py-24 md:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 mix-blend-multiply"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-2xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Find Your Perfect Items
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 mb-8">
                            Discover our curated collection of premium products, handpicked for quality and style.
                        </p>
                        
                        {/* Implement in a future a Search Bar 
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-grow">
                                <input 
                                    type="text" 
                                    placeholder="What are you looking for?" 
                                    className="w-full py-3 px-5 pr-12 rounded-lg shadow-lg text-gray-800 border-0 focus:ring-2 focus:ring-blue-400"
                                />
                                <Search className="absolute right-4 top-3.5 text-gray-400" size={20} />
                            </div>
                            <Link 
                                href="#featured-products" 
                                className="bg-white hover:bg-gray-100 text-blue-600 font-medium py-3 px-6 rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap"
                            >
                                Browse Now
                                <ArrowRight size={16} />
                            </Link>
                        </div>*/}
                    </div>
                </div>
            </section>

            {/* Categories Section, in a future, implement the sections on the database*/}
            <section className="bg-gray-50 dark:bg-gray-800 py-8 border-b border-gray-200 dark:border-gray-700">
                <div className="container mx-auto px-4">
                    <div className="flex overflow-x-auto gap-4 pb-2 scrollbar-hide justify-center"> {/* Centrar los enlaces */}
                        {['Electronics', 'Fashion', 'Home & Kitchen', 'Books', 'Sports', 'Beauty', 'Toys'].map((category) => (
                            <Link 
                                key={category} 
                                href="#" 
                                className="px-5 py-2.5 rounded-full bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium shadow-sm hover:shadow whitespace-nowrap transition-all duration-300 hover:bg-blue-50 dark:hover:bg-gray-600"
                            >
                                {category}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section id="featured-products" className="py-16 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                                Newest 
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">
                                Check the newest items in our store.
                            </p>
                        </div>
                        <Link 
                            href="/products" 
                            className="text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1"
                        >
                        </Link>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                        {products.data.map((product) => (
                            <ProductItem product={product} key={product.id} />
                        ))}
                    </div>
                </div>
            </section>
            
            
            {/* Implement in a future a Promotional Banner for your first purchase 
            <section className="bg-gradient-to-r from-indigo-600 to-blue-500 py-16">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="mb-6 md:mb-0 md:w-1/2">
                            <h2 className="text-3xl font-bold text-white mb-4">
                                Get 20% Off Your First Purchase
                            </h2>
                            <p className="text-white/90 text-lg mb-6">
                                Sign up for our newsletter and receive a special discount code.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <input 
                                    type="email" 
                                    placeholder="Your email address" 
                                    className="px-4 py-3 rounded-lg w-full sm:max-w-xs"
                                />
                                <button className="bg-white hover:bg-gray-100 text-blue-600 font-medium py-3 px-6 rounded-lg transition-all duration-300">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                        <div className="md:w-1/3">
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                                <div className="text-white text-center">
                                    <p className="text-5xl font-bold mb-2">20%</p>
                                    <p className="text-xl font-medium mb-3">DISCOUNT</p>
                                    <p className="text-white/80">Use code: <span className="font-bold">WELCOME20</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>*/}

            {/* Trust Badges Section */}
            <section className="py-12 bg-gray-50 dark:bg-gray-800">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        
                        {/* Ecofriendly */}
                        <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                            <div className="flex justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-16 w-16 text-green-600 dark:text-green-400">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m20.893 13.393-1.135-1.135a2.252 2.252 0 0 1-.421-.585l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 0 1-1.383-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.411-2.353a2.25 2.25 0 0 0 .286-.76m11.928 9.869A9 9 0 0 0 8.965 3.525m11.928 9.868A9 9 0 1 1 8.965 3.525" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-lg text-gray-900 dark:text-white mt-4 mb-2">Ecofriendly</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">Environmentally friendly products</p>
                        </div>

                        {/* Nationwide Shipping */}
                        <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                            <div className="flex justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-16 w-16 text-blue-600 dark:text-blue-400">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-lg text-gray-900 dark:text-white mt-4 mb-2">Nationwide Shipping</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">Deliver to any part of the country</p>
                        </div>

                        {/* Trendy Clothing & Accessories */}
                        <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                            <div className="flex justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-16 w-16 text-purple-600 dark:text-purple-400">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-lg text-gray-900 dark:text-white mt-4 mb-2">Trendy Clothing & Accessories</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">Discover the latest in fashion</p>
                        </div>

                        {/* Tula, Tlahue, Mixquiahuala, and Progreso */}
                        <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                            <div className="flex justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-16 w-16 text-orange-600 dark:text-orange-400">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-lg text-gray-900 dark:text-white mt-4 mb-2">Tula, Tlahue, Mixquiahuala, and Progreso</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">Coverage in various areas</p>
                        </div>

                    </div>
                </div>
            </section>
        </AuthenticatedLayout>
    );
}
