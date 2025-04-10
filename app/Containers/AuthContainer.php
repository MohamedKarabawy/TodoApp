<?php

namespace App\Containers;

use App\Messages\AuthMessages;
use Illuminate\Http\JsonResponse;
use App\Contracts\Auth\AuthServiceInterface;
use App\Contracts\Auth\TokenServiceInterface;
use App\Contracts\Auth\LogoutServiceInterface;

class AuthContainer
{
    public function __construct(
        private AuthServiceInterface $authService,
        private TokenServiceInterface $tokenService,
        private LogoutServiceInterface $logoutService
    ) 
    {
        
    }

    public function login(array $credentials): JsonResponse
    {
        try 
        {
            $user = $this->authService->authenticate($credentials);
            
            if(!$user)
            {
                return response()->json([
                    'message' => AuthMessages::LOGIN_FAILED,
                ], 401);
            }

            $token = $this->tokenService->generateToken($user, $credentials['remember']);
    
            return response()->json([
                'message' => AuthMessages::LOGIN_SUCCESS,
                'user' => $user,
                'token' => $token,
            ], 200);
        } 
        catch (Exception $e) 
        {
            return response()->json([
                'message' => AuthMessages::UNEXPECTED,
                'error' => $e->getMessage()
            ], 500);
        }
    }    

    public function logout(): JsonResponse
    {
        try 
        {
            $this->logoutService->logout();

            return response()->json([
                'message' => AuthMessages::LOGOUT_SUCCESS,
            ], 200);
        } 
        catch (Exception $e)
        {
            return response()->json([
                'message' => AuthMessages::LOGOUT_FAILED,
                'error' => $e->getMessage()
            ], 500);
        }
    }
}