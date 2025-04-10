import Carousel from "@/Components/Core/Carousel";
import CurrencyFormatter from "@/Components/Core/CurrencyFormatter";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Product, VariationTypeOption } from "@/types";
import { arrayAreEquals } from "@/types/helpers";
import { Head, useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useMemo, useState } from "react";
import { router } from "@inertiajs/react";

function Show({
    product,
    variationOptions,
}: {
    product: Product;
    variationOptions: number[];
}) {
    const form = useForm<{
        option_ids: Record<string, number>;
        quantity: number;
        price: number | null;
    }>({
        option_ids: {},
        quantity: 1,
        price: null,
    });

    const { url } = usePage();
    const [selectedOptions, setSelectedOptions] = useState<Record<number, VariationTypeOption>>({});

    const images = useMemo(() => {
        for (let typeId in selectedOptions) {
            const option = selectedOptions[typeId];
            if (option.images.length > 0) return option.images;
        }
        return product.images;
    }, [product, selectedOptions]);

    const computedProduct = useMemo(() => {
        const selectedOptionsIds = Object.values(selectedOptions).map(option => option.id).sort();
        for (let variation of product.variations) {
            const optionIds = variation.variation_type_option_ids.sort();
            if (arrayAreEquals(selectedOptionsIds, optionIds)) {
                return {
                    price: variation.price,
                    quantity: variation.quantity === null ? Number.MAX_VALUE : variation.quantity,
                };
            }
        }
        return {
            price: product.price,
            quantity: product.quantity,
        };
    }, [product, selectedOptions]);

    useEffect(() => {
        for (let type of product.variationTypes) {
            const selectedOptionId: number = variationOptions[type.id];
            chooseOption(
                type.id,
                type.options.find(option => option.id === selectedOptionId) || type.options[0],
                false
            );
        }
    }, []);

    useEffect(() => {
        const idsMap = Object.fromEntries(
            Object.entries(selectedOptions).map(([typeId, option]) => [typeId, option.id])
        );
        console.log(idsMap);
        form.setData("option_ids", idsMap);
    }, [selectedOptions]);

    const getOptionIdMap = (newOptions: object) => {
        return Object.fromEntries(
            Object.entries(newOptions).map(([a, b]) => [a, b.id])
        );
    };
    const chooseOption = (typeId: number, option: VariationTypeOption, updateRouter: boolean = true) => {
        setSelectedOptions((prevSelectedOptions) => {
            const newOptions = { ...prevSelectedOptions, [typeId]: option };
    
            if (updateRouter) {
                // Usamos setTimeout para evitar el error de hooks
                setTimeout(() => {
                    router.get(url, { options: getOptionIdMap(newOptions) }, {
                        preserveScroll: true,
                        preserveState: true,
                    });
                }, 0);
            }
    
            return newOptions;
        });
    };
    

    const onQuantityChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
        form.setData("quantity", parseInt(ev.target.value));
    };

    const addToCart = () => {
        form.post(route("cart.store", product.id), {
            preserveScroll: true,
            preserveState: true,
            onError: (err) => {
                console.log(err);
            },
        });
    };

    const renderProductVariationTypes = () => {
        return product.variationTypes.map((type) => (
            <div key={type.id} className="mb-6">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
                    {type.name}
                </h3>
                {type.type === "Image" && (
                    <div className="flex flex-wrap gap-3 mb-2">
                        {type.options.map((option) => (
                            <div 
                                onClick={() => chooseOption(type.id, option)} 
                                key={option.id}
                                className={`
                                    relative rounded-lg overflow-hidden cursor-pointer transition-all duration-200
                                    border-2 hover:border-blue-400 hover:shadow-md
                                    ${selectedOptions[type.id]?.id === option.id 
                                        ? "border-blue-600 shadow-md" 
                                        : "border-gray-200 dark:border-gray-700"}
                                `}
                            >
                                {option.images && (
                                    <img
                                        src={option.images[0].thumb}
                                        alt={option.name}
                                        className="w-16 h-16 object-cover"
                                    />
                                )}
                                {selectedOptions[type.id]?.id === option.id && (
                                    <div className="absolute inset-0 bg-blue-600 bg-opacity-20 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
                {type.type === "Radio" && (
                    <div className="flex flex-wrap gap-2 mb-2">
                        {type.options.map((option) => (
                            <label
                                key={option.id}
                                className={`
                                    px-4 py-2 rounded-full border cursor-pointer transition-all duration-200
                                    ${selectedOptions[type.id]?.id === option.id 
                                        ? "bg-blue-600 text-white border-blue-700" 
                                        : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"}
                                `}
                            >
                                <input
                                    onChange={() => chooseOption(type.id, option)}
                                    className="sr-only"
                                    type="radio"
                                    value={option.id}
                                    checked={selectedOptions[type.id]?.id === option.id}
                                    name={"variation_type_" + type.id}
                                />
                                {option.name}
                            </label>
                        ))}
                    </div>
                )}
            </div>
        ));
    };

    const renderAddCartButton = () => {
        return (
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="relative w-full sm:w-1/3">
                    <select 
                        value={form.data.quantity} 
                        onChange={onQuantityChange} 
                        className="appearance-none w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {Array.from({ length: Math.min(10, computedProduct.quantity) }).map((_, i) => (
                            <option value={i + 1} key={i + 1}>
                                {i + 1}
                            </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                        </svg>
                    </div>
                </div>
                <button 
                    onClick={addToCart} 
                    className="w-full sm:w-2/3 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Añadir al carrito
                </button>
            </div>
        );
    };

    return (
        <AuthenticatedLayout>
            <Head title={product.title} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
                    {/* Images Section */}
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm">
                        <Carousel images={images} />
                    </div>
                    
                    {/* Product Info Section */}
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{product.title}</h1>
                        
                        {/* Price Section */}
                        <div className="mb-6">
                            <div className="flex items-center">
                                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                                    <CurrencyFormatter amount={computedProduct.price} />
                                </div>
                            </div>
                            
                            {/* Stock Status */}
                            {computedProduct.quantity !== undefined && (
                                <div className="mt-2">
                                    {computedProduct.quantity > 0 ? (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                            En stock
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                                            Agotado
                                        </span>
                                    )}
                                    
                                    {computedProduct.quantity > 0 && computedProduct.quantity < 10 && (
                                        <span className="ml-2 text-sm text-red-600 dark:text-red-400">
                                            ¡Solo quedan {computedProduct.quantity}!
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                        
                        <div className="border-t border-gray-200 dark:border-gray-800 mb-6 pt-6">
                            {renderProductVariationTypes()}
                        </div>

                        {renderAddCartButton()}
                        
                        {/* Product Description */}
                        <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Acerca del producto</h2>
                            <div 
                                className="prose prose-blue max-w-none text-gray-700 dark:text-gray-300" 
                                dangerouslySetInnerHTML={{ __html: product.description }} 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Show;