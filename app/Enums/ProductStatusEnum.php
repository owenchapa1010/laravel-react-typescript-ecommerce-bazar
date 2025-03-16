<?php

namespace App\Enums;

enum ProductStatusEnum: string
{
    case Draft = 'draft';
    case Published = 'published';

    public static function labels(): array {
        return [
            self::Draft->value => __('Draft'),
            self::Published->value => __('Published'),
        ];
    }

    public static function colors(): array {
        return [
            self::Draft->value => 'gray',    // 'gray' para el estado Draft
            self::Published->value => 'success', // 'success' para el estado Published
        ];
    }
    
}
