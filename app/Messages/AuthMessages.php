<?php

namespace App\Messages;

class AuthMessages
{
    public const LOGIN_SUCCESS = 'Login successful.';
    public const LOGIN_FAILED = 'Invalid credentials.';
    public const LOGOUT_FAILED = 'Logout failed.';
    public const LOGOUT_SUCCESS = 'Logout completed.';
    public const UNAUTHORIZED = 'Unauthorized access.';
    public const UNEXPECTED = 'An unexpected error occurred.';
}