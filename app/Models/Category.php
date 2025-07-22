<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'type',
        'description',
    ];

    protected $casts = [
        'type' => 'string',
    ];

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(Item::class);
    }

    // Scope untuk filter berdasarkan type
    public function scopeForProducts($query)
    {
        return $query->where('type', 'product');
    }

    public function scopeForItems($query)
    {
        return $query->where('type', 'item');
    }
}
