<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('td_tasks', function (Blueprint $table) {
            $table->bigIncrements('id')->from(2423);
            $table->bigInteger('user_id')->unsigned();
            $table->bigInteger('category_id')->unsigned();
            $table->string('title');
            $table->text('description');
            $table->enum('status', ['Pending', 'In Progress', 'Completed']);
            $table->softDeletes();
            $table->timestamps();

            //Foreign Keys
            $table->foreign('user_id')->references('id')->on('td_users')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('category_id')->references('id')->on('td_categories')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('td_tasks');
    }
};
