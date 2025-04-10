<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Notifications\Notification;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    // Table Name
    protected $table = 'td_users';
    // Primary Key
    public $primaryKey = 'id';
    // Timestamps
    public $timestamps = true;
  
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'id',
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
