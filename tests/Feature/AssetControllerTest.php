<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AssetControllerTest extends TestCase
{
    use DatabaseMigrations;

    public function setUp(): void
    {
        parent::setUp();
        $this->artisan('db:seed');
    }


    //Get Asset --------------------------
    public function testGetAssetListWithoutApplyingSortFilterSearch()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $response = $this->get('/api/asset');
        $response->assertStatus(200)->assertJsonStructure([
            'data',
            'links',
            'meta'
        ]);
    }

    public function testGetAssetListApplyingSortWitSortField()
    {
        $this->withoutExceptionHandling();
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $response = $this->get('/api/asset?sort=asset_name');
        $response->assertStatus(200)->assertJsonStructure([
            'data',
            'links',
            'meta'
        ]);
    }

    public function testGetAssetListApplyingSortWithDefaultSortFieldAndDefaultSortType()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $response = $this->get('/api/asset?sort=&sorttype=');
        $response->assertStatus(200)->assertJsonStructure([
            'data',
            'links',
            'meta'
        ]);
    }

    public function testGetAssetListApplyingSortWithSortFieldAndSortType()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $response = $this->get('/api/asset?sort=asset_name&sorttype=1');
        $response->assertStatus(200)->assertJsonStructure([
            'data',
            'links',
            'meta'
        ]);
    }

    public function testGetAssetListApplyingStatusFilterWithStatusId()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $response = $this->get('/api/asset?status_id=1');
        $response->assertStatus(200)->assertJsonStructure([
            'data',
            'links',
            'meta'
        ]);
    }

    public function testGetAssetListApplyingStatusFilterWithAllStatusId()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $response = $this->get('/api/asset?status_id=all');
        $response->assertStatus(200)->assertJsonStructure([
            'data',
            'links',
            'meta'
        ]);
    }

    public function testGetAssetListApplyingCategoryFilterWithCategoryId()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $response = $this->get('/api/asset?category_id=1');
        $response->assertStatus(200)->assertJsonStructure([
            'data',
            'links',
            'meta'
        ]);
    }

    public function testGetAssetListApplyingCategoryFilterWithAllCategoryId()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $response = $this->get('/api/asset?category_id=all');
        $response->assertStatus(200)->assertJsonStructure([
            'data',
            'links',
            'meta'
        ]);
    }

    public function testGetAssetListApplyingSearchByAssetCode()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $response = $this->get('/api/asset?search=001');
        $response->assertStatus(200)->assertJsonStructure([
            'data',
            'links',
            'meta'
        ]);
    }

    public function testGetAssetListApplyingSearchByAssetName()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $response = $this->get('/api/asset?search=laptop');
        $response->assertStatus(200)->assertJsonStructure([
            'data',
            'links',
            'meta'
        ]);
    }

    public function testGetAssetListApplyingSearchWithoutInput()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $response = $this->get('/api/asset?search=');
        $response->assertStatus(200)->assertJsonStructure([
            'data',
            'links',
            'meta'
        ]);
    }

    public function testGetAssetListApplyingSortFilterSearch()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $response = $this->get('/api/asset?sort=category_name&status_id=2&search=&perpage=10');
        $response->assertStatus(200)->assertJsonStructure([
            'data',
            'links',
            'meta'
        ]);
    }

    public function testGetAssetById()
    {
        $id = 6;
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $response = $this->get('/api/asset/' . $id);
        $response->assertStatus(200)->assertJsonStructure([
            'data',
        ]);
    }

    public function testGetAssetWithDifferentLocationId()
    {
        $id = 1;
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $response = $this->get('/api/asset/' . $id);
        $response->assertStatus(404)->assertJsonStructure([
            'message',
        ]);
    }

    public function testGetAssetByNotExistId()
    {
        $id = 11000;
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $response = $this->get('/api/asset/' . $id);
        $response->assertStatus(404)->assertJsonStructure([
            'message',
        ]);
    }

    //Create Asset -------------------------------------

    public function testCreateAssetSuccessfully()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $asset = [
            'asset_name' => 'Laptop 01',
            'location_id' => 1,
            'status_id' => 1,
            'category_id' => 1,
            'asset_specification' => 'test',
            'asset_installed_date' => '2022-12-22'
        ];
        $response = $this->post('/api/asset', $asset);
        $response->assertStatus(201)->assertJsonStructure([
            'data'
        ]);
    }

    public function testCreateAssetFailedDueToAssetNameRequired()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $asset = [
            'asset_name' => '',
            'location_id' => 1,
            'status_id' => 1,
            'category_id' => 1,
            'asset_specification' => 'test',
            'asset_installed_date' => '2022-12-22'
        ];
        $response = $this->post('/api/asset', $asset);
        $response->assertStatus(422)->assertJsonStructure([
            'Errors'
        ]);
    }



    public function testCreateAssetFailedDueToAssetSpecificationRequired()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $asset = [
            'asset_name' => 'Laptop 01',
            'location_id' => 1,
            'status_id' => 1,
            'category_id' => 1,
            'asset_specification' => '',
            'asset_installed_date' => '2022-12-22'
        ];
        $response = $this->post('/api/asset', $asset);
        $response->assertStatus(422)->assertJsonStructure([
            'Errors'
        ]);
    }

    public function testCreateAssetFailedDueToAssetInstalledDateRequired()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $asset = [
            'asset_name' => 'Laptop 01',
            'location_id' => 1,
            'status_id' => 1,
            'category_id' => 1,
            'asset_specification' => 'test',
            'asset_installed_date' => ''
        ];
        $response = $this->post('/api/asset', $asset);
        $response->assertStatus(422)->assertJsonStructure([
            'Errors'
        ]);
    }

    public function testCreateAssetFailedDueToStatusIdRequired()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $asset = [
            'asset_name' => 'Laptop 01',
            'location_id' => 1,
            'status_id' => '',
            'category_id' => 1,
            'asset_specification' => 'test',
            'asset_installed_date' => '2022-12-22'
        ];
        $response = $this->post('/api/asset', $asset);
        $response->assertStatus(422)->assertJsonStructure([
            'Errors'
        ]);
    }

    public function testCreateAssetFailedDueToAssetNameMaxLength()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $asset = [
            'asset_name' => 'Laptop ASUS sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss',
            'location_id' => 1,
            'status_id' => 1,
            'category_id' => 1,
            'asset_specification' => 'test',
            'asset_installed_date' => '2022-12-22'
        ];
        $response = $this->post('/api/asset', $asset);
        $response->assertStatus(422)->assertJsonStructure([
            'Errors'
        ]);
    }

    public function testCreateAssetFailedDueToAssetNameRegex()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $asset = [
            'asset_name' => 'Laptop ASUS @',
            'location_id' => 1,
            'status_id' => 1,
            'category_id' => 1,
            'asset_specification' => 'test',
            'asset_installed_date' => '2022-12-22'
        ];
        $response = $this->post('/api/asset', $asset);
        $response->assertStatus(422)->assertJsonStructure([
            'Errors'
        ]);
    }

    // Update Asset

    public function testUpdateAssetSuccessfully()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $update_asset = [
            'id' => 46,
            'asset_name' => 'Laptop 02 test',
            'location_id' => 1,
            'status' => 1,
            'category_id' => 1,
            'asset_specification' => 'test',
            'asset_installed_date' => '2022-12-22'
        ];
        $response = $this->patch('/api/asset', $update_asset);
        $response->assertStatus(200)->assertJsonStructure([
            'data'
        ]);
    }

    public function testUpdateAssetFailedDueToIdIsRequired()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $update_asset = [
            'id' => '',
            'asset_name' => 'Laptop 02 test',
            'location_id' => 1,
            'status' => 1,
            'category_id' => 1,
            'asset_specification' => 'test',
            'asset_installed_date' => '2022-12-22'
        ];
        $response = $this->patch('/api/asset', $update_asset);
        $response->assertStatus(422)->assertJsonStructure([
            'Errors'
        ]);
    }

    public function testUpdateAssetFailedDueToDifferentLocation()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $update_asset = [
            'id' => 1,
            'asset_name' => 'Laptop 02 test',
            'location_id' => 1,
            'status' => 1,
            'category_id' => 1,
            'asset_specification' => 'test',
            'asset_installed_date' => '2022-12-22'
        ];
        $response = $this->patch('/api/asset', $update_asset);
        $response->assertStatus(422)->assertJsonStructure([
            'Errors'
        ]);
    }

    public function testUpdateAssetFailedDueToStatusIsRequired()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $update_asset = [
            'id' => 46,
            'asset_name' => 'Laptop 02 test',
            'location_id' => 1,
            'status' => '',
            'category_id' => 1,
            'asset_specification' => 'test',
            'asset_installed_date' => '2022-12-22'
        ];
        $response = $this->patch('/api/asset', $update_asset);
        $response->assertStatus(422)->assertJsonStructure([
            'Errors'
        ]);
    }

    public function testUpdateAssetFailedDueToDoesNotExistAsset()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $update_asset = [
            'id' => 1000,
            'asset_name' => 'Laptop 02 test',
            'location_id' => 1,
            'status' => 1,
            'category_id' => 1,
            'asset_specification' => 'test',
            'asset_installed_date' => '2022-12-22'
        ];
        $response = $this->patch('/api/asset', $update_asset);
        $response->assertStatus(422)->assertJsonStructure([
            'Errors'
        ]);
    }
}
