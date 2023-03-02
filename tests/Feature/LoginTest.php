<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class LoginTest extends TestCase
{
    use withFaker;
    use DatabaseMigrations;

    public function setUp(): void
    {
        parent::setUp();
        $this->artisan('db:seed');
    }

    /**
     * Test login failed due to not entering username and password.
     *
     * @return void
     */
    public function testLoginFailedDueToNotEnteringUsernameAndPassword()
    {
        $this->withoutExceptionHandling();
        $loginForm = [
            'user_name' => '',
            'password' => ''
        ];
        $response = $this->post('/api/session', $loginForm);
        $response->assertStatus(422);
    }

    /**
     * Test login failed due to not entering username.
     *
     * @return void
     */
    public function testLoginFailedDueToNotEnteringUsername()
    {
        $this->withoutExceptionHandling();
        $loginForm = [
            'user_name' => '',
            'password' => 'adminam@01012000'
        ];
        $response = $this->post('/api/session', $loginForm);
        $response->assertStatus(422);;
    }

    /**
     * Test login failed due to not entering password.
     *
     * @return void
     */
    public function testLoginFailedDueToNotEnteringPassword()
    {
        $this->withoutExceptionHandling();
        $loginForm = [
            'user_name' => 'adminam',
            'password' => ''
        ];
        $response = $this->post('/api/session', $loginForm);
        $response->assertStatus(422);
    }

    // /**
    //  * Test login failed due to entering incorrect password.
    //  *
    //  * @return void
    //  */
    // public function testLoginFailedDueToEnteringIncorrectPassword()
    // {
    //     $this->withoutExceptionHandling();
    //     User::factory()->create([
    //         'location_id' => 1,
    //         'staff_code' => 'SD200001',
    //         'user_name' => 'phan',
    //         'password' => Hash::make('password')
    //     ]);
    //     $loginForm = [
    //         'user_name' => 'phan',
    //         'password' => 'passwor'
    //     ];
    //     $response = $this->post('/api/session', $loginForm);
    //     $response->assertStatus(404);
    // }

    // /**
    //  * Test login failed due to entering incorrect user name.
    //  *
    //  * @return void
    //  */
    // public function testLoginFailedDueToEnteringIncorrectUserName()
    // {
    //     $this->withoutExceptionHandling();
    //     User::factory()->create([
    //         'location_id' => 1,
    //         'staff_code' => 'SD200001',
    //         'user_name' => 'phan',
    //         'password' => Hash::make('password')
    //     ]);
    //     $loginForm = [
    //         'user_name' => 'pha',
    //         'password' => 'password'
    //     ];
    //     $response = $this->post('/api/session', $loginForm);
    //     $response->assertStatus(404);
    // }

    /**
     * Test login successfully.
     *
     * @return void
     */
    public function testLoginSuccessfully()
    {
        $this->withoutExceptionHandling();
        User::factory()->create([
            'location_id' => 1,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]);
        $loginForm = [
            'user_name' => 'phan',
            'password' => 'password'
        ];
        $response = $this->post('/api/session', $loginForm);
        $response->assertStatus(200);
    }
}
