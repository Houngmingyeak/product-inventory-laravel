<?php

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