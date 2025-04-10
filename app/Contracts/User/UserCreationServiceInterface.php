<?php

namespace App\Contracts\User;

interface UserCreationServiceInterface
{
    public function createUser(array $validatedData);
}