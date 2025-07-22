<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Item extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'category_id',
        'quantity',
        'min_quantity',
    ];

    protected $casts = [
        'quantity' => 'integer',
        'min_quantity' => 'integer',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

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
