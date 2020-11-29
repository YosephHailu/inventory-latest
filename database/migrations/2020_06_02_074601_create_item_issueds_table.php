<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateItemIssuedsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('item_issueds', function (Blueprint $table) {
            $table->id();
            $table->double('quantity');
            $table->double('avg_price');
            $table->unsignedBigInteger('issue_item_id');            
            $table->unsignedBigInteger('item_id');            
                  
            $table->foreign('issue_item_id')
                ->references('id')
                ->on('issue_items')->onDelete('cascade')->onUpdate('cascade'); 
                     
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
        Schema::dropIfExists('item_issueds');
    }
}
