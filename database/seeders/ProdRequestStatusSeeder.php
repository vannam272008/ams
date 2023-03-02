<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class ProdRequestStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //Insert data for state table
        $data = [
            [
                'request_status_name' => 'Completed',
                'request_status_description' => 'Request is completed',
            ],
            [
                'request_status_name' => 'Waiting for returning',
                'request_status_description' => 'Request is accepted and is waiting for returning',
            ],
        ];
        DB::table('request_status')->insert($data);
    }
}
