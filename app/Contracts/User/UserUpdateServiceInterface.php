<?php

namespace App\Contracts\User;

interface UserUpdateServiceInterface
{
    public function updateUser(int $userId, array $validatedData);
}