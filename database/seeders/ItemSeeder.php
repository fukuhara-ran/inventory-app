<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Item;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ItemSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ambil kategori untuk items saja
        $categories = Category::where('type', 'item')->get();

        if ($categories->isEmpty()) {
            return;
        }

        // Cache category IDs to avoid repeated queries
        $equipmentId = $categories->where('name', 'Equipment')->first()?->id;
        $furnitureId = $categories->where('name', 'Furniture')->first()?->id;
        $consumableId = $categories->where('name', 'Consumable')->first()?->id;
        $stationeryId = $categories->where('name', 'Stationery')->first()?->id;
        $safetyId = $categories->where('name', 'Safety')->first()?->id;

        // Check if required categories exist
        if (!$equipmentId || !$furnitureId || !$consumableId || !$stationeryId || !$safetyId) {
            return;
        }

        $items = [
            // Equipment Items
            [
                'name' => 'Dell Monitor 24 inch',
                'category_id' => $equipmentId,
                'quantity' => 8,
                'min_quantity' => 3,
            ],
            [
                'name' => 'Wireless Keyboard Logitech',
                'category_id' => $equipmentId,
                'quantity' => 0,
                'min_quantity' => 5,
            ],
            [
                'name' => 'Network Cable Cat6 10m',
                'category_id' => $equipmentId,
                'quantity' => 25,
                'min_quantity' => 15,
            ],
            [
                'name' => 'Projector Portable 1080p',
                'category_id' => $equipmentId,
                'quantity' => 4,
                'min_quantity' => 2,
            ],
            [
                'name' => 'Desk Lamp LED Adjustable',
                'category_id' => $equipmentId,
                'quantity' => 11,
                'min_quantity' => 8,
            ],
            [
                'name' => 'USB Flash Drive 32GB',
                'category_id' => $equipmentId,
                'quantity' => 0,
                'min_quantity' => 10,
            ],
            [
                'name' => 'Paper Shredder Cross-cut',
                'category_id' => $equipmentId,
                'quantity' => 2,
                'min_quantity' => 1,
            ],
            [
                'name' => 'Wireless Mouse Optical',
                'category_id' => $equipmentId,
                'quantity' => 15,
                'min_quantity' => 8,
            ],

            // Furniture Items
            [
                'name' => 'Office Chair Ergonomic',
                'category_id' => $furnitureId,
                'quantity' => 15,
                'min_quantity' => 5,
            ],
            [
                'name' => 'Meeting Room Table 6-seater',
                'category_id' => $furnitureId,
                'quantity' => 3,
                'min_quantity' => 2,
            ],
            [
                'name' => 'Filing Cabinet 4-Drawer',
                'category_id' => $furnitureId,
                'quantity' => 6,
                'min_quantity' => 3,
            ],
            [
                'name' => 'Storage Boxes Archive',
                'category_id' => $furnitureId,
                'quantity' => 30,
                'min_quantity' => 20,
            ],
            [
                'name' => 'Office Desk Adjustable Height',
                'category_id' => $furnitureId,
                'quantity' => 12,
                'min_quantity' => 6,
            ],
            [
                'name' => 'Bookshelf 5-Tier',
                'category_id' => $furnitureId,
                'quantity' => 8,
                'min_quantity' => 4,
            ],

            // Consumable Items
            [
                'name' => 'Printer Paper A4 80gsm',
                'category_id' => $consumableId,
                'quantity' => 2,
                'min_quantity' => 10,
            ],
            [
                'name' => 'Coffee Machine Filters',
                'category_id' => $consumableId,
                'quantity' => 1,
                'min_quantity' => 5,
            ],
            [
                'name' => 'Hand Sanitizer 500ml',
                'category_id' => $consumableId,
                'quantity' => 8,
                'min_quantity' => 12,
            ],
            [
                'name' => 'Ink Cartridge Black HP',
                'category_id' => $consumableId,
                'quantity' => 3,
                'min_quantity' => 8,
            ],
            [
                'name' => 'Ink Cartridge Color HP',
                'category_id' => $consumableId,
                'quantity' => 2,
                'min_quantity' => 6,
            ],
            [
                'name' => 'Cleaning Supplies Kit',
                'category_id' => $consumableId,
                'quantity' => 12,
                'min_quantity' => 8,
            ],

            // Stationery Items
            [
                'name' => 'Blue Ballpoint Pens Pack 10',
                'category_id' => $stationeryId,
                'quantity' => 50,
                'min_quantity' => 20,
            ],
            [
                'name' => 'Whiteboard Markers Assorted',
                'category_id' => $stationeryId,
                'quantity' => 18,
                'min_quantity' => 10,
            ],
            [
                'name' => 'Stapler Heavy Duty',
                'category_id' => $stationeryId,
                'quantity' => 7,
                'min_quantity' => 5,
            ],
            [
                'name' => 'Sticky Notes 3x3 Yellow',
                'category_id' => $stationeryId,
                'quantity' => 25,
                'min_quantity' => 15,
            ],
            [
                'name' => 'Paper Clips Box 100pcs',
                'category_id' => $stationeryId,
                'quantity' => 12,
                'min_quantity' => 8,
            ],
            [
                'name' => 'Highlighter Set 4 Colors',
                'category_id' => $stationeryId,
                'quantity' => 20,
                'min_quantity' => 12,
            ],
            [
                'name' => 'Folders A4 Plastic',
                'category_id' => $stationeryId,
                'quantity' => 35,
                'min_quantity' => 20,
            ],

            // Safety Items
            [
                'name' => 'Fire Extinguisher 2kg ABC',
                'category_id' => $safetyId,
                'quantity' => 4,
                'min_quantity' => 6,
            ],
            [
                'name' => 'First Aid Kit Complete',
                'category_id' => $safetyId,
                'quantity' => 3,
                'min_quantity' => 4,
            ],
            [
                'name' => 'Safety Goggles',
                'category_id' => $safetyId,
                'quantity' => 10,
                'min_quantity' => 15,
            ],
            [
                'name' => 'Emergency Exit Sign LED',
                'category_id' => $safetyId,
                'quantity' => 8,
                'min_quantity' => 5,
            ],
            [
                'name' => 'Safety Vest Reflective',
                'category_id' => $safetyId,
                'quantity' => 0,
                'min_quantity' => 10,
            ],
        ];

        foreach ($items as $item) {
            Item::create($item);
        }
    }
}
