<?php

namespace App\Contracts\Task;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder as QueryBuilder;

interface TaskTrashServiceInterface
{
    public function getTrashedTasks(User $user, QueryBuilder $query);
}