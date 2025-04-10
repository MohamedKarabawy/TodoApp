<?php

namespace App\Services\Task;

use App\Models\User;
use Illuminate\Pagination\LengthAwarePaginator;
use App\Contracts\Task\TaskTrashServiceInterface;
use Illuminate\Database\Eloquent\Builder as QueryBuilder;

class TaskTrashService implements TaskTrashServiceInterface
{
    public function getTrashedTasks(User $user, QueryBuilder $query): LengthAwarePaginator
    {
        $tasks = $query->where('user_id', $user->id)->onlyTrashed()->with('category')->paginate(5);

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
