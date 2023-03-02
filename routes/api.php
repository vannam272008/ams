<?php

use App\Http\Controllers\AssetController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AssignmentController;
use App\Http\Controllers\RequestController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\StatusController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->group(function () {
    Route::apiResource('/location', LocationController::class)->only(['index']);
    Route::apiResource('/category', CategoryController::class);
    Route::apiResource('/asset', AssetController::class);
    Route::post('/assignment/response', [AssignmentController::class, 'responseAssignment']);
    Route::get('/assignment/user', [AssignmentController::class, 'getAssignmentByUser']);
    Route::apiResource('/assignment', AssignmentController::class);
    Route::apiResource('/request-for-returning', RequestController::class);
    Route::patch('/request-for-returning', [RequestController::class, 'update']);
    Route::delete('/request-for-returning', [RequestController::class, 'destroy']);
    Route::patch('/update-assignment', [AssignmentController::class, 'updateAssignment']);

    Route::get('/assignments-by-asset-id', [AssignmentController::class, 'getAssignmentsByAssetId']);
    Route::get('/assignment-status', [StatusController::class, 'getAllAssignmentStatus']);
    Route::delete('/assignment/delete', [AssignmentController::class,'destroy']);
    Route::get('/asset-status', [StatusController::class, 'getAllAssetStatus']);
    Route::get('/category-by-id', [CategoryController::class, 'getAllCategoriesById']);
    Route::get('/asset-check-has-assignment', [AssetController::class, 'checkAssetHasAssignment']);
    Route::get('/asset-by-id', [AssetController::class, 'getDetailAsset']);
    Route::delete('/asset/delete', [AssetController::class,'destroy']);
    Route::patch('/asset', [AssetController::class, 'update']);
    Route::delete('/session', [SessionController::class, 'destroy']);

    Route::prefix('user')->group(function () {
        Route::patch('/change-password', [UserController::class, 'changePassword']);
        Route::patch('/change-password-first', [UserController::class, 'changePasswordFirst']);
    });

    Route::apiResource('/user', UserController::class);
    Route::delete('/user/delete', [UserController::class, 'destroy']);
});

Route::post('/session', [SessionController::class, 'store']);
