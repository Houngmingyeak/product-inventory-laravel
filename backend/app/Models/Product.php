<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    // Fields ដែលអនុញ្ញាតឱ្យបញ្ចូលតាម Product::create([...])
    protected $fillable = [
        'sku',
        'name',
        'category',
        'price',
        'stock',
    ];

    // កំណត់ប្រភេទទិន្នន័យពេលអាន
    protected $casts = [
        'price' => 'decimal:2',
        'stock' => 'integer',
    ];
}