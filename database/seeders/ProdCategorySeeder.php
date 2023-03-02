<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProdCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //Insert data for category table
        $data = [
            [
                'category_name' => 'Laptop',
                'category_prefix' => 'LP'
            ],
            [
                'category_name' => 'Monitor',
                'category_prefix' => 'MO'
            ],
            [
                'category_name' => 'Personal Computer',
                'category_prefix' => 'PC'
            ],
        ];
        DB::table('category')->insert($data);
    }
}
