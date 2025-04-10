<?php

namespace App\Containers;

use Exception;
use App\Messages\TaskMessages;
use Illuminate\Http\JsonResponse;
use App\Contracts\Task\TaskViewServiceInterface;
use App\Contracts\Task\TaskTrashServiceInterface;
use App\Contracts\Task\TaskFilterServiceInterface;
use App\Contracts\Task\TaskUpdateServiceInterface;
use App\Contracts\Task\TaskRestoreServiceInterface;
use App\Contracts\Task\TaskCreationServiceInterface;
use App\Contracts\Task\TaskSoftDeleteServiceInterface;
use App\Contracts\Task\TaskViewCategoryServiceInterface;

class TaskContainer
{
    private $current_user;

    public function __construct(
        private TaskCreationServiceInterface $taskCreationService,
        private TaskUpdateServiceInterface $taskUpdateService,
        private TaskSoftDeleteServiceInterface $taskSoftDeleteService,
        private TaskRestoreServiceInterface $taskRestoreService,
        private TaskTrashServiceInterface $taskTrashService,
        private TaskViewServiceInterface $taskViewService,
        private TaskFilterServiceInterface $taskFilterService,
        private TaskViewCategoryServiceInterface $taskViewCategoryService
    )
    {
        $this->current_user = auth()->user();
    }

    
    public function getCategories(): JsonResponse
    {
        try 
        {
            $categories = $this->taskViewCategoryService->getCategories();
            
            if ($categories->isEmpty()) 
            {
                return response()->json(['message' => TaskMessages::CATEGORY_EMPTY], 200);
            }
    
            return response()->json($categories, 200);
        } 
        catch (Exception $e) 
        {
            return response()->json([
                'message' => TaskMessages::CATEGORY_RETRIEVAL_ERROR,
                'error' => $e->getMessage()
            ], 500);
        }
    }    

    public function getTasks(array $filters = []): JsonResponse
    {
        try 
        {
            $query = $this->taskFilterService->taskFilter($filters);

            $tasks = $this->taskViewService->getTasks($this->current_user, $query);
    
            if ($tasks->isEmpty() && count($filters) > 0) 
            {
                return response()->json(['message' => TaskMessages::TASKS_NO_RESULTS_FOR_FILTERS], 200);
            }
            
            if ($tasks->isEmpty()) 
            {
                return response()->json(['message' => TaskMessages::TASKS_EMPTY], 200);
            }
    
            return response()->json($tasks, 200);
        } 
        catch (Exception $e) 
        {
            return response()->json([
                'message' => TaskMessages::TASK_RETRIEVAL_ERROR,
                'error' => $e->getMessage()
            ], 500);
        }
    }    

    public function createTask(array $validatedData): JsonResponse
    {
        try
        {
            $validatedData['user_id'] = $this->current_user->id;
            $validatedData['status'] = 'pending';

            $task = $this->taskCreationService->createTask($validatedData);

            return response()->json([
                'message' => TaskMessages::TASK_CREATED,
                'task' => $task,
            ], 201);
        } 
        catch (Exception $e) 
        {
            return response()->json([
                'message' => TaskMessages::TASK_CREATION_ERROR,
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function updateTask(int $taskId, array $validatedData): JsonResponse
    {
        try 
        {
            $task = $this->taskUpdateService->updateTask($taskId, $this->current_user, $validatedData);

            if (!$task) 
            {
                return response()->json([
                    'message' => TaskMessages::TASK_NOT_FOUND
                ], 404);
            }

            return response()->json([
                'message' => TaskMessages::TASK_UPDATED,
                'task' => $task
            ], 200);
        } 
        catch (Exception $e) 
        {
            return response()->json([
                'message' => TaskMessages::TASK_UPDATE_ERROR,
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getTrashedTasks(array $filters = []): JsonResponse
    {
        try 
        {
            $query = $this->taskFilterService->taskFilter($filters);

            $tasks = $this->taskTrashService->getTrashedTasks($this->current_user, $query);

            if ($tasks->isEmpty() && count($filters) > 0) 
            {
                return response()->json(['message' => TaskMessages::TASKS_NO_RESULTS_FOR_FILTERS], 200);
            }

            if ($tasks->isEmpty()) 
            {
                return response()->json(['message' => TaskMessages::TRASH_EMPTY], 200);
            }

            return response()->json($tasks, 200);
        } 
        catch (Exception $e) 
        {
            return response()->json([
                'message' => TaskMessages::TASK_TRASH_RETRIEVAL_ERROR,
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function deleteTask(int $taskId): JsonResponse
    {
        try 
        {
            $task = $this->taskSoftDeleteService->deleteTask($taskId, $this->current_user);

            if (!$task) 
            {
                return response()->json([
                    'message' => TaskMessages::TASK_NOT_FOUND
                ], 404);
            }

            return response()->json([
                'message' => TaskMessages::TASK_DELETED,
            ], 200);
        } 
        catch (Exception $e) 
        {
            return response()->json([
                'message' => TaskMessages::TASK_DELETION_ERROR,
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function restoreTask(int $taskId): JsonResponse
    {
        try 
        {
            $task = $this->taskRestoreService->restoreTask($taskId, $this->current_user);

            if (!$task) 
            {
                return response()->json([
                    'message' => TaskMessages::TASK_NOT_FOUND
                ], 404);
            }

            return response()->json([
                'message' => TaskMessages::TASK_RESTORED,
                'task' => $task
            ], 200);
        } 
        catch (Exception $e) 
        {
            return response()->json([
                'message' => TaskMessages::TASK_RESTORE_ERROR,
                'error' => $e->getMessage()
            ], 500);
        }
    }
}