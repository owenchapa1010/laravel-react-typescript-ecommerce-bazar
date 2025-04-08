import React, { useState } from 'react';
import { Link, router, useForm } from '@inertiajs/react';
import { CartItem as CartItemType } from '@/types';
import TextInput from '@/Components/Core/TextInput';
import CurrencyFormatter from '@/Components/Core/CurrencyFormatter';
import { productRoute } from '@/types/helpers';

function CartItem({ item }: { item: CartItemType }) {
    const deleteForm = useForm({ option_ids: item.option_ids });
    const [error, setError] = useState('');

    const onDeleteClick = () => {
        deleteForm.delete(route('cart.destroy', item.product_id), {
            preserveScroll: true
        });
    };

    const handleQuantityChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setError('');
        router.put(
            route('cart.update', item.product_id),
            {
                quantity: ev.target.value,
                option_ids: item.option_ids
            },
            {
                preserveScroll: true,
                onError: (errors) => {
                    setError(Object.values(errors)[0]);
                }
            }
        );
    };

    return (
        <>
            <div key={item.id} className="flex flex-col sm:flex-row gap-6 p-5 bg-white dark:bg-gray-900 rounded-xl shadow-sm hover:shadow-md transition">
                {/* Product Image */}
                <Link
                    href={productRoute(item)}
                    className="w-full sm:w-32 min-w-32 aspect-square bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden flex justify-center items-center"
                >
                    <img
                        src={item.image}
                        alt={item.title}
                        className="object-cover w-full h-full"
                    />
                </Link>

                {/* Product Info */}
                <div className="flex-1 flex flex-col justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            <Link
                                href={productRoute(item)}
                                className="hover:underline"
                            >
                                {item.title}
                            </Link>
                        </h3>

                        {/* Options */}
                        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            {item.options.map((option) => (
                                <div key={option.id}>
                                    <strong className="text-gray-700 dark:text-gray-300">
                                        {option.type.name}:
                                    </strong>{' '}
                                    {option.name}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom Row: Quantity & Actions */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-5 gap-3">
                        <div className="flex flex-wrap items-center gap-3">
                            <div className="text-sm text-gray-700 dark:text-gray-300">
                                Quantity:
                            </div>
                            <div className={error ? 'tooltip tooltip-open tooltip-error' : ''} data-tip={error}>
                                <TextInput
                                    type="number"
                                    defaultValue={item.quantity}
                                    onBlur={handleQuantityChange}
                                    className="input-sm w-16 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                />
                            </div>

                            <button
                                onClick={onDeleteClick}
                                className="text-sm text-red-600 dark:text-red-400 hover:underline"
                            >
                                Delete
                            </button>

                            <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                                Save for later
                            </button>
                        </div>

                        <div className="text-lg font-bold text-gray-900 dark:text-white mt-3 sm:mt-0">
                            <CurrencyFormatter amount={item.price * item.quantity} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="divider my-6" />
        </>
    );
}

export default CartItem;
