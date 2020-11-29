<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFinishedGoodModelsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('finished_good_models', function (Blueprint $table) {
            $table->id();
            $table->string('model_id');
            $table->string('model');
            $table->unsignedBigInteger('finished_good_category_id');

            $table->foreign('finished_good_category_id')
                ->references('id')
                ->on('finished_good_categories')->onDelete('cascade')->onUpdate('cascade');

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
        Schema::dropIfExists('finished_good_models');
    }
}
