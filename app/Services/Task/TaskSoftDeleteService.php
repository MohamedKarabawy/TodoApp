<?php

namespace App\Services\Task;

use App\Models\Task;
use App\Models\User;
use App\Contracts\Task\TaskSoftDeleteServiceInterface;

class TaskSoftDeleteService implements TaskSoftDeleteServiceInterface
{
    public function deleteTask(int $taskId, User $user): bool
    {
        $task = Task::where('user_id', $user->id)->where('id', $taskId)->first();
        
        if (!$task) 
        {
            return false;
        }

        $task->delete();

        return true;
    }
}
