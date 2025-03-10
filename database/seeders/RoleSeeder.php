<?php

namespace Database\Seeders;

use App\Enums\PermissionsEnum;
use App\Enums\RolesEnum;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission as ModelsPermission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //Create roles
        $userRole = Role::create(['name' => RolesEnum::User->value]);
        $vendorRole = Role::create(['name' => RolesEnum::Vendor->value]);
        $adminRole = Role::create(['name' => RolesEnum::Admin->value]);
        //Create permissions
        $approveVendors = ModelsPermission::create(['name' =>PermissionsEnum::ApproveVendors->value]);
        $sellProducts = ModelsPermission::create(['name' =>PermissionsEnum::SellProducts->value]);
        $buyProducts = ModelsPermission::create(['name' =>PermissionsEnum::BuyProducts->value]);
        //Assign permissions to roles
        $userRole->givePermissionTo([
            $buyProducts,
        ]);

        $vendorRole->givePermissionTo([
            $buyProducts, 
            $sellProducts,
        ]);

        $adminRole->givePermissionTo([
            $buyProducts, 
            $sellProducts, 
            $approveVendors,
        ]);
    }
}
