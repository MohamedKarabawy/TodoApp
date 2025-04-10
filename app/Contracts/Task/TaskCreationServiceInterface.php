<?php

namespace App\Contracts\Task;

interface TaskCreationServiceInterface
{
    public function createTask(array $validatedData);
}