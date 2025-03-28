<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductListResource;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function home(){

        $products = Product::query()
            ->published()
            ->paginate(12);
            
            return Inertia::render('Home', [
                'products' => ProductListResource::collection($products),
            ]);
    
    }

    public function show(Product $product){
        $product->load('variationTypes'); 
    
        return Inertia::render('Product/Show', [
            'product' => new ProductResource($product),
            'variationOptions' => $product->variationTypes->pluck('id')->map(fn ($id) => (string) $id)->toArray()
        ]);
    }
    
    

    
}
