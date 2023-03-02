<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ProdUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //Insert data for user table
        $data = [
            [
                'location_id' => 1,
                'first_name' => 'Admin',
                'last_name' => 'Da Nang',
                'date_of_birth' => '2000-01-01',
                'joined_date' => '2022-09-27',
                'gender' => 1,
                'admin' => 1,
                'staff_code' => 'SD0001',
                'user_name' => 'admindn',
                'password' => Hash::make('Admindn@01012000'),
                'first_login' => true
            ],
            [
                'location_id' => 2,
                'first_name' => 'Admin',
                'last_name' => 'Ha Noi',
                'date_of_birth' => '2000-01-01',
                'joined_date' => '2022-09-27',
                'gender' => 1,
                'admin' => 1,
                'staff_code' => 'SD0002',
                'user_name' => 'adminhn',
                'password' => Hash::make('Adminhn@01012000'),
                'first_login' => true
            ],
            [
                'location_id' => 3,
                'first_name' => 'Admin',
                'last_name' => 'Ho Chi Minh',
                'date_of_birth' => '2000-01-01',
                'joined_date' => '2022-09-27',
                'gender' => 1,
                'admin' => 1,
                'staff_code' => 'SD0003',
                'user_name' => 'adminhcm',
                'password' => Hash::make('Adminhcm@01012000'),
                'first_login' => true
            ],
            [
                'location_id' => 1,
                'first_name' => 'An',
                'last_name' => 'Pham Huynh Thien',
                'date_of_birth' => '2000-01-01',
                'joined_date' => '2022-09-27',
                'gender' => 0,
                'admin' => 0,
                'staff_code' => 'SD0004',
                'user_name' => 'anpht',
                'password' => Hash::make('Anpht@01012000'),
                'first_login' => true
            ],
            [
                'location_id' => 2,
                'first_name' => 'Huu',
                'last_name' => 'Nguyen Thien',
                'date_of_birth' => '2000-01-01',
                'joined_date' => '2022-09-27',
                'gender' => 1,
                'admin' => 0,
                'staff_code' => 'SD0005',
                'user_name' => 'huunt',
                'password' => Hash::make('Huunt@01012000'),
                'first_login' => true
            ],
            [
                'location_id' => 2,
                'first_name' => 'Huy',
                'last_name' => 'Tran',
                'date_of_birth' => '2000-01-01',
                'joined_date' => '2022-09-27',
                'gender' => 1,
                'admin' => 0,
                'staff_code' => 'SD0006',
                'user_name' => 'huyt',
                'password' => Hash::make('Huyt@01012000'),
                'first_login' => true
            ],
            [
                'location_id' => 3,
                'first_name' => 'Khoa',
                'last_name' => 'Mai Anh',
                'date_of_birth' => '2000-01-01',
                'joined_date' => '2022-09-27',
                'gender' => 1,
                'admin' => 0,
                'staff_code' => 'SD0007',
                'user_name' => 'khoama',
                'password' => Hash::make('Khoama@01012000'),
                'first_login' => true
            ],
            [
                'location_id' => 3,
                'first_name' => 'Phu',
                'last_name' => 'Vu Ngoc',
                'date_of_birth' => '2000-01-01',
                'joined_date' => '2022-09-27',
                'gender' => 1,
                'admin' => 0,
                'staff_code' => 'SD0008',
                'user_name' => 'phuvn',
                'password' => Hash::make('Phuvn@01012000'),
                'first_login' => true
            ],
            [
                'location_id' => 3,
                'first_name' => 'Quy',
                'last_name' => 'Phan Quang',
                'date_of_birth' => '2000-01-01',
                'joined_date' => '2022-09-27',
                'gender' => 1,
                'admin' => 0,
                'staff_code' => 'SD0009',
                'user_name' => 'quypq',
                'password' => Hash::make('Quypq@01012000'),
                'first_login' => true
            ],
        ];
        DB::table('user')->insert($data);
    }
}
