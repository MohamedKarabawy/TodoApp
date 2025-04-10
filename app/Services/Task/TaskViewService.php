<?php

namespace App\Services\Task;

use App\Models\User;
use App\Contracts\Task\TaskViewServiceInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder as QueryBuilder;

class TaskViewService implements TaskViewServiceInterface
{
    public function getTasks(User $user, QueryBuilder $query): LengthAwarePaginator
    {
        $tasks = $query->where('user_id', $user->id)->whereNull('deleted_at')->with('category')->paginate(5);

        $tasks->getCollection()->transform(function ($task) {
            return [
                'id' => $task->id, 
                'title' => $task->title, 
                'description' => $task->description, 
                'category_name' => $task->category->category_name, 
                'category_id' => $task->category->id,
                'status' => $task->status,
            ];
        });

        return $tasks;
    }
}