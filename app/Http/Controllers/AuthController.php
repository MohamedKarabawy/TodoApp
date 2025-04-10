<?php

namespace App\Http\Controllers;

use App\Containers\AuthContainer;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\AuthRequest;

class AuthController extends Controller
{
    public function __construct(protected AuthContainer $authContainer)
    {
        $this->authContainer = $authContainer;
    }

    public function login(AuthRequest $request): JsonResponse
    {
        $credentials = $request->only('email', 'password', 'remember');

        return $this->authContainer->login($credentials);
    }

    public function logout(): JsonResponse
    {
        return $this->authContainer->logout();
    }
}
