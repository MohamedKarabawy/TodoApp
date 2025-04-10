<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TaskCreationRequest extends FormRequest
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
        ];
    }

    public function messages(): array
    {
        return [
            'category_id.required' => 'The category field is required.',
            'category_id.integer' => 'The category field must be an integer.',
            'category_id.exists' => 'The selected category does not exist.',
            'title.required' => 'The title field is required.',
            'title.string' => 'The title field must be a string.',
            'title.regex' => 'The title field must only contain alphabetic characters and spaces.',
            'description.required' => 'The description field is required.',
            'description.string' => 'The description field must be a string.',
        ];
    }
}
