<?php

namespace App\Services\Auth;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Contracts\Auth\AuthServiceInterface;
use Illuminate\Auth\AuthenticationException;

class AuthService implements AuthServiceInterface
{
    public function authenticate(array $credentials): bool|User
    {
        $user = User::where('email', $credentials['email'])->first();

        if (!$user || !Hash::check($credentials['password'], $user->password)) 
        {
            return false;
        }

        return $user;
    }
}