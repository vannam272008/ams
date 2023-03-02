<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class ProdAssignmentStatusSeeder extends Seeder
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
                'assignment_status_name' => 'Accepted',
                'assignment_status_description' => 'Assignment is accepted by assignee',
            ],
            [
                'assignment_status_name' => 'Waiting for acceptance',
                'assignment_status_description' => 'Assignment has been just created and has not been responded by assignee',
            ],
            [
                'assignment_status_name' => 'Declined',
                'assignment_status_description' => 'Assignment is declined by assignee',
            ],
            [
                'assignment_status_name' => 'Canceled',
                'assignment_status_description' => 'Assignment is canceled by assignee',
            ],
        ];
        DB::table('assignment_status')->insert($data);
    }
}
