import ProductItem from '@/Components/App/ProductItem';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps, PaginationProps, Product } from '@/types';
import { Head, Link } from '@inertiajs/react';


export default function Home({
    products,
}: PageProps<{products: PaginationProps<Product>}>) {


    return (
        <AuthenticatedLayout>
            <Head title="Home" />
            <div className="hero bg-base-300 h-[300px]">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">Hello!</h1>
                        <p className="py-6">
                            This is a text where you can write different things
                        </p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 p-8 ">
                {products.data.map(product=>(
                    <ProductItem product={product} key={product.id}/>
                ))}
            </div>


        </AuthenticatedLayout>
    );
}
