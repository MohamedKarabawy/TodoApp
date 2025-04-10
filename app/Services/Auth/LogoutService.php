<?php

namespace App\Services\Auth;

use App\Contracts\Auth\LogoutServiceInterface;

class LogoutService implements LogoutServiceInterface
{
    public function logout(): void
    {
        auth()->user()->tokens()->delete();
    }
}