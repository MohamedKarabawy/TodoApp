<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('index');
});

Route::get('/register', function () {
    return view('index');
});

Route::get('/tasks', function () {
    return view('index');
});

Route::get('/profile', function () {
    return view('index');
});