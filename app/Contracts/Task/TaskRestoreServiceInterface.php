<?php

namespace App\Contracts\Task;

use App\Models\User;

interface TaskRestoreServiceInterface
{
    public function restoreTask(int $taskId, User $user);
}