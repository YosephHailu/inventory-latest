<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIssueItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('issue_items', function (Blueprint $table) {
            $table->id();
            $table->string('issue_id');

            $table->integer('year')->nullable();
            $table->integer('month')->nullable();
            $table->integer('day')->nullable();
            
            $table->string('request_no');
            $table->text('remark')->nullable();
            $table->string('issued_by');
            $table->string('approved_by')->nullable();
            $table->string('received_by')->nullable();
            
            $table->unsignedBigInteger('section_id');            
                  
            $table->foreign('section_id')
                ->references('id')
                ->on('sections')->onDelete('cascade')->onUpdate('cascade'); 
           
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
        Schema::dropIfExists('issue_items');
    }
}
