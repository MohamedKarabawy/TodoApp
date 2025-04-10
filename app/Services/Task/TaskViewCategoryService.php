<?php

namespace App\Services\Task;

use App\Models\Category;
use App\Contracts\Task\TaskViewCategoryServiceInterface;
use Illuminate\Database\Eloquent\Collection;

class TaskViewCategoryService implements TaskViewCategoryServiceInterface
{
    public function getCategories(): Collection
    {
        return Category::select('id', 'category_name')->get();
    }
}