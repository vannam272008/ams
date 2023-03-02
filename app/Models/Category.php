<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Category extends Model
{
    use HasFactory;
    use Notifiable;
    use HasApiTokens;

    protected $fillable = [
        'category_name',
        'category_prefix',
    ];

    public $timestamps = false;
    protected $table = 'category';

    public function assets()
    {
        return $this->hasMany(Asset::class, 'category_id', 'id');
    }
}
