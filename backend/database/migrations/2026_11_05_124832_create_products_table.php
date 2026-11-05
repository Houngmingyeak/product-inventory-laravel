<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();                          // BIGINT UNSIGNED auto-increment
            $table->string('sku', 32)->unique();   // កូដផលិតផល មិនអាចស្ទួន
            $table->string('name', 255);           // ឈ្មោះ (ចាំបាច់)
            $table->string('category', 50);        // ប្រភេទ
            $table->decimal('price', 10, 2);       // តម្លៃ ឧ. 800.00
            $table->integer('stock');              // ចំនួនក្នុងឃ្លាំង
            $table->timestamps();                  // created_at, updated_at
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};