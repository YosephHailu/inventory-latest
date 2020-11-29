<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShopFGSTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shop_f_g_s', function (Blueprint $table) {
            $table->id();
            $table->double('quantity')->default(0);
            $table->double('beginning_balance')->default(0);
            $table->double('initial_balance')->default(0);

            $table->unsignedBigInteger('finished_good_id');
            $table->unsignedBigInteger('shop_id');            
                  
            $table->foreign('finished_good_id')
                ->references('id')
                ->on('finished_goods')->onDelete('cascade')->onUpdate('cascade'); 
                  
            $table->foreign('shop_id')
                ->references('id')
                ->on('shops')->onDelete('cascade')->onUpdate('cascade'); 
               
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
        Schema::dropIfExists('shop_f_g_s');
    }
}
