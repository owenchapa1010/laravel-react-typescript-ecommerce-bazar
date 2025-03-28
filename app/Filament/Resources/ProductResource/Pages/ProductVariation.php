<?php

namespace App\Filament\Resources\ProductResource\Pages;

use App\Enums\ProductVariationTypeEnum;
use App\Enums\Enums\ProductVariationEnum;
use App\Filament\Resources\ProductResource;
use Filament\Actions;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Pages\EditRecord;

class ProductVariation extends EditRecord
{
    protected static ?string $navigationIcon = 'heroicon-s-clipboard-document-list'; 
    protected static string $resource = ProductResource::class;

    protected static ?string $title = 'Variation';
    public function form(Form $form): Form
    {
        return $form
            ->schema([
                            
            ]);
    }
    

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
    
    protected function mutateFormDataBeforeFill(array $data): array{
        $varitons = $this->record->varitions->toArray();
        
        return $data;
    }
}
