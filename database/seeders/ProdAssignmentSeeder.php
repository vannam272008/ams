<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProdAssignmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //Insert data for assignment table
        $data = [
            [
                'status_id' => 1,
                'asset_id' => 1,
                'assignment_to' => 4,
                'assignment_by' => 1,
                'assignment_date_assigned' => '2022-09-27',
                'assignment_date_returned' => null,
                'assignment_note' => 'Assignment in Da Nang'
            ],
            [
                'status_id' => 1,
                'asset_id' => 3,
                'assignment_to' => 5,
                'assignment_by' => 2,
                'assignment_date_assigned' => '2022-09-27',
                'assignment_date_returned' => null,
                'assignment_note' => 'Assignment in Ha Noi'
            ],
            [
                'status_id' => 1,
                'asset_id' => 5,
                'assignment_to' => 7,
                'assignment_by' => 3,
                'assignment_date_assigned' => '2022-09-27',
                'assignment_date_returned' => null,
                'assignment_note' => 'Assignment in Ho Chi Minh'
            ],
            [
                'status_id' => 1,
                'asset_id' => 6,
                'assignment_to' => 8,
                'assignment_by' => 3,
                'assignment_date_assigned' => '2022-11-27',
                'assignment_date_returned' => null,
                'assignment_note' => 'Assignment in Ho Chi Minh'
            ],
            [
                'status_id' => 2,
                'asset_id' => 7,
                'assignment_to' => 9,
                'assignment_by' => 3,
                'assignment_date_assigned' => '2022-11-28',
                'assignment_date_returned' => null,
                'assignment_note' => 'Assignment in Ho Chi Minh'
            ],
            [
                'status_id' => 1,
                'asset_id' => 8,
                'assignment_to' => 7,
                'assignment_by' => 3,
                'assignment_date_assigned' => '2022-09-27',
                'assignment_date_returned' => null,
                'assignment_note' => 'Assignment in Ho Chi Minh'
            ],
            [
                'status_id' => 1,
                'asset_id' => 9,
                'assignment_to' => 8,
                'assignment_by' => 3,
                'assignment_date_assigned' => '2022-11-27',
                'assignment_date_returned' => null,
                'assignment_note' => 'Assignment in Ho Chi Minh'
            ],
            [
                'status_id' => 1,
                'asset_id' => 10,
                'assignment_to' => 9,
                'assignment_by' => 3,
                'assignment_date_assigned' => '2022-11-28',
                'assignment_date_returned' => null,
                'assignment_note' => 'Assignment in Ho Chi Minh'
            ],
            [
                'status_id' => 1,
                'asset_id' => 11,
                'assignment_to' => 7,
                'assignment_by' => 3,
                'assignment_date_assigned' => '2022-09-27',
                'assignment_date_returned' => null,
                'assignment_note' => 'Assignment in Ho Chi Minh'
            ],
            [
                'status_id' => 1,
                'asset_id' => 12,
                'assignment_to' => 8,
                'assignment_by' => 3,
                'assignment_date_assigned' => '2022-11-27',
                'assignment_date_returned' => null,
                'assignment_note' => 'Assignment in Ho Chi Minh'
            ],
            [
                'status_id' => 1,
                'asset_id' => 13,
                'assignment_to' => 9,
                'assignment_by' => 3,
                'assignment_date_assigned' => '2022-11-28',
                'assignment_date_returned' => null,
                'assignment_note' => 'Assignment in Ho Chi Minh'
            ],
            [
                'status_id' => 1,
                'asset_id' => 14,
                'assignment_to' => 7,
                'assignment_by' => 3,
                'assignment_date_assigned' => '2022-09-27',
                'assignment_date_returned' => null,
                'assignment_note' => 'Assignment in Ho Chi Minh'
            ],
            [
                'status_id' => 1,
                'asset_id' => 15,
                'assignment_to' => 8,
                'assignment_by' => 3,
                'assignment_date_assigned' => '2022-11-27',
                'assignment_date_returned' => null,
                'assignment_note' => 'Assignment in Ho Chi Minh'
            ],
            [
                'status_id' => 1,
                'asset_id' => 16,
                'assignment_to' => 9,
                'assignment_by' => 3,
                'assignment_date_assigned' => '2022-11-28',
                'assignment_date_returned' => null,
                'assignment_note' => 'Assignment in Ho Chi Minh'
            ],
            [
                'status_id' => 1,
                'asset_id' => 17,
                'assignment_to' => 7,
                'assignment_by' => 3,
                'assignment_date_assigned' => '2022-09-27',
                'assignment_date_returned' => null,
                'assignment_note' => 'Assignment in Ho Chi Minh'
            ],
            [
                'status_id' => 1,
                'asset_id' => 18,
                'assignment_to' => 8,
                'assignment_by' => 3,
                'assignment_date_assigned' => '2022-11-27',
                'assignment_date_returned' => null,
                'assignment_note' => 'Assignment in Ho Chi Minh'
            ],
            [
                'status_id' => 1,
                'asset_id' => 19,
                'assignment_to' => 9,
                'assignment_by' => 3,
                'assignment_date_assigned' => '2022-11-28',
                'assignment_date_returned' => null,
                'assignment_note' => 'Assignment in Ho Chi Minh'
            ],
            [
                'status_id' => 1,
                'asset_id' => 20,
                'assignment_to' => 7,
                'assignment_by' => 3,
                'assignment_date_assigned' => '2022-09-27',
                'assignment_date_returned' => null,
                'assignment_note' => 'Assignment in Ho Chi Minh'
            ],
            [
                'status_id' => 1,
                'asset_id' => 21,
                'assignment_to' => 8,
                'assignment_by' => 3,
                'assignment_date_assigned' => '2022-11-27',
                'assignment_date_returned' => null,
                'assignment_note' => 'Assignment in Ho Chi Minh'
            ],
            [
                'status_id' => 1,
                'asset_id' => 22,
                'assignment_to' => 9,
                'assignment_by' => 3,
                'assignment_date_assigned' => '2022-11-28',
                'assignment_date_returned' => null,
                'assignment_note' => 'Assignment in Ho Chi Minh'
            ],
            [
                'status_id' => 1,
                'asset_id' => 23,
                'assignment_to' => 7,
                'assignment_by' => 3,
                'assignment_date_assigned' => '2022-09-27',
                'assignment_date_returned' => null,
                'assignment_note' => 'Assignment in Ho Chi Minh'
            ],
            [
                'status_id' => 1,
                'asset_id' => 24,
                'assignment_to' => 8,
                'assignment_by' => 3,
                'assignment_date_assigned' => '2022-11-27',
                'assignment_date_returned' => null,
                'assignment_note' => 'Assignment in Ho Chi Minh'
            ],
            [
                'status_id' => 1,
                'asset_id' => 25,
                'assignment_to' => 9,
                'assignment_by' => 3,
                'assignment_date_assigned' => '2022-11-28',
                'assignment_date_returned' => null,
                'assignment_note' => 'Assignment in Ho Chi Minh'
            ],
            [
                'status_id' => 1,
                'asset_id' => 26,
                'assignment_to' => 7,
                'assignment_by' => 3,
                'assignment_date_assigned' => '2022-09-27',
                'assignment_date_returned' => null,
                'assignment_note' => 'Assignment in Ho Chi Minh'
            ],
            [
                'status_id' => 1,
                'asset_id' => 27,
                'assignment_to' => 8,
                'assignment_by' => 3,
                'assignment_date_assigned' => '2022-11-27',
                'assignment_date_returned' => null,
                'assignment_note' => 'Assignment in Ho Chi Minh'
            ],
            [
                'status_id' => 1,
                'asset_id' => 28,
                'assignment_to' => 9,
                'assignment_by' => 3,
                'assignment_date_assigned' => '2022-11-28',
                'assignment_date_returned' => null,
                'assignment_note' => 'Assignment in Ho Chi Minh'
            ],
            [
                'status_id' => 1,
                'asset_id' => 29,
                'assignment_to' => 7,
                'assignment_by' => 3,
                'assignment_date_assigned' => '2022-09-27',
                'assignment_date_returned' => null,
                'assignment_note' => 'Assignment in Ho Chi Minh'
            ],
            [
                'status_id' => 1,
                'asset_id' => 30,
                'assignment_to' => 8,
                'assignment_by' => 3,
                'assignment_date_assigned' => '2022-11-27',
                'assignment_date_returned' => null,
                'assignment_note' => 'Assignment in Ho Chi Minh'
            ],
            [
                'status_id' => 1,
                'asset_id' => 31,
                'assignment_to' => 9,
                'assignment_by' => 3,
                'assignment_date_assigned' => '2022-11-28',
                'assignment_date_returned' => null,
                'assignment_note' => 'Assignment in Ho Chi Minh'
            ],
            [
                'status_id' => 1,
                'asset_id' => 32,
                'assignment_to' => 7,
                'assignment_by' => 3,
                'assignment_date_assigned' => '2022-09-27',
                'assignment_date_returned' => null,
                'assignment_note' => 'Assignment in Ho Chi Minh'
            ],
            [
                'status_id' => 1,
                'asset_id' => 33,
                'assignment_to' => 8,
                'assignment_by' => 3,
                'assignment_date_assigned' => '2022-11-27',
                'assignment_date_returned' => null,
                'assignment_note' => 'Assignment in Ho Chi Minh'
            ],
            [
                'status_id' => 1,
                'asset_id' => 34,
                'assignment_to' => 9,
                'assignment_by' => 3,
                'assignment_date_assigned' => '2022-11-28',
                'assignment_date_returned' => null,
                'assignment_note' => 'Assignment in Ho Chi Minh'
            ],
            [
                'status_id' => 1,
                'asset_id' => 35,
                'assignment_to' => 7,
                'assignment_by' => 3,
                'assignment_date_assigned' => '2022-09-27',
                'assignment_date_returned' => null,
                'assignment_note' => 'Assignment in Ho Chi Minh'
            ],
            [
                'status_id' => 1,
                'asset_id' => 36,
                'assignment_to' => 8,
                'assignment_by' => 3,
                'assignment_date_assigned' => '2022-11-27',
                'assignment_date_returned' => null,
                'assignment_note' => 'Assignment in Ho Chi Minh'
            ],
            [
                'status_id' => 1,
                'asset_id' => 37,
                'assignment_to' => 9,
                'assignment_by' => 3,
                'assignment_date_assigned' => '2022-11-28',
                'assignment_date_returned' => null,
                'assignment_note' => 'Assignment in Ho Chi Minh'
            ],
            [
                'status_id' => 1,
                'asset_id' => 38,
                'assignment_to' => 7,
                'assignment_by' => 3,
                'assignment_date_assigned' => '2022-09-27',
                'assignment_date_returned' => null,
                'assignment_note' => 'Assignment in Ho Chi Minh'
            ],
            [
                'status_id' => 1,
                'asset_id' => 39,
                'assignment_to' => 8,
                'assignment_by' => 3,
                'assignment_date_assigned' => '2022-11-27',
                'assignment_date_returned' => null,
                'assignment_note' => 'Assignment in Ho Chi Minh'
            ],
            [
                'status_id' => 1,
                'asset_id' => 40,
                'assignment_to' => 9,
                'assignment_by' => 3,
                'assignment_date_assigned' => '2022-11-28',
                'assignment_date_returned' => null,
                'assignment_note' => 'Assignment in Ho Chi Minh'
            ],
            [
                'status_id' => 1,
                'asset_id' => 41,
                'assignment_to' => 7,
                'assignment_by' => 3,
                'assignment_date_assigned' => '2022-09-27',
                'assignment_date_returned' => null,
                'assignment_note' => 'Assignment in Ho Chi Minh'
            ],
            [
                'status_id' => 1,
                'asset_id' => 42,
                'assignment_to' => 8,
                'assignment_by' => 3,
                'assignment_date_assigned' => '2022-11-27',
                'assignment_date_returned' => null,
                'assignment_note' => 'Assignment in Ho Chi Minh'
            ],
            [
                'status_id' => 1,
                'asset_id' => 43,
                'assignment_to' => 9,
                'assignment_by' => 3,
                'assignment_date_assigned' => '2022-11-28',
                'assignment_date_returned' => null,
                'assignment_note' => 'Assignment in Ho Chi Minh'
            ],
            [
                'status_id' => 1,
                'asset_id' => 44,
                'assignment_to' => 9,
                'assignment_by' => 3,
                'assignment_date_assigned' => '2022-11-28',
                'assignment_date_returned' => null,
                'assignment_note' => 'Assignment in Ho Chi Minh'
            ],
            [
                'status_id' => 1,
                'asset_id' => 45,
                'assignment_to' => 9,
                'assignment_by' => 3,
                'assignment_date_assigned' => '2022-11-28',
                'assignment_date_returned' => null,
                'assignment_note' => 'Assignment in Ho Chi Minh'
            ],
        ];
        DB::table('assignment')->insert($data);
    }
}
