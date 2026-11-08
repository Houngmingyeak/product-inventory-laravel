<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        // updateOrCreate ធ្វើឱ្យអាចរត់ seed ម្តងហើយម្តងទៀត ដោយមិនបង្កើតស្ទួន SKU
        Product::updateOrCreate(
            ['sku' => 'PRD-1001'],
            ['name' => 'Wireless Ergonomic Mouse', 'category' => 'Electronics', 'price' => 25.00, 'stock' => 45]
        );

        Product::updateOrCreate(
            ['sku' => 'PRD-1002'],
            ['name' => 'Mechanical RGB Keyboard', 'category' => 'Electronics', 'price' => 85.00, 'stock' => 3]
        );

        Product::updateOrCreate(
            ['sku' => 'PRD-1003'],
            ['name' => 'USB-C Fast Charging Cable', 'category' => 'Accessories', 'price' => 12.00, 'stock' => 0]
        );

        Product::updateOrCreate(
            ['sku' => 'PRD-1004'],
            ['name' => 'Ergonomic Mesh Office Chair', 'category' => 'Furniture', 'price' => 180.00, 'stock' => 12]
        );

        Product::updateOrCreate(
            ['sku' => 'PRD-1005'],
            ['name' => 'Aluminum Laptop Riser Stand', 'category' => 'Accessories', 'price' => 34.50, 'stock' => 5]
        );
    }
}