<?php

namespace App\Messages;

class TaskMessages
{
    public const TASK_CREATED = 'Task created successfully.';
    public const TASK_UPDATED = 'Task updated successfully.';
    public const TASK_DELETED = 'Task moved to trash.';
    public const TASK_RESTORED = 'Task restored successfully.';
    public const TASK_NOT_FOUND = 'Task not found.';
    public const TASKS_EMPTY = 'Tasks is empty.';
    public const CATEGORY_EMPTY = 'Categories is empty.';
    public const TRASH_EMPTY = 'Trash is empty.';
    public const TASK_CREATION_ERROR = 'An error occurred while creating the task.';
    public const TASK_UPDATE_ERROR = 'An error occurred while updating the task.';
    public const TASK_DELETION_ERROR = 'An error occurred while deleting the task.';
    public const TASK_RESTORE_ERROR = 'An error occurred while restoring the task.';
    public const TASK_RETRIEVAL_ERROR = 'An error occurred while retrieving tasks.';
    public const CATEGORY_RETRIEVAL_ERROR = 'An error occurred while retrieving categories.';
    public const TASK_TRASH_RETRIEVAL_ERROR = 'An error occurred while retrieving trashed tasks.';
    public const TASKS_NO_RESULTS_FOR_FILTERS = 'No tasks found.'; 
}
