<?php

namespace Database\Seeders;

use App\Models\Item;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $items = [
            [
                'name' => 'Office Chair Ergonomic',
                'type' => 'Furniture',
                'quantity' => 15,
                'min_quantity' => 5,
                'note' => 'Adjustable height with lumbar support',
            ],
            [
                'name' => 'Dell Monitor 24 inch',
                'type' => 'Equipment',
                'quantity' => 8,
                'min_quantity' => 3,
                'note' => 'Full HD LED display for workstations',
            ],
            [
                'name' => 'Printer Paper A4',
                'type' => 'Consumable',
                'quantity' => 2,
                'min_quantity' => 10,
                'note' => 'White 80gsm paper - Running low!',
            ],
            [
                'name' => 'Blue Ballpoint Pens',
                'type' => 'Stationery',
                'quantity' => 50,
                'min_quantity' => 20,
                'note' => 'Pack of 10 pens each',
            ],
            [
                'name' => 'Wireless Keyboard',
                'type' => 'Equipment',
                'quantity' => 0,
                'min_quantity' => 5,
                'note' => 'Out of stock - need to reorder',
            ],
            [
                'name' => 'Meeting Room Table',
                'type' => 'Furniture',
                'quantity' => 3,
                'min_quantity' => 2,
                'note' => '6-seater conference table',
            ],
            [
                'name' => 'Cleaning Supplies Kit',
                'type' => 'Maintenance',
                'quantity' => 12,
                'min_quantity' => 8,
                'note' => 'Includes disinfectant and cleaning cloths',
            ],
            [
                'name' => 'Network Cable Cat6',
                'type' => 'Equipment',
                'quantity' => 25,
                'min_quantity' => 15,
                'note' => '10 meter ethernet cables',
            ],
            [
                'name' => 'Filing Cabinet 4-Drawer',
                'type' => 'Furniture',
                'quantity' => 6,
                'min_quantity' => 3,
                'note' => 'Metal filing cabinet with lock',
            ],
            [
                'name' => 'Coffee Machine Filters',
                'type' => 'Consumable',
                'quantity' => 1,
                'min_quantity' => 5,
                'note' => 'Compatible with office coffee machine',
            ],
            [
                'name' => 'Projector Portable',
                'type' => 'Equipment',
                'quantity' => 4,
                'min_quantity' => 2,
                'note' => '1080p resolution for presentations',
            ],
            [
                'name' => 'Whiteboard Markers',
                'type' => 'Stationery',
                'quantity' => 18,
                'min_quantity' => 10,
                'note' => 'Assorted colors - black, blue, red',
            ],
            [
                'name' => 'Desk Lamp LED',
                'type' => 'Equipment',
                'quantity' => 11,
                'min_quantity' => 8,
                'note' => 'Adjustable brightness and color temperature',
            ],
            [
                'name' => 'Storage Boxes',
                'type' => 'Furniture',
                'quantity' => 30,
                'min_quantity' => 20,
                'note' => 'Cardboard boxes for archiving documents',
            ],
            [
                'name' => 'Hand Sanitizer 500ml',
                'type' => 'Consumable',
                'quantity' => 8,
                'min_quantity' => 12,
                'note' => '70% alcohol content',
            ],
            [
                'name' => 'USB Flash Drive 32GB',
                'type' => 'Equipment',
                'quantity' => 0,
                'min_quantity' => 10,
                'note' => 'USB 3.0 - completely out of stock',
            ],
            [
                'name' => 'Paper Shredder',
                'type' => 'Equipment',
                'quantity' => 2,
                'min_quantity' => 1,
                'note' => 'Cross-cut shredder for sensitive documents',
            ],
            [
                'name' => 'Stapler Heavy Duty',
                'type' => 'Stationery',
                'quantity' => 7,
                'min_quantity' => 5,
                'note' => 'Can staple up to 50 sheets',
            ],
            [
                'name' => 'Fire Extinguisher 2kg',
                'type' => 'Safety',
                'quantity' => 4,
                'min_quantity' => 6,
                'note' => 'ABC type - needs maintenance check',
            ],
            [
                'name' => 'First Aid Kit',
                'type' => 'Safety',
                'quantity' => 3,
                'min_quantity' => 4,
                'note' => 'Complete first aid supplies for office',
            ],
        ];

        foreach ($items as $item) {
            Item::create($item);
        }
    }
}
