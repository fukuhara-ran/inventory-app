<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('products', ProductController::class)->except(['show', 'create', 'edit']);
    Route::post('products/destroy-multiple', [ProductController::class, 'destroyMultiple'])->name('products.destroy-multiple');

    Route::get('stocks', function () {
        return Inertia::render('stocks');
    })->name('stocks');

    Route::get('orders', function () {
        return Inertia::render('orders');
    })->name('orders');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
