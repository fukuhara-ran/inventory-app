<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = Category::where('type', 'product')->get();

        if ($categories->isEmpty()) {
            return;
        }

        // Cache category IDs to avoid repeated queries
        $electronicsId = $categories->where('name', 'Electronics')->first()?->id;
        $clothingId = $categories->where('name', 'Clothing')->first()?->id;
        $foodBeveragesId = $categories->where('name', 'Food & Beverages')->first()?->id;
        $booksId = $categories->where('name', 'Books')->first()?->id;

        // Check if required categories exist
        if (!$electronicsId || !$clothingId || !$foodBeveragesId || !$booksId) {
            return;
        }

        $products = [
            [
                'name' => 'Laptop Gaming ASUS ROG',
                'category_id' => $electronicsId,
                'quantity' => 15,
                'unit' => 'pcs',
                'price' => 15000000,
                'description' => 'High-performance gaming laptop',
            ],
            [
                'name' => 'Smartphone Samsung Galaxy',
                'category_id' => $electronicsId,
                'quantity' => 25,
                'unit' => 'pcs',
                'price' => 8000000,
                'description' => 'Latest Samsung smartphone',
            ],
            [
                'name' => 'T-Shirt Cotton',
                'category_id' => $clothingId,
                'quantity' => 50,
                'unit' => 'pcs',
                'price' => 150000,
                'description' => 'Comfortable cotton t-shirt',
            ],
            [
                'name' => 'Coffee Arabica',
                'category_id' => $foodBeveragesId,
                'quantity' => 8,
                'unit' => 'kg',
                'price' => 120000,
                'description' => 'Premium arabica coffee beans',
            ],
            [
                'name' => 'Programming Book',
                'category_id' => $booksId,
                'quantity' => 0,
                'unit' => 'pcs',
                'price' => 500000,
                'description' => 'Learn programming from basics',
            ],
            // 15 produk tambahan
            [
                'name' => 'Wireless Headphones Sony',
                'category_id' => $electronicsId,
                'quantity' => 12,
                'unit' => 'pcs',
                'price' => 2500000,
                'description' => 'Noise-canceling wireless headphones',
            ],
            [
                'name' => 'Mechanical Keyboard RGB',
                'category_id' => $electronicsId,
                'quantity' => 20,
                'unit' => 'pcs',
                'price' => 1200000,
                'description' => 'RGB backlit mechanical gaming keyboard',
            ],
            [
                'name' => 'Denim Jeans Premium',
                'category_id' => $clothingId,
                'quantity' => 30,
                'unit' => 'pcs',
                'price' => 450000,
                'description' => 'Premium quality denim jeans',
            ],
            [
                'name' => 'Hoodie Winter Collection',
                'category_id' => $clothingId,
                'quantity' => 18,
                'unit' => 'pcs',
                'price' => 350000,
                'description' => 'Warm and comfortable winter hoodie',
            ],
            [
                'name' => 'Green Tea Organic',
                'category_id' => $foodBeveragesId,
                'quantity' => 45,
                'unit' => 'box',
                'price' => 85000,
                'description' => 'Organic green tea with natural antioxidants',
            ],
            [
                'name' => 'Chocolate Dark Premium',
                'category_id' => $foodBeveragesId,
                'quantity' => 2,
                'unit' => 'kg',
                'price' => 180000,
                'description' => 'Premium dark chocolate 70% cocoa',
            ],
            [
                'name' => 'Web Development Guide',
                'category_id' => $booksId,
                'quantity' => 15,
                'unit' => 'pcs',
                'price' => 420000,
                'description' => 'Complete guide to modern web development',
            ],
            [
                'name' => 'Data Science Handbook',
                'category_id' => $booksId,
                'quantity' => 8,
                'unit' => 'pcs',
                'price' => 650000,
                'description' => 'Comprehensive data science reference',
            ],
            [
                'name' => 'Gaming Mouse Wireless',
                'category_id' => $electronicsId,
                'quantity' => 35,
                'unit' => 'pcs',
                'price' => 750000,
                'description' => 'High-precision wireless gaming mouse',
            ],
            [
                'name' => 'Monitor 4K 27 inch',
                'category_id' => $electronicsId,
                'quantity' => 6,
                'unit' => 'pcs',
                'price' => 4200000,
                'description' => '4K resolution professional monitor',
            ],
            [
                'name' => 'Sneakers Sport Edition',
                'category_id' => $clothingId,
                'quantity' => 28,
                'unit' => 'pairs',
                'price' => 850000,
                'description' => 'Comfortable sport sneakers for daily use',
            ],
            [
                'name' => 'Instant Noodles Pack',
                'category_id' => $foodBeveragesId,
                'quantity' => 0,
                'unit' => 'pack',
                'price' => 25000,
                'description' => 'Quick and tasty instant noodles - Out of stock',
            ],
            [
                'name' => 'Business Strategy Book',
                'category_id' => $booksId,
                'quantity' => 12,
                'unit' => 'pcs',
                'price' => 380000,
                'description' => 'Modern business strategy and management',
            ],
            [
                'name' => 'Bluetooth Speaker Portable',
                'category_id' => $electronicsId,
                'quantity' => 22,
                'unit' => 'pcs',
                'price' => 650000,
                'description' => 'Waterproof portable bluetooth speaker',
            ],
            [
                'name' => 'Polo Shirt Classic',
                'category_id' => $clothingId,
                'quantity' => 40,
                'unit' => 'pcs',
                'price' => 220000,
                'description' => 'Classic polo shirt for casual wear',
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
