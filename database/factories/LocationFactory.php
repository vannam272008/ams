<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Location;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Location>
 */
class LocationFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Location::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $locationName = $this->faker->unique()->randomElement([
            'Ha Noi',
            'Ho Chi Minh',
            'Da Nang',
        ]);

        $locationPrefix = '';
        foreach (explode(" ", $locationName) as $word) {
            $locationPrefix .= $word[0];
        }

        return [
            'location_name' => $locationName,
            'location_prefix' => $locationPrefix,
        ];
    }
}
