<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use App\Models\User;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AssignmentControllerTest extends TestCase
{
    use DatabaseMigrations;

    public function setUp(): void
    {
        parent::setUp();
        $this->artisan('db:seed');
    }

    public function testGetAssignmentById()
    {
        $id = 1;
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD2001',
            'user_name' => 'quy',
            'password' => Hash::make('password')
        ]));
        $response = $this->get('/api/assignment/' . $id);
        $response->assertStatus(200)->assertJsonStructure([
            'data',
        ]);
    }

    public function testGetAssignmentByNotExistId()
    {
        $id = 11000;
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD2001',
            'user_name' => 'quy',
            'password' => Hash::make('password')
        ]));
        $response = $this->get('/api/assignment/' . $id);
        $response->assertStatus(404)->assertJsonStructure([
            'message',
        ]);
    }

    //Create Assignment

    public function testCreateAssignmentSuccessfully()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $assignment_date_assigned = Carbon::now('Asia/Ho_Chi_Minh')->format('Y-m-d');
        $assignment = [
            'status_id' => 1,
            'asset_id' => 46,
            'assignment_to' => 3,
            'assignment_date_assigned' => $assignment_date_assigned,
            'assignment_note' => ''
        ];
        $response = $this->post('/api/assignment', $assignment);
        $response->assertStatus(200)->assertJsonStructure([]);
    }

    public function testCreateAssignmentFailedDueToAssetIdRequired()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $assignment_date_assigned = Carbon::now('Asia/Ho_Chi_Minh')->format('Y-m-d');
        $assignment = [
            'status_id' => 1,
            'asset_id' => '',
            'assignment_to' => 3,
            'assignment_date_assigned' => $assignment_date_assigned,
            'assignment_note' => ''
        ];
        $response = $this->post('/api/assignment', $assignment);
        $response->assertStatus(422)->assertJsonStructure([
            'error'
        ]);
    }

    public function testCreateAssignmentFailedDueToAssignmentToRequired()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $assignment_date_assigned = Carbon::now('Asia/Ho_Chi_Minh')->format('Y-m-d');
        $assignment = [
            'status_id' => 1,
            'asset_id' => 46,
            'assignment_to' => '',
            'assignment_date_assigned' => $assignment_date_assigned,
            'assignment_note' => ''
        ];
        $response = $this->post('/api/assignment', $assignment);
        $response->assertStatus(422)->assertJsonStructure([
            'error'
        ]);
    }

    public function testCreateAssignmentFailedDueToAssignmentDateAssignedRequired()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $assignment = [
            'status_id' => 1,
            'asset_id' => 46,
            'assignment_to' => 3,
            'assignment_date_assigned' => '',
            'assignment_note' => ''
        ];
        $response = $this->post('/api/assignment', $assignment);
        $response->assertStatus(422)->assertJsonStructure([
            'error'
        ]);
    }

    public function testCreateAssignmentFailedDueToWrongLocation()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $assignment_date_assigned = Carbon::now('Asia/Ho_Chi_Minh')->format('Y-m-d');
        $assignment = [
            'status_id' => 1,
            'asset_id' => 46,
            'assignment_to' => 1,
            'assignment_date_assigned' => $assignment_date_assigned,
            'assignment_note' => ''
        ];
        $response = $this->post('/api/assignment', $assignment);
        $response->assertStatus(422)->assertJsonStructure([
            'error'
        ]);
    }

    public function testCreateAssignmentFailedDueToExistAssetInAssignment()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $assignment_date_assigned = Carbon::now('Asia/Ho_Chi_Minh')->format('Y-m-d');
        $assignment = [
            'status_id' => 1,
            'asset_id' => 1,
            'assignment_to' => 3,
            'assignment_date_assigned' => $assignment_date_assigned,
            'assignment_note' => ''
        ];
        $response = $this->post('/api/assignment', $assignment);
        $response->assertStatus(422)->assertJsonStructure([
            'error'
        ]);
    }

    public function testCreateAssignmentFailedDueToDoesNotExistAsset()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $assignment_date_assigned = Carbon::now('Asia/Ho_Chi_Minh')->format('Y-m-d');
        $assignment = [
            'status_id' => 1,
            'asset_id' => 100,
            'assignment_to' => 3,
            'assignment_date_assigned' => $assignment_date_assigned,
            'assignment_note' => ''
        ];
        $response = $this->post('/api/assignment', $assignment);
        $response->assertStatus(422)->assertJsonStructure([
            'error'
        ]);
    }

    public function testCreateAssignmentFailedDueToDoesNotExistUser()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $assignment_date_assigned = Carbon::now('Asia/Ho_Chi_Minh')->format('Y-m-d');
        $assignment = [
            'status_id' => 1,
            'asset_id' => 46,
            'assignment_to' => 300,
            'assignment_date_assigned' => $assignment_date_assigned,
            'assignment_note' => ''
        ];
        $response = $this->post('/api/assignment', $assignment);
        $response->assertStatus(422)->assertJsonStructure([
            'error'
        ]);
    }

    public function testCreateAssignmentFailedDueToAssignmentDateAssignedShouldBeCurrentOrLater()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $assignment = [
            'status_id' => 1,
            'asset_id' => 46,
            'assignment_to' => 3,
            'assignment_date_assigned' => '2021-12-12',
            'assignment_note' => ''
        ];
        $response = $this->post('/api/assignment', $assignment);
        $response->assertStatus(422)->assertJsonStructure([
            'error'
        ]);
    }

    public function testCreateAssignmentFailedDueToNoteMaxLength()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $assignment_date_assigned = Carbon::now('Asia/Ho_Chi_Minh')->format('Y-m-d');
        $assignment = [
            'status_id' => 1,
            'asset_id' => 46,
            'assignment_to' => 3,
            'assignment_date_assigned' => $assignment_date_assigned,
            'assignment_note' => 'Apart from counting words and characters, our online editor can help you to improve word choice and writing style, and, optionally
            , help you to detect grammar mistakes and plagiarism. To check word count, simply place your cursor into the text box above and'
        ];
        $response = $this->post('/api/assignment', $assignment);
        $response->assertStatus(422)->assertJsonStructure([
            'error'
        ]);
    }

    //Get Asset --------------------------
    public function testGetAssignmentListWithoutApplyingSortFilterSearch()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $response = $this->get('/api/assignment');
        $response->assertStatus(200)->assertJsonStructure([
            'data',
            'links',
            'meta'
        ]);
    }

    public function testGetAssignmentListApplyingSortWitSortField()
    {
        $this->withoutExceptionHandling();
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $response = $this->get('/api/assignment?sort=asset_name');
        $response->assertStatus(200)->assertJsonStructure([
            'data',
            'links',
            'meta'
        ]);
    }

    public function testGetAssignmentListApplyingSortWithDefaultSortFieldAndDefaultSortType()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $response = $this->get('/api/assignment?sort=&sorttype=');
        $response->assertStatus(200)->assertJsonStructure([
            'data',
            'links',
            'meta'
        ]);
    }

    public function testGetAssignmentListApplyingSortWithSortFieldAndSortType()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $response = $this->get('/api/assignment?sort=asset_name&sorttype=1');
        $response->assertStatus(200)->assertJsonStructure([
            'data',
            'links',
            'meta'
        ]);
    }

    public function testGetAssignmentListApplyingStatusFilterWithStatusId()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $response = $this->get('/api/assignment?status_id=1');
        $response->assertStatus(200)->assertJsonStructure([
            'data',
            'links',
            'meta'
        ]);
    }

    public function testGetAssignmentListApplyingStatusFilterWithAllStatusId()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $response = $this->get('/api/assignment?status_id=all');
        $response->assertStatus(200)->assertJsonStructure([
            'data',
            'links',
            'meta'
        ]);
    }

    public function testGetAssignmentListApplyingAssignedDate()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $response = $this->get('/api/assignment?assigned_date=2022-11-28');
        $response->assertStatus(200)->assertJsonStructure([
            'data',
            'links',
            'meta'
        ]);
    }

    public function testGetAssignmentListApplyingSearchByAssetCode()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $response = $this->get('/api/assignment?search=001');
        $response->assertStatus(200)->assertJsonStructure([
            'data',
            'links',
            'meta'
        ]);
    }

    public function testGetAssignmentListApplyingSearchByAssetName()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $response = $this->get('/api/assignment?search=laptop');
        $response->assertStatus(200)->assertJsonStructure([
            'data',
            'links',
            'meta'
        ]);
    }

    public function testGetAssignmentListApplyingSearchWithoutInput()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $response = $this->get('/api/assignment?search=');
        $response->assertStatus(200)->assertJsonStructure([
            'data',
            'links',
            'meta'
        ]);
    }

    public function testGetAssignmentListApplyingSortFilterSearch()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $response = $this->get('/api/assignment?sort=asset_code&status_id=2&search=&perpage=10');
        $response->assertStatus(200)->assertJsonStructure([
            'data',
            'links',
            'meta'
        ]);
    }

    //Update assignment

    public function testUpdateAssignmentSuccessfully()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $assignment_date_assigned = Carbon::now('Asia/Ho_Chi_Minh')->format('Y-m-d');
        $assignment = [
            'id' => 2,
            'status_id' => 1,
            'asset_id' => 46,
            'assignment_to' => 3,
            'assignment_date_assigned' => $assignment_date_assigned,
            'assignment_note' => ''
        ];
        $response = $this->patch('/api/update-assignment', $assignment);
        $response->assertStatus(200)->assertJsonStructure([]);
    }

    public function testUpdateAssignmentAssetIdDoesNotExist()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $assignment_date_assigned = Carbon::now('Asia/Ho_Chi_Minh')->format('Y-m-d');
        $assignment = [
            'id' => 2,
            'status_id' => 1,
            'asset_id' => 100,
            'assignment_to' => 3,
            'assignment_date_assigned' => $assignment_date_assigned,
            'assignment_note' => ''
        ];
        $response = $this->patch('/api/update-assignment', $assignment);
        $response->assertStatus(422)->assertJsonStructure([
            'error'
        ]);
    }

    public function testUpdateAssignmentAssignmentToRequired()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $assignment_date_assigned = Carbon::now('Asia/Ho_Chi_Minh')->format('Y-m-d');
        $assignment = [
            'id' => 2,
            'status_id' => 1,
            'asset_id' => 46,
            'assignment_date_assigned' => $assignment_date_assigned,
            'assignment_note' => ''
        ];
        $response = $this->patch('/api/update-assignment', $assignment);
        $response->assertStatus(422)->assertJsonStructure([
            'error'
        ]);
    }

    public function testUpdateAssignmentAssignmentDateAssignedRequired()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $assignment_date_assigned = Carbon::now('Asia/Ho_Chi_Minh')->format('Y-m-d');
        $assignment = [
            'id' => 2,
            'status_id' => 1,
            'asset_id' => 46,
            'assignment_to' => 3,
            'assignment_note' => ''
        ];
        $response = $this->patch('/api/update-assignment', $assignment);
        $response->assertStatus(422)->assertJsonStructure([
            'error'
        ]);
    }

    public function testUpdateAssignmentAssignmentToDoesNotExist()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $assignment_date_assigned = Carbon::now('Asia/Ho_Chi_Minh')->format('Y-m-d');
        $assignment = [
            'id' => 2,
            'status_id' => 1,
            'asset_id' => 46,
            'assignment_to' => 100,
            'assignment_date_assigned' => $assignment_date_assigned,
            'assignment_note' => ''
        ];
        $response = $this->patch('/api/update-assignment', $assignment);
        $response->assertStatus(422)->assertJsonStructure([
            'error'
        ]);
    }

    public function testUpdateAssignmentAssignmentNoteMaxLength()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $assignment_date_assigned = Carbon::now('Asia/Ho_Chi_Minh')->format('Y-m-d');
        $assignment = [
            'id' => 2,
            'status_id' => 1,
            'asset_id' => 46,
            'assignment_to' => 3,
            'assignment_date_assigned' => $assignment_date_assigned,
            'assignment_note' => 'Apart from counting words and characters,
             our online editor can help you to improve word choice and writing style, and, optionally,
              help you to detect grammar mistakes and plagiarism. To check word count, simply place your cursor into the text box above and'
        ];
        $response = $this->patch('/api/update-assignment', $assignment);
        $response->assertStatus(422)->assertJsonStructure([
            'error'
        ]);
    }

    public function testUpdateAssignmentAssetIdRequired()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $assignment_date_assigned = Carbon::now('Asia/Ho_Chi_Minh')->format('Y-m-d');
        $assignment = [
            'id' => 2,
            'status_id' => 1,
            'assignment_to' => 3,
            'assignment_date_assigned' => $assignment_date_assigned,
            'assignment_note' => ''
        ];
        $response = $this->patch('/api/update-assignment', $assignment);
        $response->assertStatus(422)->assertJsonStructure([
            'error'
        ]);
    }

    public function testUpdateAssignmentAssetDifferentLocationWithAdmin()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $assignment_date_assigned = Carbon::now('Asia/Ho_Chi_Minh')->format('Y-m-d');
        $assignment = [
            'id' => 2,
            'status_id' => 1,
            'asset_id' => 1,
            'assignment_to' => 3,
            'assignment_date_assigned' => $assignment_date_assigned,
            'assignment_note' => ''
        ];
        $response = $this->patch('/api/update-assignment', $assignment);
        $response->assertStatus(422)->assertJsonStructure([
            'error'
        ]);
    }

    public function testUpdateAssignmentLocationOfAssignmentToDifferentLocationWithAdmin()
    {
        Sanctum::actingAs(User::factory()->create([
            'location_id' => 3,
            'staff_code' => 'SD200001',
            'user_name' => 'phan',
            'password' => Hash::make('password')
        ]));
        $assignment_date_assigned = Carbon::now('Asia/Ho_Chi_Minh')->format('Y-m-d');
        $assignment = [
            'id' => 2,
            'status_id' => 1,
            'asset_id' => 46,
            'assignment_to' => 1,
            'assignment_date_assigned' => $assignment_date_assigned,
            'assignment_note' => ''
        ];
        $response = $this->patch('/api/update-assignment', $assignment);
        $response->assertStatus(422)->assertJsonStructure([
            'error'
        ]);
    }
}
