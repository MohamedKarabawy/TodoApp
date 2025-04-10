<?php

namespace App\Http\Controllers;

use App\Containers\TaskContainer;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\TaskUpdateRequest;
use App\Http\Requests\TaskCreationRequest;
use App\Http\Requests\TaskFilterRequest;

class TaskController extends Controller
{
    public function __construct(protected TaskContainer $taskContainer)
    {
        $this->taskContainer = $taskContainer;
    }

    public function index(TaskFilterRequest $request): JsonResponse
    {
        $filters = $request->only(['search', 'category', 'status', 'sort', 'start_date', 'end_date']);

        return $this->taskContainer->getTasks($filters);
    }

    public function categories(): JsonResponse
    {
        return $this->taskContainer->getCategories();
    }

    public function store(TaskCreationRequest $request): JsonResponse
    {
        $validatedData = $request->only('category_id', 'title', 'description');

        return $this->taskContainer->createTask($validatedData);
    }

    public function update(int $taskId, TaskUpdateRequest $request): JsonResponse
    {
        $validatedData = $request->only('category_id', 'title', 'description', 'status');

        return $this->taskContainer->updateTask($taskId, $validatedData);
    }

    public function restore(int $taskId): JsonResponse
    {
        return $this->taskContainer->restoreTask($taskId);
    }

    public function getTrashed(TaskFilterRequest $request): JsonResponse
    {
        $filters = $request->only(['search', 'category', 'status', 'sort', 'start_date', 'end_date']);

        return $this->taskContainer->getTrashedTasks($filters);
    }

    public function destroy(int $taskId): JsonResponse
    {
        return $this->taskContainer->deleteTask($taskId);
    }
}
