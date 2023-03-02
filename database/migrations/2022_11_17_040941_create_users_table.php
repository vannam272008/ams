<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user', function (Blueprint $table) {
            $table->id();
            $table->foreignId('location_id')->constrained('location');
            $table->string('first_name', 128);
            $table->string('last_name', 128);
            $table->date('date_of_birth');
            $table->date('joined_date');
            $table->boolean('gender');
            $table->boolean('admin')->default(false);
            $table->string('staff_code', 10);
            $table->string('user_name');
            $table->string('password');
            $table->boolean('first_login')->default(true);
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user');
    }
};
