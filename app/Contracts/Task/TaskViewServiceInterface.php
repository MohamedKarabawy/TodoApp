<?php

namespace App\Contracts\Task;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder as QueryBuilder;

interface TaskViewServiceInterface
{
    public function getTasks(User $user, QueryBuilder $query);
}