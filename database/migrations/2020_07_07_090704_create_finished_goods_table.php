<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFinishedGoodsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('finished_goods', function (Blueprint $table) {
            $table->id();
            $table->string('finished_good_id');
            $table->string('name');
            $table->string('size')->nullable();
            $table->double('minimum_balance')->default(0);
            $table->double('beginning_balance')->nullable()->default(0);
            $table->double('initial_balance')->default(0);
            $table->double('balance')->nullable()->default(0);
            $table->string('location')->nullable();
            $table->string('photo')->nullable();

            $table->unsignedBigInteger('finished_good_model_id');
            $table->unsignedBigInteger('unit_id');
            $table->unsignedBigInteger('store_id');

            $table->foreign('unit_id')
                ->references('id')
                ->on('units')->onDelete('cascade')->onUpdate('cascade');

            $table->foreign('finished_good_model_id')
                ->references('id')
                ->on('finished_good_models')->onDelete('cascade')->onUpdate('cascade');

            $table->foreign('store_id')
                ->references('id')
                ->on('stores')->onDelete('cascade')->onUpdate('cascade');

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
        Schema::dropIfExists('finished_goods');
    }
}
