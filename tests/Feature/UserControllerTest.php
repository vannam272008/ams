<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Sanctum\Sanctum;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class UserControllerTest extends TestCase
{
    use DatabaseMigrations;

    public function setUp(): void
    {
        parent::setUp();
        $this->artisan('db:seed');
    }

    //Create user -------------------------------------
    /**
     * Test create user failed due to not entering first name.
     *
     * @return void
     */
    public function testCreateUserFailedByNotEnteringFirstName()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $user = [
            'location_id' => 3,
            'first_name' => '',
            'last_name' => 'Ho Van',
            'date_of_birth' => '2000-01-01',
            'joined_date' => '2022-09-27',
            'gender' => true,
            'admin' => false,
        ];
        $response = $this->post('/api/user', $user);
        $response->assertStatus(422)->assertJsonStructure([
            'error'
        ]);
    }

    /**
     * Test create user failed due to entering first name too long.
     *
     * @return void
     */
    public function testCreateUserFailedByEnteringFirstNameTooLong()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $user = [
            'location_id' => 3,
            'first_name' => 'Nammmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm',
            'last_name' => 'Ho Van',
            'date_of_birth' => '2000-01-01',
            'joined_date' => '2022-09-27',
            'gender' => true,
            'admin' => false,
        ];
        $response = $this->post('/api/user', $user);
        $response->assertStatus(422)->assertJsonStructure([
            'error'
        ]);
    }

    /**
     * Test create user failed due to entering first name contain special chars.
     *
     * @return void
     */
    public function testCreateUserFailedByEnteringFirstNameContainSpecialChars()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $user = [
            'location_id' => 3,
            'first_name' => 'Nam</~',
            'last_name' => 'Ho Van',
            'date_of_birth' => '2000-01-01',
            'joined_date' => '2022-09-27',
            'gender' => true,
            'admin' => false,
        ];
        $response = $this->post('/api/user', $user);
        $response->assertStatus(422)->assertJsonStructure([
            'error'
        ]);
    }

    /**
     * Test create user failed due to not entering last name.
     *
     * @return void
     */
    public function testCreateUserFailedByNotEnteringLatsName()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $user = [
            'location_id' => 3,
            'first_name' => 'Nam',
            'last_name' => '',
            'date_of_birth' => '2000-01-01',
            'joined_date' => '2022-09-27',
            'gender' => true,
            'admin' => false,
        ];
        $response = $this->post('/api/user', $user);
        $response->assertStatus(422)->assertJsonStructure([
            'error'
        ]);
    }

    /**
     * Test create user failed due to entering last name too long.
     *
     * @return void
     */
    public function testCreateUserFailedByEnteringLastNameTooLong()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $user = [
            'location_id' => 3,
            'first_name' => 'Nam',
            'last_name' => 'Hooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo Vannnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn',
            'date_of_birth' => '2000-01-01',
            'joined_date' => '2022-09-27',
            'gender' => true,
            'admin' => false,
        ];
        $response = $this->post('/api/user', $user);
        $response->assertStatus(422)->assertJsonStructure([
            'error'
        ]);
    }

    /**
     * Test create user failed due to entering last name contain special chars.
     *
     * @return void
     */
    public function testCreateUserFailedByEnteringLastNameContainSpecialChars()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $user = [
            'location_id' => 3,
            'first_name' => 'Nam',
            'last_name' => 'Ho Van /~<',
            'date_of_birth' => '2000-01-01',
            'joined_date' => '2022-09-27',
            'gender' => true,
            'admin' => false,
        ];
        $response = $this->post('/api/user', $user);
        $response->assertStatus(422)->assertJsonStructure([
            'error'
        ]);
    }

    /**
     * Test create user failed due to not entering date of birth.
     *
     * @return void
     */
    public function testCreateUserFailedByNotEnteringDateOfBirth()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $user = [
            'location_id' => 3,
            'first_name' => 'Nam',
            'last_name' => 'Ho Van',
            'date_of_birth' => '',
            'joined_date' => '2022-09-27',
            'gender' => true,
            'admin' => false,
        ];
        $response = $this->post('/api/user', $user);
        $response->assertStatus(422)->assertJsonStructure([
            'error'
        ]);
    }

    /**
     * Test create user failed due to not entering joined date.
     *
     * @return void
     */
    public function testCreateUserFailedByNotEnteringJoinedDate()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $user = [
            'location_id' => 3,
            'first_name' => 'Nam',
            'last_name' => 'Ho Van',
            'date_of_birth' => '2000-01-01',
            'joined_date' => '',
            'gender' => true,
            'admin' => false,
        ];
        $response = $this->post('/api/user', $user);
        $response->assertStatus(422)->assertJsonStructure([
            'error'
        ]);
    }

    /**
     * Test create user failed due to entering joined date earlier than date of birth.
     *
     * @return void
     */
    public function testCreateUserFailedByEnteringJoinedDateEarlierThanDateOfBirth()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $user = [
            'location_id' => 3,
            'first_name' => 'Nam',
            'last_name' => 'Ho Van',
            'date_of_birth' => '2000-01-01',
            'joined_date' => '1999-01-01',
            'gender' => true,
            'admin' => false,
        ];
        $response = $this->post('/api/user', $user);
        $response->assertStatus(422)->assertJsonStructure([
            'error'
        ]);
    }

    /**
     * Test create user failed due to not entering type.
     *
     * @return void
     */
    public function testCreateUserFailedByNotEnteringType()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $user = [
            'location_id' => 3,
            'first_name' => 'Nam',
            'last_name' => 'Ho Van',
            'date_of_birth' => '2000-01-01',
            'joined_date' => '',
            'gender' => true,
        ];
        $response = $this->post('/api/user', $user);
        $response->assertStatus(422)->assertJsonStructure([
            'error'
        ]);
    }

    /**
     * Test create user failed due to not entering gender.
     *
     * @return void
     */
    public function testCreateUserFailedByNotEnteringGender()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $user = [
            'location_id' => 3,
            'first_name' => 'Nam',
            'last_name' => 'Ho Van',
            'date_of_birth' => '2000-01-01',
            'joined_date' => '',
            'admin' => false,
        ];
        $response = $this->post('/api/user', $user);
        $response->assertStatus(422)->assertJsonStructure([
            'error'
        ]);
    }

    /**
     * Test create user failed by entering new user with age < 18.
     *
     * @return void
     */
    public function testCreateUserFailedByEnteringNewUserWithAgeLessThanEighteen()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $user = [
            'location_id' => 3,
            'first_name' => 'Nam',
            'last_name' => 'Ho Van',
            'date_of_birth' => '2005-01-01',
            'joined_date' => '2022-11-27',
            'gender' => true,
            'admin' => false,
        ];
        $response = $this->post('/api/user', $user);
        $response->assertStatus(422)->assertJsonStructure([
            'error'
        ]);
    }

    /**
     * Test create user successfully.
     *
     * @return void
     */
    public function testCreateUserSuccessfully()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $user = [
            'location_id' => 3,
            'first_name' => 'Nam',
            'last_name' => 'Ho Van',
            'date_of_birth' => '2000-01-01',
            'joined_date' => '2022-09-27',
            'gender' => true,
            'admin' => false,
        ];
        $response = $this->post('/api/user', $user);
        $response->assertStatus(201)->assertJsonStructure([
            'data'
        ]);
    }

    //Get asset by id -------------------------------------

    /**
     * Test get user by id successfully.
     *
     * @return void
     */
    public function testGetUserByIdSuccessfully()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $id = 3;
        $response = $this->get('/api/user/' . $id);
        $response->assertStatus(200)->assertJsonStructure([
            'data'
        ]);
    }

    /**
     * Test get user by id failed.
     *
     * @return void
     */
    public function testGetUserByIdFailed()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $id = 3000;
        $response = $this->get('/api/user/' . $id);
        $response->assertStatus(500);
    }

    //Update user -------------------------------------
    public function testUpdateUserSuccessfully()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $id = 8;
        $update_user = [
            'id' => $id,
            'date_of_birth' => '2000-01-01',
            'gender' => 1,
            'joined_date' => '2022-01-03',
            'type' => 1,
        ];
        $response = $this->put('/api/user/' . $id, $update_user);
        $response->assertStatus(200)->assertJsonStructure([
            'data'
        ]);
    }

    public function testUpdateUserFailedDueToSaturdayJoinedDate()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $id = 8;
        $update_user = [
            'id' => $id,
            'date_of_birth' => '2000-01-01',
            'gender' => 1,
            'joined_date' => '2022-01-01',
            'type' => 1,
        ];
        $response = $this->put('/api/user/' . $id, $update_user);
        $response->assertStatus(422)->assertJsonStructure([
            'error'
        ]);
    }

    public function testUpdateUserFailedDueToJoinedAgeLessThanEighteen()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $id = 8;
        $update_user = [
            'id' => $id,
            'date_of_birth' => '2003-01-01',
            'gender' => 1,
            'joined_date' => '2017-01-01',
            'type' => 1,
        ];
        $response = $this->put('/api/user/' . $id, $update_user);
        $response->assertStatus(422)->assertJsonStructure([
            'error'
        ]);
    }

    public function testUpdateUserFailedDueToAgeLessThanEighteen()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $id = 8;
        $update_user = [
            'id' => $id,
            'date_of_birth' => '2008-01-01',
            'gender' => 1,
            'joined_date' => '2022-01-01',
            'type' => 1,
        ];
        $response = $this->put('/api/user/' . $id, $update_user);
        $response->assertStatus(422)->assertJsonStructure([
            'error'
        ]);
    }

    public function testUpdateUserFailedDueToDifferentLocation()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $id = 4;
        $update_user = [
            'id' => $id,
            'date_of_birth' => '2008-01-01',
            'gender' => 1,
            'joined_date' => '2022-01-01',
            'type' => 1,
        ];
        $response = $this->put('/api/user/' . $id, $update_user);
        $response->assertStatus(422)->assertJsonStructure([
            'error'
        ]);
    }
}
