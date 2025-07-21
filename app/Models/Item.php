<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Item extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'type',
        'quantity',
        'min_quantity',
        'note',
    ];

    protected $casts = [
        'quantity' => 'integer',
        'min_quantity' => 'integer',
    ];

    public function getStockStatusAttribute(): string
    {
        if ($this->quantity === 0) {
            return 'out_of_stock';
        } elseif ($this->quantity <= $this->min_quantity) {
            return 'low_stock';
        } else {
            return 'in_stock';
        }
    }
}
