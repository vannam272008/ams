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
        Schema::create('request_for_returning', function (Blueprint $table) {
            $table->id();
            $table->foreignId('status_id')->constrained('request_status');
            $table->foreignId('assignment_id')->constrained('assignment');
            $table->foreignId('requested_by')->constrained('user');
            $table->foreignId('accepted_by')->nullable()->constrained('user');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('request_for_returning');
    }
};
