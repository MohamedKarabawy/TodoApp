<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UserUpdateRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|regex:/^[a-zA-Z\s]+$/',
            'email' => ['required','email', Rule::unique('td_users', 'email')->ignore(auth()->user()->id)],
            'password' => 'nullable|string|min:8|regex:/[A-Z]/|regex:/[a-z]/|regex:/[0-9]/|confirmed', 
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Name is required.',
            'name.regex' => 'Name should only contain alphabetic characters and spaces.',
            'email.required' => 'Email is required.',
            'email.email' => 'Invalid email format.',
            'email.unique' => 'The email has already been taken.',
            'password.min' => 'Password must be at least 8 characters.',
            'password.regex' => 'Password must contain at least one uppercase letter, one lowercase letter, and one number.',
            'password.confirmed' => 'The password confirmation does not match.', //password_confirmation
        ];
    }
}
