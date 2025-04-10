<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TaskUpdateRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'category_id' =>'required|integer|exists:td_categories,id',
            'title' => 'required|string|regex:/^[a-zA-Z\s]+$/',
            'description' => 'required|string',
            'status' => 'required|string|in:Pending,In Progress,Completed',
        ];
    }

    public function messages(): array
    {
        return [
            'category_id.required' => 'Category ID is required.',
            'category_id.integer' => 'Category ID must be an integer.',
            'category_id.exists' => 'Invalid category ID.',
            'title.required' => 'Title is required.',
            'title.string' => 'Title must be a string.',
            'title.regex' => 'Title must only contain alphabetical characters and spaces.',
            'description.required' => 'Description is required.',
            'description.string' => 'Description must be a string.',
            'status.required' => 'Status is required.',
            'status.string' => 'Status must be a string.',
            'status.in' => 'Invalid status. Must be either "pending" or "completed".',
        ];
    }
}
