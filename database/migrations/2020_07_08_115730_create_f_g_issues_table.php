<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFGIssuesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('f_g_issues', function (Blueprint $table) {
            $table->id();
            $table->string('issue_id');
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
        Schema::dropIfExists('f_g_issues');
    }
}
