<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProdLocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //Insert data for location table
        $data = [
            [
                'location_name' => 'Da Nang',
                'location_prefix' => 'DN'
            ],
            [
                'location_name' => 'Ha Noi',
                'location_prefix' => 'HN'
            ],
            [
                'location_name' => 'Ho Chi Minh',
                'location_prefix' => 'HCM'
            ],
        ];
        DB::table('location')->insert($data);
    }
}
