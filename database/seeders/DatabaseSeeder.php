<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\App;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            ProdLocationSeeder::class,
            ProdUserSeeder::class,
            ProdAssetStatusSeeder::class,
            ProdAssignmentStatusSeeder::class,
            ProdCategorySeeder::class,
            ProdAssetSeeder::class,
            ProdAssignmentSeeder::class,
            ProdRequestStatusSeeder::class,
            ProdRequestForReturningSeeder::class
        ]);
    }
}
