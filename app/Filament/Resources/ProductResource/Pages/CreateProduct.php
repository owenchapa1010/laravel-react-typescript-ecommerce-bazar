<?php

namespace App\Filament\Resources\ProductResource\Pages;

use App\Filament\Resources\ProductResource;
use Filament\Actions;
use Illuminate\Support\Facades\Auth;
use Filament\Resources\Pages\CreateRecord;

class CreateProduct extends CreateRecord
{
    protected static string $resource = ProductResource::class;
    
    protected function mutateFormDataBeforeCreate(array $data): array {
        $data['created_by'] = Auth::id();        
        $data['updated_by'] = Auth::id(); 
        //Error acá
        
        return $data;
    }
}
