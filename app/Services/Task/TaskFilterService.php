<?php

namespace App\Services\Task;

use App\Models\Task;
use App\Contracts\Task\TaskFilterServiceInterface;
use Illuminate\Database\Eloquent\Builder as QueryBuilder;

class TaskFilterService implements TaskFilterServiceInterface
{
    public function taskFilter(array $filters = []): QueryBuilder
    {
        $query = Task::query();

        if (!empty($filters['search'])) 
        {
            $query->whereRaw('LOWER(title) LIKE ?', [strtolower($filters['search']) . '%']);
        }

        if (!empty($filters['category'])) 
        {
            $query->where('category_id', $filters['category']);
        }

        if (!empty($filters['status'])) 
        {
            $query->where('status', $filters['status']);
        }

        if (!empty($filters['start_date']) && !empty($filters['end_date'])) 
        {
            $query->whereBetween('created_at', [$filters['start_date'], $filters['end_date']]);
        }

        $sortDirection = in_array(strtolower($filters['sort'] ?? ''), ['asc', 'desc']) ? $filters['sort'] : 'desc';

        $query->orderBy('created_at', $sortDirection);

        return $query;
    }
}
