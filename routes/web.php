<?php

use App\Http\Controllers\ItemController;
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

    Route::resource('items', ItemController::class)->except(['show', 'create', 'edit']);
Route::post('items/destroy-multiple', [ItemController::class, 'destroyMultiple'])->name('items.destroy-multiple');

    Route::get('orders', function () {
        return Inertia::render('orders');
    })->name('orders');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
