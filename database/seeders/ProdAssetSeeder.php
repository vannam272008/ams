<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProdAssetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //Insert data for asset table
        $data = [
            [
                'location_id' => 1,
                'status_id' => 1,
                'category_id' => 1,
                'asset_code' => 'LP000001',
                'asset_name' => 'Laptop Gaming MSI',
                'asset_specification' => 'Laptop Gaming MSI in Da Nang',
                'asset_installed_date' => '2022-09-27'
            ],
            [
                'location_id' => 1,
                'status_id' => 1,
                'category_id' => 3,
                'asset_code' => 'PC000002',
                'asset_name' => 'Personal Computer E4',
                'asset_specification' => 'Personal Computer E4 in Da Nang',
                'asset_installed_date' => '2022-09-27'
            ],
            [
                'location_id' => 2,
                'status_id' => 1,
                'category_id' => 1,
                'asset_code' => 'LP000003',
                'asset_name' => 'Laptop Gaming MSI',
                'asset_specification' => 'Laptop Gaming MSI in Ha Noi',
                'asset_installed_date' => '2022-09-27'
            ],
            [
                'location_id' => 2,
                'status_id' => 1,
                'category_id' => 3,
                'asset_code' => 'PC000004',
                'asset_name' => 'Personal Computer E4',
                'asset_specification' => 'Personal Computer E4 in Ha Noi',
                'asset_installed_date' => '2022-09-27'
            ],
            [
                'location_id' => 3,
                'status_id' => 3,
                'category_id' => 1,
                'asset_code' => 'LP000005',
                'asset_name' => 'Laptop Gaming MSI',
                'asset_specification' => 'Laptop Gaming MSI in Ho Chi Minh',
                'asset_installed_date' => '2022-09-27'
            ],
            [
                'location_id' => 3,
                'status_id' => 3,
                'category_id' => 3,
                'asset_code' => 'PC000006',
                'asset_name' => 'Personal Computer E4',
                'asset_specification' => 'Personal Computer E4 in Ho Chi Minh',
                'asset_installed_date' => '2022-09-27'
            ],
            [
                'location_id' => 3,
                'status_id' => 1,
                'category_id' => 1,
                'asset_code' => 'LP000007',
                'asset_name' => 'Laptop Gaming ASUS',
                'asset_specification' => 'Laptop Gaming ASUS in Ho Chi Minh',
                'asset_installed_date' => '2022-09-27'
            ],
            [
                'location_id' => 3,
                'status_id' => 3,
                'category_id' => 2,
                'asset_code' => 'MO000008',
                'asset_name' => 'Monitor',
                'asset_specification' => 'Monitor in Ho Chi Minh',
                'asset_installed_date' => '2022-09-27'
            ],
            [
                'location_id' => 3,
                'status_id' => 3,
                'category_id' => 3,
                'asset_code' => 'PC000009',
                'asset_name' => 'Personal Computer E4',
                'asset_specification' => 'Personal Computer E4 in Ho Chi Minh',
                'asset_installed_date' => '2022-09-27'
            ],
            [
                'location_id' => 3,
                'status_id' => 3,
                'category_id' => 1,
                'asset_code' => 'LP000010',
                'asset_name' => 'Laptop Gaming ASUS',
                'asset_specification' => 'Laptop Gaming ASUS in Ho Chi Minh',
                'asset_installed_date' => '2022-09-27'
            ],
            [
                'location_id' => 3,
                'status_id' => 3,
                'category_id' => 1,
                'asset_code' => 'LP000011',
                'asset_name' => 'Laptop Gaming MSI',
                'asset_specification' => 'Laptop Gaming MSI in Ho Chi Minh',
                'asset_installed_date' => '2022-09-27'
            ],
            [
                'location_id' => 3,
                'status_id' => 3,
                'category_id' => 3,
                'asset_code' => 'PC000012',
                'asset_name' => 'Personal Computer E4',
                'asset_specification' => 'Personal Computer E4 in Ho Chi Minh',
                'asset_installed_date' => '2022-09-27'
            ],
            [
                'location_id' => 3,
                'status_id' => 3,
                'category_id' => 1,
                'asset_code' => 'LP000013',
                'asset_name' => 'Laptop Gaming ASUS',
                'asset_specification' => 'Laptop Gaming ASUS in Ho Chi Minh',
                'asset_installed_date' => '2022-09-27'
            ],
            [
                'location_id' => 3,
                'status_id' => 3,
                'category_id' => 2,
                'asset_code' => 'MO000014',
                'asset_name' => 'Monitor',
                'asset_specification' => 'Monitor in Ho Chi Minh',
                'asset_installed_date' => '2022-09-27'
            ],
            [
                'location_id' => 3,
                'status_id' => 3,
                'category_id' => 2,
                'asset_code' => 'MO000015',
                'asset_name' => 'Monitor',
                'asset_specification' => 'Monitor in Ho Chi Minh',
                'asset_installed_date' => '2022-09-27'
            ],
            [
                'location_id' => 3,
                'status_id' => 3,
                'category_id' => 1,
                'asset_code' => 'LP000016',
                'asset_name' => 'Laptop Gaming ASUS',
                'asset_specification' => 'Laptop Gaming ASUS in Ho Chi Minh',
                'asset_installed_date' => '2022-09-27'
            ],
            [
                'location_id' => 3,
                'status_id' => 3,
                'category_id' => 1,
                'asset_code' => 'LP000017',
                'asset_name' => 'Laptop Gaming MSI',
                'asset_specification' => 'Laptop Gaming MSI in Ho Chi Minh',
                'asset_installed_date' => '2022-09-27'
            ],
            [
                'location_id' => 3,
                'status_id' => 3,
                'category_id' => 3,
                'asset_code' => 'PC000018',
                'asset_name' => 'Personal Computer E4',
                'asset_specification' => 'Personal Computer E4 in Ho Chi Minh',
                'asset_installed_date' => '2022-09-27'
            ],
            [
                'location_id' => 3,
                'status_id' => 3,
                'category_id' => 1,
                'asset_code' => 'LP000019',
                'asset_name' => 'Laptop Gaming ASUS',
                'asset_specification' => 'Laptop Gaming ASUS in Ho Chi Minh',
                'asset_installed_date' => '2022-09-27'
            ],
            [
                'location_id' => 3,
                'status_id' => 3,
                'category_id' => 1,
                'asset_code' => 'LP000020',
                'asset_name' => 'Laptop Gaming MSI',
                'asset_specification' => 'Laptop Gaming MSI in Ho Chi Minh',
                'asset_installed_date' => '2022-09-27'
            ],
            [
                'location_id' => 3,
                'status_id' => 3,
                'category_id' => 3,
                'asset_code' => 'PC000021',
                'asset_name' => 'Personal Computer E4',
                'asset_specification' => 'Personal Computer E4 in Ho Chi Minh',
                'asset_installed_date' => '2022-09-27'
            ],
            [
                'location_id' => 3,
                'status_id' => 3,
                'category_id' => 1,
                'asset_code' => 'LP000022',
                'asset_name' => 'Laptop Gaming ASUS',
                'asset_specification' => 'Laptop Gaming ASUS in Ho Chi Minh',
                'asset_installed_date' => '2022-09-27'
            ],
            [
                'location_id' => 3,
                'status_id' => 3,
                'category_id' => 3,
                'asset_code' => 'PC000023',
                'asset_name' => 'Personal Computer E4',
                'asset_specification' => 'Personal Computer E4 in Ho Chi Minh',
                'asset_installed_date' => '2022-09-27'
            ],
            [
                'location_id' => 3,
                'status_id' => 3,
                'category_id' => 1,
                'asset_code' => 'LP000024',
                'asset_name' => 'Laptop Gaming ASUS',
                'asset_specification' => 'Laptop Gaming ASUS in Ho Chi Minh',
                'asset_installed_date' => '2022-09-27'
            ],
            [
                'location_id' => 3,
                'status_id' => 3,
                'category_id' => 2,
                'asset_code' => 'MO000025',
                'asset_name' => 'Monitor',
                'asset_specification' => 'Monitor in Ho Chi Minh',
                'asset_installed_date' => '2022-09-27'
            ],
            [
                'location_id' => 3,
                'status_id' => 3,
                'category_id' => 2,
                'asset_code' => 'MO000026',
                'asset_name' => 'Monitor',
                'asset_specification' => 'Monitor in Ho Chi Minh',
                'asset_installed_date' => '2022-09-27'
            ],
            [
                'location_id' => 3,
                'status_id' => 3,
                'category_id' => 1,
                'asset_code' => 'LP000027',
                'asset_name' => 'Laptop Gaming ASUS',
                'asset_specification' => 'Laptop Gaming ASUS in Ho Chi Minh',
                'asset_installed_date' => '2022-09-27'
            ],
            [
                'location_id' => 3,
                'status_id' => 3,
                'category_id' => 1,
                'asset_code' => 'LP000028',
                'asset_name' => 'Laptop Gaming MSI',
                'asset_specification' => 'Laptop Gaming MSI in Ho Chi Minh',
                'asset_installed_date' => '2022-09-27'
            ],
            [
                'location_id' => 3,
                'status_id' => 3,
                'category_id' => 3,
                'asset_code' => 'PC000029',
                'asset_name' => 'Personal Computer E4',
                'asset_specification' => 'Personal Computer E4 in Ho Chi Minh',
                'asset_installed_date' => '2022-09-27'
            ],
            [
                'location_id' => 3,
                'status_id' => 3,
                'category_id' => 1,
                'asset_code' => 'LP000030',
                'asset_name' => 'Laptop Gaming ASUS',
                'asset_specification' => 'Laptop Gaming ASUS in Ho Chi Minh',
                'asset_installed_date' => '2022-09-27'
            ],
            [
                'location_id' => 3,
                'status_id' => 3,
                'category_id' => 1,
                'asset_code' => 'LP000031',
                'asset_name' => 'Laptop Gaming MSI',
                'asset_specification' => 'Laptop Gaming MSI in Ho Chi Minh',
                'asset_installed_date' => '2022-09-27'
            ],
            [
                'location_id' => 3,
                'status_id' => 3,
                'category_id' => 3,
                'asset_code' => 'PC000032',
                'asset_name' => 'Personal Computer E4',
                'asset_specification' => 'Personal Computer E4 in Ho Chi Minh',
                'asset_installed_date' => '2022-09-27'
            ],
            [
                'location_id' => 3,
                'status_id' => 3,
                'category_id' => 1,
                'asset_code' => 'LP000033',
                'asset_name' => 'Laptop Gaming ASUS',
                'asset_specification' => 'Laptop Gaming ASUS in Ho Chi Minh',
                'asset_installed_date' => '2022-09-27'
            ],
            [
                'location_id' => 3,
                'status_id' => 3,
                'category_id' => 3,
                'asset_code' => 'PC000034',
                'asset_name' => 'Personal Computer E4',
                'asset_specification' => 'Personal Computer E4 in Ho Chi Minh',
                'asset_installed_date' => '2022-09-27'
            ],
            [
                'location_id' => 3,
                'status_id' => 3,
                'category_id' => 1,
                'asset_code' => 'LP000035',
                'asset_name' => 'Laptop Gaming ASUS',
                'asset_specification' => 'Laptop Gaming ASUS in Ho Chi Minh',
                'asset_installed_date' => '2022-09-27'
            ],
            [
                'location_id' => 3,
                'status_id' => 3,
                'category_id' => 2,
                'asset_code' => 'MO000036',
                'asset_name' => 'Monitor',
                'asset_specification' => 'Monitor in Ho Chi Minh',
                'asset_installed_date' => '2022-09-27'
            ],
            [
                'location_id' => 3,
                'status_id' => 3,
                'category_id' => 2,
                'asset_code' => 'MO000037',
                'asset_name' => 'Monitor',
                'asset_specification' => 'Monitor in Ho Chi Minh',
                'asset_installed_date' => '2022-09-27'
            ],
            [
                'location_id' => 3,
                'status_id' => 3,
                'category_id' => 1,
                'asset_code' => 'LP000038',
                'asset_name' => 'Laptop Gaming ASUS',
                'asset_specification' => 'Laptop Gaming ASUS in Ho Chi Minh',
                'asset_installed_date' => '2022-09-27'
            ],
            [
                'location_id' => 3,
                'status_id' => 3,
                'category_id' => 1,
                'asset_code' => 'LP000039',
                'asset_name' => 'Laptop Gaming MSI',
                'asset_specification' => 'Laptop Gaming MSI in Ho Chi Minh',
                'asset_installed_date' => '2022-09-27'
            ],
            [
                'location_id' => 3,
                'status_id' => 3,
                'category_id' => 3,
                'asset_code' => 'PC000040',
                'asset_name' => 'Personal Computer E4',
                'asset_specification' => 'Personal Computer E4 in Ho Chi Minh',
                'asset_installed_date' => '2022-09-27'
            ],
            [
                'location_id' => 3,
                'status_id' => 3,
                'category_id' => 1,
                'asset_code' => 'LP000041',
                'asset_name' => 'Laptop Gaming ASUS',
                'asset_specification' => 'Laptop Gaming ASUS in Ho Chi Minh',
                'asset_installed_date' => '2022-09-27'
            ],
            [
                'location_id' => 3,
                'status_id' => 3,
                'category_id' => 1,
                'asset_code' => 'LP000042',
                'asset_name' => 'Laptop Gaming MSI',
                'asset_specification' => 'Laptop Gaming MSI in Ho Chi Minh',
                'asset_installed_date' => '2022-09-27'
            ],
            [
                'location_id' => 3,
                'status_id' => 3,
                'category_id' => 3,
                'asset_code' => 'PC000043',
                'asset_name' => 'Personal Computer E4',
                'asset_specification' => 'Personal Computer E4 in Ho Chi Minh',
                'asset_installed_date' => '2022-09-27'
            ],
            [
                'location_id' => 3,
                'status_id' => 3,
                'category_id' => 1,
                'asset_code' => 'LP000044',
                'asset_name' => 'Laptop Gaming ASUS',
                'asset_specification' => 'Laptop Gaming ASUS in Ho Chi Minh',
                'asset_installed_date' => '2022-09-27'
            ],
            [
                'location_id' => 3,
                'status_id' => 3,
                'category_id' => 1,
                'asset_code' => 'LP000045',
                'asset_name' => 'Laptop Gaming ASUS',
                'asset_specification' => 'Laptop Gaming ASUS in Ho Chi Minh',
                'asset_installed_date' => '2022-09-27'
            ],
            [
                'location_id' => 3,
                'status_id' => 1,
                'category_id' => 1,
                'asset_code' => 'LP000046',
                'asset_name' => 'Laptop Gaming ASUS',
                'asset_specification' => 'Laptop Gaming ASUS in Ho Chi Minh',
                'asset_installed_date' => '2022-09-27'
            ],
        ];
        DB::table('asset')->insert($data);
    }
}
