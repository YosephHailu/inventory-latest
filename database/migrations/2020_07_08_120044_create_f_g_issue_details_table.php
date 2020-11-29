<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFGIssueDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('f_g_issue_details', function (Blueprint $table) {
            $table->id();
            $table->double('quantity');
            $table->double('avg_price');

            $table->unsignedBigInteger('finished_good_id');
            $table->unsignedBigInteger('f_g_issue_id');

            $table->foreign('finished_good_id')
                ->references('id')
                ->on('finished_goods')->onDelete('cascade')->onUpdate('cascade');

            $table->foreign('f_g_issue_id')
                ->references('id')
                ->on('f_g_issues')->onDelete('cascade')->onUpdate('cascade');

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
        Schema::dropIfExists('f_g_issue_details');
    }
}
