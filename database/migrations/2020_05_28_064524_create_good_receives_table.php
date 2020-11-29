<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGoodReceivesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('good_receives', function (Blueprint $table) {
            $table->id();
            $table->string('good_receive_id');
            $table->integer('year')->nullable();
            $table->integer('month')->nullable();
            $table->integer('day')->nullable();
            $table->string('pro_no')->nullable();
            $table->string('po_no')->nullable();
            $table->string('invoice_no');
            $table->string('lc_no')->nullable();
            $table->string('prepared_by')->nullable();
            $table->string('approved_by')->nullable();

            $table->unsignedBigInteger('supplier_id')->nullable();

            $table->foreign('supplier_id')
                ->references('id')
                ->on('suppliers')->onDelete('cascade')->onUpdate('cascade');

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
        Schema::dropIfExists('good_receives');
    }
}
