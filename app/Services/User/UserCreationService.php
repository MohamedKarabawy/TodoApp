<?php

namespace App\Services\User;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Contracts\User\UserCreationServiceInterface;

class UserCreationService implements UserCreationServiceInterface
{
    public function createUser(array $validatedData): User
    {
        $validatedData['password'] = Hash::make($validatedData['password']);
        
        return User::create($validatedData);
    }
}