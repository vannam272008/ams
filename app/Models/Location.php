<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'location';

    public function users()
    {
        return $this->hasMany(User::class, 'location_id', 'id');
    }
}
