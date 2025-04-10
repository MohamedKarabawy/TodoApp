<?php

namespace App\Contracts\Auth;

use App\Models\User;

interface TokenServiceInterface
{
    public function generateToken(User $user, bool $remember = false);
}