<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFGSalesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('f_g_sales', function (Blueprint $table) {
            $table->id();
            $table->string('sale_id');
            $table->string('to');
            $table->integer('year')->nullable();
            $table->integer('month')->nullable();
            $table->integer('day')->nullable();

            $table->unsignedBigInteger('shop_id');            
                  
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
        Schema::dropIfExists('f_g_sales');
    }
}
