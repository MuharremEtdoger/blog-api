<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\AuthController;


Route::get('/posts', [PostController::class, 'index']);  
Route::get('/posts/{id}', [PostController::class, 'show']);  // Detay sayfası

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('posts', PostController::class)->except('index', 'show');
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
