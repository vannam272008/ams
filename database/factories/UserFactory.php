<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = User::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $firstName = $this->faker->unique()->firstName();
        $lastName = $this->faker->name();

        $userName = strtolower($firstName);

        foreach (explode(' ', $lastName) as $word) {
            $userName .= strtolower($word[0]);
        }

        $rndDate = $this->faker->randomElement([
            '-1 month',
            '-2 months',
            '-3 months',
            '-4 months',
            '-5 months',
            '-6 months',
            '-1 year',
            '-2 years',
            '-3 years',
            '-4 years',
            '-5 years',
            '-6 years',
        ]);

        return [
            'first_name' => $firstName,
            'last_name' => $lastName,
            'date_of_birth' => $this->faker->dateTimeBetween('-50 years', '-19 years'),
            'joined_date' => $this->faker->dateTimeBetween($rndDate),
            'gender' => $this->faker->randomElement([true, false]),
            'staff_code' => 'SD',
            'user_name' => $userName,
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'first_login' => true,
        ];
    }
}
