<?php

namespace App\Services\User;

use App\Models\User;
use App\Contracts\User\UserUpdateServiceInterface;
use Illuminate\Support\Facades\Hash;

class UserUpdateService implements UserUpdateServiceInterface
{
    public function updateUser(int $userId, array $validatedData): User|bool
    {
        $user = User::find($userId);

        if (!$user) 
        {
            return false;
        }

        if (!empty($validatedData['password']))
        {
            $validatedData['password'] = Hash::make($validatedData['password']);
        }

        $user->update($validatedData);

        return $user;
    }
}
