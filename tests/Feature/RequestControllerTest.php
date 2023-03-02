<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class RequestControllerTest extends TestCase
{
    use DatabaseMigrations;

    public function setUp(): void
    {
        parent::setUp();
        $this->artisan('db:seed');
    }

    public function testGetRequestList()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $response = $this->get('/api/request-for-returning');
        $response->assertStatus(200)->assertJsonStructure([
            'data',
            'links',
            'meta'
        ]);
    }

    public function testGetRequestListApplySortFilterSearch()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $response = $this->get('/api/request-for-returning?sort=assigned_date&state=2&search=ph');
        $response->assertStatus(200)->assertJsonStructure([
            'data',
            'links',
            'meta'
        ]);
    }
}
