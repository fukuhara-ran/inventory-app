<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Electronics',
                'description' => 'Electronic devices and accessories',
            ],
            [
                'name' => 'Clothing',
                'description' => 'Clothing and apparel items',
            ],
            [
                'name' => 'Food & Beverages',
                'description' => 'Food and drink products',
            ],
            [
                'name' => 'Books',
                'description' => 'Books and educational materials',
            ],
            [
                'name' => 'Home & Garden',
                'description' => 'Home improvement and garden supplies',
            ],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
