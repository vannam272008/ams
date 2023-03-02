<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class ProdAssetStatusSeeder extends Seeder
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
                'asset_status_name' => 'Available',
                'asset_status_description' => 'Asset does not belong to any assignment and is in good condition',
            ],
            [
                'asset_status_name' => 'Not available',
                'asset_status_description' => 'Asset does not belong to any assignment and is being repaired or warranted',
            ],
            [
                'asset_status_name' => 'Assigned',
                'asset_status_description' => 'Asset belongs to an assignment',
            ],
            [
                'asset_status_name' => 'Waiting for recycling',
                'asset_status_description' => 'Asset is not able to use and waiting for recycling',
            ],
            [
                'asset_status_name' => 'Recycled',
                'asset_status_description' => 'Asset is not able to use and has been recycled',
            ],
        ];
        DB::table('asset_status')->insert($data);
    }
}
