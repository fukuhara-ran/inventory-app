<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = Category::all();

        if ($categories->isEmpty()) {
            return;
        }

        $products = [
            [
                'name' => 'Laptop Gaming ASUS ROG',
                'category_id' => $categories->where('name', 'Electronics')->first()->id,
                'quantity' => 15,
                'unit' => 'pcs',
                'price' => 15000000,
                'description' => 'High-performance gaming laptop',
            ],
            [
                'name' => 'Smartphone Samsung Galaxy',
                'category_id' => $categories->where('name', 'Electronics')->first()->id,
                'quantity' => 25,
                'unit' => 'pcs',
                'price' => 8000000,
                'description' => 'Latest Samsung smartphone',
            ],
            [
                'name' => 'T-Shirt Cotton',
                'category_id' => $categories->where('name', 'Clothing')->first()->id,
                'quantity' => 50,
                'unit' => 'pcs',
                'price' => 150000,
                'description' => 'Comfortable cotton t-shirt',
            ],
            [
                'name' => 'Coffee Arabica',
                'category_id' => $categories->where('name', 'Food & Beverages')->first()->id,
                'quantity' => 8,
                'unit' => 'kg',
                'price' => 120000,
                'description' => 'Premium arabica coffee beans',
            ],
            [
                'name' => 'Programming Book',
                'category_id' => $categories->where('name', 'Books')->first()->id,
                'quantity' => 0,
                'unit' => 'pcs',
                'price' => 500000,
                'description' => 'Learn programming from basics',
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
