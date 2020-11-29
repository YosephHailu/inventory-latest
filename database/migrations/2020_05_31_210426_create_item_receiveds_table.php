<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateItemReceivedsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('item_receiveds', function (Blueprint $table) {
            $table->id();
            $table->string('quantity');
            $table->string('item_price');

            $table->unsignedBigInteger('good_receive_id');            
            $table->unsignedBigInteger('item_id');            
            
            $table->foreign('good_receive_id')
                ->references('id')
                ->on('good_receives')->onDelete('cascade')->onUpdate('cascade'); 
            
            $table->foreign('item_id')
                ->references('id')
                ->on('items')->onDelete('cascade')->onUpdate('cascade'); 
            
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
        Schema::dropIfExists('item_receiveds');
    }
}
