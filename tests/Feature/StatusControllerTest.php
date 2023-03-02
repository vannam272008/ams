<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use App\Models\User;
use Laravel\Sanctum\Sanctum;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class StatusControllerTest extends TestCase
{
    use DatabaseMigrations;

    public function setUp(): void
    {
        parent::setUp();
        $this->artisan('db:seed');
    }

    public function testGetAssetStatusList()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $response = $this->get('/api/asset-status');
        $response->assertStatus(200)->assertJsonStructure([
            'data',
        ]);
    }

    public function testGetAssignmentStatusList()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $response = $this->get('/api/assignment-status');
        $response->assertStatus(200)->assertJsonStructure([
            'data',
        ]);
    }
}
