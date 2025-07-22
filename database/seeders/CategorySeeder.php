<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            // Product Categories
            [
                'name' => 'Electronics',
                'type' => 'product',
                'description' => 'Electronic devices and accessories',
            ],
            [
                'name' => 'Clothing',
                'type' => 'product',
                'description' => 'Clothing and apparel items',
            ],
            [
                'name' => 'Food & Beverages',
                'type' => 'product',
                'description' => 'Food and drink products',
            ],
            [
                'name' => 'Books',
                'type' => 'product',
                'description' => 'Books and educational materials',
            ],
            [
                'name' => 'Home & Garden',
                'type' => 'product',
                'description' => 'Home improvement and garden supplies',
            ],
            // Item Categories
            [
                'name' => 'Equipment',
                'type' => 'item',
                'description' => 'Office and technical equipment',
            ],
            [
                'name' => 'Furniture',
                'type' => 'item',
                'description' => 'Office furniture and fixtures',
            ],
            [
                'name' => 'Consumable',
                'type' => 'item',
                'description' => 'Consumable supplies and materials',
            ],
            [
                'name' => 'Stationery',
                'type' => 'item',
                'description' => 'Office stationery and supplies',
            ],
            [
                'name' => 'Safety',
                'type' => 'item',
                'description' => 'Safety equipment and supplies',
            ],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
