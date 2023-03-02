<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\WithFaker;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class ChangePasswordTest extends TestCase
{
    use withFaker;
    use DatabaseMigrations;

    public function setUp(): void
    {
        parent::setUp();
        $this->artisan('db:seed');
    }

    /**
     * Test change password failed due to not entering new password and old password.
     *
     * @return void
     */
    public function testChangePasswordFailedDueToNotEnteringNewPasswordAndOldPassword()
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
        $token = $response->getData()->data->remember_token;

        $changePasswordForm = [
            'new_password' => '',
            'old_password' => ''
        ];
        $response = $this->patch('/api/user/change-password', $changePasswordForm, [
            'Authorization' => "Bearer $token"
        ]);

        $response->assertStatus(422);
    }

    /**
     * Test change password failed due to not entering new password.
     *
     * @return void
     */
    public function testChangePasswordFailedDueToNotEnteringNewPassword()
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
        $token = $response->getData()->data->remember_token;

        $changePasswordForm = [
            'new_password' => '',
            'old_password' => 'password'
        ];
        $response = $this->patch('/api/user/change-password', $changePasswordForm, [
            'Authorization' => "Bearer $token"
        ]);
        $response->assertStatus(422);
    }

    /**
     * Test change password failed due to not entering old password.
     *
     * @return void
     */
    public function testChangePasswordFailedDueToNotEnteringOldPassword()
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
        $token = $response->getData()->data->remember_token;

        $changePasswordForm = [
            'new_password' => 'password',
            'old_password' => ''
        ];
        $response = $this->patch('/api/user/change-password', $changePasswordForm, [
            'Authorization' => "Bearer $token"
        ]);
        $response->assertStatus(422);
    }

    // /**
    //  * Test change password failed due to entering incorrect old password.
    //  *
    //  * @return void
    //  */
    // public function testChangePasswordFailedDueToEnteringIncorrectOldPassword()
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
    //         'password' => 'password'
    //     ];
    //     $response = $this->post('/api/session', $loginForm);
    //     $response->assertStatus(200);
    //     $token = $response->getData()->data->remember_token;

    //     $changePasswordForm = [
    //         'new_password' => 'password12',
    //         'old_password' => 'passwor'
    //     ];
    //     $response = $this->patch('/api/user/change-password', $changePasswordForm, [
    //         'Authorization' => "Bearer $token"
    //     ]);
    //     $response->assertStatus(422);
    // }

    // /**
    //  * Test change password failed due to entering old password same as new password.
    //  *
    //  * @return void
    //  */
    // public function testChangePasswordFailedDueToEnteringOldPasswordSameAsNewPassword()
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
    //         'password' => 'password'
    //     ];
    //     $response = $this->post('/api/session', $loginForm);
    //     $response->assertStatus(200);
    //     $token = $response->getData()->data->remember_token;

    //     $changePasswordForm = [
    //         'new_password' => 'password',
    //         'old_password' => 'password'
    //     ];
    //     $response = $this->patch('/api/user/change-password', $changePasswordForm, [
    //         'Authorization' => "Bearer $token"
    //     ]);
    //     $response->assertStatus(422);
    // }

    /**
     * Test change password successfully.
     *
     * @return void
     */
    public function testChangePasswordSuccessfully()
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
        $token = $response->getData()->data->remember_token;

        $changePasswordForm = [
            'new_password' => 'Password@112000',
            'old_password' => 'password'
        ];
        $response = $this->patch('/api/user/change-password', $changePasswordForm, [
            'Authorization' => "Bearer $token"
        ]);
        $response->assertStatus(200);
    }

    /**
     * Test change password failed due to not entering old password.
     *
     * @return void
     */
    public function testChangePasswordFirstFailedDueToEnteringWrongNewPasswordFormat()
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
        $token = $response->getData()->data->remember_token;

        $changePasswordForm = [
            'new_password' => 'password',
        ];
        $response = $this->patch('/api/user/change-password-first', $changePasswordForm, [
            'Authorization' => "Bearer $token"
        ]);
        $response->assertStatus(422);
    }

    /**
     * Test change password first successfully.
     *
     * @return void
     */
    public function testChangePasswordFirstSuccessfully()
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
        $token = $response->getData()->data->remember_token;

        $changePasswordForm = [
            'new_password' => 'Password@112000',
            'old_password' => 'password'
        ];
        $response = $this->patch('/api/user/change-password-first', $changePasswordForm, [
            'Authorization' => "Bearer $token"
        ]);
        $response->assertStatus(200);
    }
}
