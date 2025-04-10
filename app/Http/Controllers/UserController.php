<?php

namespace App\Http\Controllers;

use App\Containers\UserContainer;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\AuthRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Requests\UserRegisterRequest;

class UserController extends Controller
{
    public function __construct(protected UserContainer $userContainer)
    {
        $this->userContainer = $userContainer;
    }

    public function register(UserRegisterRequest $request): JsonResponse
    {
        $validatedData = $request->only('name', 'email', 'password');

        return $this->userContainer->register($validatedData);
    }

    public function update(UserUpdateRequest $request): JsonResponse
    {
        $validatedData = $request->only('name', 'email', 'password');

        return $this->userContainer->update($validatedData);
    }
}
