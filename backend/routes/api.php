<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

// Route សាកល្បង ដើម្បីបញ្ជាក់ថា API និង PostgreSQL ដំណើរការ
Route::get('/ping', function () {
    return response()->json([
        'message'  => 'Laravel API is working',
        'database' => DB::connection()->getDatabaseName(),
        'driver'   => DB::connection()->getDriverName(),
    ]);
});

// ទាញបញ្ជីផលិតផល
Route::get('/products', [ProductController::class, 'index']);

// បន្ថែមផលិតផលថ្មី
Route::post('/products', [ProductController::class, 'store']);

// មើលផលិតផលមួយ
Route::get('/products/{product}', [ProductController::class, 'show']);

// កែផលិតផល
Route::put('/products/{product}', [ProductController::class, 'update']);