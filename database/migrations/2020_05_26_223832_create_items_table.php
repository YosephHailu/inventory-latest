<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->string('item_id');
            $table->string('name');
            $table->double('initial_balance')->nullable()->default(0);
            $table->double('beginning_balance')->nullable()->default(0);
            $table->double('balance')->default(0);
            $table->double('min_balance')->nullable()->default(0);
            $table->string('location')->nullable();
            $table->string('photo')->nullable();
            $table->unsignedBigInteger('unit_id');            
            $table->unsignedBigInteger('store_id');            
            $table->unsignedBigInteger('item_category_id');            
            
            $table->foreign('unit_id')
                ->references('id')
                ->on('units')->onDelete('cascade')->onUpdate('cascade'); 
            
            $table->foreign('store_id')
                ->references('id')
                ->on('stores')->onDelete('cascade')->onUpdate('cascade'); 
            
            $table->foreign('item_category_id')
                ->references('id')
                ->on('item_categories')->onDelete('cascade')->onUpdate('cascade'); 
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('items');
    }
}
