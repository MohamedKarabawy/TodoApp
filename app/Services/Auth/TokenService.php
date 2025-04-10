<?php

namespace App\Services\Auth;

use Carbon\Carbon;
use App\Models\User;
use App\Contracts\Auth\TokenServiceInterface;

class TokenService implements TokenServiceInterface
{
    public function generateToken(User $user, bool $remember = false): string
    {
        $token_duration = Carbon::now()->addHours(6);

        if ($remember) 
        {
            $token_duration = Carbon::now()->addDays(7);
            
            return $user->createToken($user->name.'_'.Carbon::now(),['*'], $token_duration)->plainTextToken;
        }

        return $user->createToken($user->name.'_'.Carbon::now(),['*'], $token_duration)->plainTextToken;
    }
}