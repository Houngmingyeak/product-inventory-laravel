<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'sku',
        'name',
        'category',
        'price',
        'stock',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'stock' => 'integer',
    ];

    // ធ្វើឱ្យ total_value និង status ចេញជាមួយ JSON ដោយស្វ័យប្រវត្តិ
    protected $appends = [
        'total_value',
        'status',
    ];

    // Total Value = Price × Stock
    public function getTotalValueAttribute()
    {
        return round((float) $this->price * (int) $this->stock, 2);
    }

    // Status: stock == 0 → Out of Stock, 1–5 → Low Stock, > 5 → In Stock
    public function getStatusAttribute()
    {
        if ($this->stock == 0) {
            return 'Out of Stock';
        }

        if ($this->stock <= 5) {
            return 'Low Stock';
        }

        return 'In Stock';
    }
}