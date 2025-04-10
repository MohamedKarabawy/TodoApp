<?php

namespace App\Contracts\Task;

use App\Models\User;

interface TaskSoftDeleteServiceInterface
{
    public function deleteTask(int $taskId, User $user);
}