<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;

// Public Routes
Route::post('login', [AuthController::class, 'login']);

Route::post('register', [UserController::class, 'register']);

// Protected Routes
Route::group(['middleware' => ['auth:sanctum']], function () {

    Route::put('user/update', [UserController::class, 'update']);

    Route::get('categories', [TaskController::class, 'categories']);

    Route::get('tasks', [TaskController::class, 'index']);

    Route::post('tasks/create', [TaskController::class, 'store']);

    Route::put('tasks/{taskId}/update', [TaskController::class, 'update']);

    Route::put('tasks/{taskId}/restore', [TaskController::class, 'restore']);

    Route::get('tasks/trashed', [TaskController::class, 'getTrashed']);

    Route::delete('tasks/{taskId}/delete', [TaskController::class, 'destroy']);

    Route::post('logout', [AuthController::class, 'logout']);

});