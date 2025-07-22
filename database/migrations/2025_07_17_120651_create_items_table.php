<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('category_id')->constrained('categories')->onDelete('cascade');
            $table->integer('quantity')->default(0);
            $table->integer('min_quantity')->default(1);
            $table->timestamps();
            $table->softDeletes();

            $table->index(['category_id', 'name']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('items');
    }
};
