<?php

namespace App\Providers;

use App\Services\Auth\AuthService;
use App\Services\Auth\TokenService;
use App\Services\Auth\LogoutService;
use App\Services\Task\TaskViewService;
use App\Services\Task\TaskTrashService;
use Illuminate\Support\ServiceProvider;
use App\Services\Task\TaskFilterService;
use App\Services\Task\TaskUpdateService;
use App\Services\User\UserUpdateService;
use App\Services\Task\TaskRestoreService;
use App\Services\Task\TaskCreationService;
use App\Services\User\UserCreationService;
use App\Contracts\Auth\AuthServiceInterface;
use App\Services\Task\TaskSoftDeleteService;
use App\Contracts\Auth\TokenServiceInterface;
use App\Contracts\Auth\LogoutServiceInterface;
use App\Services\Task\TaskViewCategoryService;
use App\Contracts\Task\TaskViewServiceInterface;
use App\Contracts\Task\TaskTrashServiceInterface;
use App\Contracts\Task\TaskFilterServiceInterface;
use App\Contracts\Task\TaskUpdateServiceInterface;
use App\Contracts\User\UserUpdateServiceInterface;
use App\Contracts\Task\TaskRestoreServiceInterface;
use App\Contracts\Task\TaskCreationServiceInterface;
use App\Contracts\User\UserCreationServiceInterface;
use App\Contracts\Task\TaskSoftDeleteServiceInterface;
use App\Contracts\Task\TaskViewCategoryServiceInterface;

class AppServiceProvider extends ServiceProvider
{
    public function register()
    {
        // Binding Auth services
        $this->app->bind(AuthServiceInterface::class, AuthService::class);
        $this->app->bind(TokenServiceInterface::class, TokenService::class);
        $this->app->bind(LogoutServiceInterface::class, LogoutService::class);

        // Binding User services
        $this->app->bind(UserCreationServiceInterface::class, UserCreationService::class);
        $this->app->bind(UserUpdateServiceInterface::class, UserUpdateService::class);
        
        // Binding Task services
        $this->app->bind(TaskCreationServiceInterface::class, TaskCreationService::class);
        $this->app->bind(TaskUpdateServiceInterface::class, TaskUpdateService::class);
        $this->app->bind(TaskSoftDeleteServiceInterface::class, TaskSoftDeleteService::class);
        $this->app->bind(TaskRestoreServiceInterface::class, TaskRestoreService::class);
        $this->app->bind(TaskTrashServiceInterface::class, TaskTrashService::class);
        $this->app->bind(TaskViewServiceInterface::class, TaskViewService::class);
        $this->app->bind(TaskFilterServiceInterface::class, TaskFilterService::class);
        $this->app->bind(TaskViewCategoryServiceInterface::class, TaskViewCategoryService::class);
    }

    public function boot()
    {
        //
    }
}
