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
        Schema::create('assignment', function (Blueprint $table) {
            $table->id();
            $table->foreignId('status_id')->constrained('assignment_status');
            $table->foreignId('asset_id')->constrained('asset');
            $table->foreignId('assignment_to')->constrained('user');
            $table->foreignId('assignment_by')->constrained('user');
            $table->date('assignment_date_assigned');
            $table->date('assignment_date_returned')->nullable();
            $table->string('assignment_note')->nullable();
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
        Schema::dropIfExists('assignment');
    }
};
