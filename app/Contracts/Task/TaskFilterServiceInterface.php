<?php

namespace App\Contracts\Task;

interface TaskFilterServiceInterface
{
    public function taskFilter(array $filters = []);
}