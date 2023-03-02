<?php

namespace Database\Seeders;

use App\Models\Location;
use App\Models\User;
use Faker\Factory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $idLength = 6;
        $locations = Location::all();
        $faker = Factory::create();
        foreach ($locations as $location) {
            $users = User::factory()
                ->count($faker->numberBetween(5, 10))
                ->create([
                    'location_id' => $location->id,
                ]);
            $admin = true;
            foreach ($users as $user) {
                if ($admin) {
                    $user->admin = $admin;
                    $admin = false;
                }
                for ($i = 0; $i < $idLength - strlen($user->id); $i++) {
                    $user->staff_code .= '0';
                }
                $user->staff_code .= $user->id;
                $password = $user->user_name . '@' . date_format($user->date_of_birth, "dmY");
                $user->password = Hash::make($password);
                $user->save();
            }
        }
    }
}
