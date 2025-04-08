import { Link, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import MiniCartDropDown from "./MiniCartDropdown";
import { Menu, Search, ShoppingBag, User } from "lucide-react";

export default function Navbar() {
    const { auth, totalPrice, totalQuantity } = usePage().props;
    const { user } = auth;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Mobile menu button */}
                    <button 
                        className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800 transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <Menu size={24} />
                    </button>

                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center">
                            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                                Blue Avenue
                            </span>
                        </Link>
                    </div>

                    {/* Right Side Icons & User Menu */}
                    <div className="flex items-center space-x-5">

                        {/* Cart Dropdown */}
                        <div className="relative">
                            <MiniCartDropDown />
                        </div>

                        {/* User Menu */}
                        {user ? (
                            <div className="relative">
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full border-2 border-blue-200 hover:border-blue-500 transition-colors">
                                            <img
                                                alt="User Avatar"
                                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>
                                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-white dark:bg-gray-800 rounded-lg z-[1] mt-3 w-56 p-3 shadow-lg ring-1 ring-black ring-opacity-5">
                                        <li className="px-1 py-2 text-sm text-gray-500 dark:text-gray-400">
                                            Signed in as <span className="font-medium text-gray-900 dark:text-white">{user.name}</span>
                                        </li>
                                        <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                                        <li>
                                            <Link
                                                href={route('profile.edit')}
                                                className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                                            >
                                                <User size={16} className="mr-2" />
                                                Profile
                                            </Link>
                                        </li>
                                        <li>
                                        </li>
                                        <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                                        <li>
                                            <Link 
                                                href={route('logout')} 
                                                method="post" 
                                                as="button"
                                                className="flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md w-full text-left"
                                            >
                                                Logout
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <Link 
                                    href={route('login')} 
                                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 transition-colors"
                                >
                                    Login
                                </Link>
                                <Link 
                                    href={route('register')} 
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </header>
    );
}