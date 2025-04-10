<?php

namespace App\Contracts\Auth;

interface AuthServiceInterface
{
    public function authenticate(array $credentials);
}