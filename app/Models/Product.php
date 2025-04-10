<?php

namespace App\Models;

use App\Enums\ProductStatusEnum;
use App\Filament\Resources\ProductResource;
use App\Filament\Resources\ProductResource\Pages\ProductVariations;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;


class Product extends Model implements HasMedia
{
    use InteractsWithMedia;

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('thumb')->width(100);
        $this->addMediaConversion('small')->width(480);
        $this->addMediaConversion('large')->width(1200);
    }

    public function scopeForVendor(Builder $query): Builder{
        return $query->where('created_by',Auth::id());
    }
    
    public function scopePublished(Builder $query): Builder{
        return $query->where('status', ProductStatusEnum::Published);
    }

    public function scopeForWebsite(Builder $query):Builder
    {
        return $query->published();
    }

    public function department(){
        return $this->belongsTo(Department::class);
    }

    public function category(){
        return $this->belongsTo(Category::class);
    }

    public function variationTypes(){
        return $this->hasMany(VariationType::class);
    }

    public function variations(){
        return $this->hasMany(ProductVariation::class,'product_id');
    }	

    public function user(){
        return $this->belongsTo(User::class,'created_by');
    }

    public function getPriceForOptions($optionIds = []){
        $optionIds = array_values($optionIds);

        sort($optionIds);

        foreach($this->variations as $variation){
            $a = $variation->variation_type_option_ids;
            sort($a);
            if ($optionIds == $a){
                return $variation->price !== null ? $variation->price : $this->price;
            }
        }
        return $this->price;
    }
    public function getImageForOptions(array $optionIds = null){
        if ($optionIds){
            $optionIds = array_values($optionIds);
            sort($optionIds);
            $options = VariationTypeOption::whereIn('id',$optionIds)->get();
            foreach($options as $option){
                $image = $option->getFirstMediaUrl('images','small');
                if ($image){
                    return $image;
                }
            }
        }
        return $this->getFirstMediaUrl('images','small');
    }
}
