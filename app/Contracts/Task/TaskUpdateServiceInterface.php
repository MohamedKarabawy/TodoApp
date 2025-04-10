<?php

namespace App\Contracts\Task;

use App\Models\User;

interface TaskUpdateServiceInterface
{
    public function updateTask(int $taskId, User $user, array $validatedData);
}