<?php

namespace App\Services\Task;

use App\Models\Task;
use App\Contracts\Task\TaskCreationServiceInterface;

class TaskCreationService implements TaskCreationServiceInterface
{
    public function createTask(array $validatedData): Task
    {        
        return Task::create($validatedData);
    }
}