<?php

namespace App\Services\Task;

use App\Models\Task;
use App\Models\User;
use App\Contracts\Task\TaskRestoreServiceInterface;

class TaskRestoreService implements TaskRestoreServiceInterface
{
    public function restoreTask(int $taskId, User $user): Task|bool
    {
        $task = Task::onlyTrashed()->where('user_id', $user->id)->where('id', $taskId)->first();

        if (!$task) 
        {
            return false;
        }

        $task->restore();

        return $task;
    }
}