<?php

namespace App\Models;

use App\Models\Category;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Task extends Model
{
    use SoftDeletes;
    
    // Table Name
    protected $table = 'td_tasks';
    // Primary Key
    public $primaryKey = 'id';
    // Timestamps
    public $timestamps = true;

    protected $dates = ['deleted_at'];

    protected $fillable = [
        'category_id',
        'user_id',
        'title',
        'description',
        'status',
    ];

    protected $hidden = [
        'id',
        'user_id',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }
}
