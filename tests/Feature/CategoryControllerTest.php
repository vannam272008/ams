<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class CategoryControllerTest extends TestCase
{
    use DatabaseMigrations;

    public function setUp(): void
    {
        parent::setUp();
        $this->artisan('db:seed');
    }

    public function testGetCategoryList()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $response = $this->get('/api/category');
        $response->assertStatus(200)->assertJsonStructure([
            'data',
        ]);
    }

    public function testGetCategoryOrderByIdList()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $response = $this->get('/api/category-by-id');
        $response->assertStatus(200)->assertJsonStructure([
            'data',
        ]);
    }

    public function testCreateCategorySuccessfully(){
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $category = [
            'category_name' => 'PC ASUS',
            'category_prefix' => 'PCA',
        ];
        $response = $this->post('/api/category', $category);
        $response->assertStatus(201)->assertJsonStructure([
            'data',
        ]);
    }

    public function testCreateCategoryFailedDueToExistCategoryName(){
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $category = [
            'category_name' => 'Laptop',
            'category_prefix' => 'LPA',
        ];
        $response = $this->post('/api/category', $category);
        $response->assertStatus(422)->assertJsonStructure([
            'error'
        ]);
    }

    public function testCreateCategoryFailedDueToExistCategoryPrefix(){
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $category = [
            'category_name' => 'Laptop Asus',
            'category_prefix' => 'LP',
        ];
        $response = $this->post('/api/category', $category);
        $response->assertStatus(422)->assertJsonStructure([
            'error'
        ]);
    }

    public function testCreateCategoryFailedDueToCategoryNameRegex(){
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $category = [
            'category_name' => 'Laptop Asus @',
            'category_prefix' => 'LP',
        ];
        $response = $this->post('/api/category', $category);
        $response->assertStatus(422)->assertJsonStructure([
            'error'
        ]);
    }

    public function testCreateCategoryFailedDueToCategoryPrefixRegex(){
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $category = [
            'category_name' => 'Laptop Asus',
            'category_prefix' => 'LP@',
        ];
        $response = $this->post('/api/category', $category);
        $response->assertStatus(422)->assertJsonStructure([
            'error'
        ]);
    }

    public function testCreateCategoryFailedDueToCategoryNameRequired(){
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $category = [
            'category_name' => '',
            'category_prefix' => 'LPT',
        ];
        $response = $this->post('/api/category', $category);
        $response->assertStatus(422)->assertJsonStructure([
            'error'
        ]);
    }

    public function testCreateCategoryFailedDueToCategoryPrefixRequired(){
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $category = [
            'category_name' => 'Laptop ASUS',
            'category_prefix' => '',
        ];
        $response = $this->post('/api/category', $category);
        $response->assertStatus(422)->assertJsonStructure([
            'error'
        ]);
    }

    public function testCreateCategoryFailedDueToCategoryNameMaxLength(){
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $category = [
            'category_name' => 'Laptop ASUS sssssssssssssssssss',
            'category_prefix' => 'LPT',
        ];
        $response = $this->post('/api/category', $category);
        $response->assertStatus(422)->assertJsonStructure([
            'error'
        ]);
    }

    public function testCreateCategoryFailedDueToCategoryPrefixMaxLength(){
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $category = [
            'category_name' => 'Laptop ASUS',
            'category_prefix' => 'LPTT',
        ];
        $response = $this->post('/api/category', $category);
        $response->assertStatus(422)->assertJsonStructure([
            'error'
        ]);
    }
}
