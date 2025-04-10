<?php

namespace App\Services\Task;

use App\Models\Task;
use App\Models\User;
use App\Contracts\Task\TaskUpdateServiceInterface;

class TaskUpdateService implements TaskUpdateServiceInterface
{
    public function updateTask(int $taskId, User $user, array $validatedData): Task|bool
    {
        $task = Task::where('user_id', $user->id)->where('id', $taskId)->first();

        if (!$task) 
        {
            return false;
        }

        $task->update($validatedData);

        return $task;
    }
}
