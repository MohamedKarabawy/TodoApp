<?php

namespace App\Containers;

use App\Contracts\User\UserCreationServiceInterface;
use App\Contracts\User\UserUpdateServiceInterface;
use App\Contracts\Auth\TokenServiceInterface;
use App\Messages\UserMessages;
use Illuminate\Http\JsonResponse;
use Exception;

class UserContainer
{
    private $current_user;

    public function __construct(
        private UserCreationServiceInterface $userCreationService,
        private UserUpdateServiceInterface $userUpdateService,
        private TokenServiceInterface $tokenService
    )
    {
        $this->current_user = auth()->user();
    }

    public function register(array $validatedData): JsonResponse
    {
        try
        {
            $user = $this->userCreationService->createUser($validatedData);
            $token = $this->tokenService->generateToken($user);

            return response()->json([
                'message' => UserMessages::USER_CREATED,
                'user' => $user,
                'token' => $token,
            ], 201);
        }
        catch (Exception $e)
        {
            return response()->json([
                'message' => UserMessages::USER_FAILED,
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(array $validatedData): JsonResponse
    {
        try
        {
            $user_id = $this->current_user->id;

            $user = $this->userUpdateService->updateUser($user_id, $validatedData);
    
            if (!$user) 
            {
                return response()->json([
                    'message' => UserMessages::NOT_FOUND
                ], 404);
            }
    
            return response()->json([
                'message' => UserMessages::USER_UPDATED,
                'user' => $user
            ], 200);
        } 
        catch (Exception $e) 
        {
            return response()->json([
                'message' => UserMessages::USER_FAILED,
                'error' => $e->getMessage()
            ], 500);
        }
    }    
}
