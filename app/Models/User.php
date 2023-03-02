<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Location;

class User extends Authenticatable
{
    use HasFactory;
    use Notifiable;
    use SoftDeletes;
    use HasApiTokens;

    public $timestamps = false;
    protected $table = 'user';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'location_id',
        'first_name',
        'last_name',
        'date_of_birth',
        'joined_date',
        'gender',
        'admin',
        'staff_code',
        'user_name',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * The attributes that used to be apply sort, filter, search.
     *
     * @var array
     */
    public $fields = [
        'sort',
        'search',
        'type',
    ];

    /**
     * The attribute that are default sort field.
     *
     * @var string
     */
    public $defaultSortValue = 'full_name';

    /**
     * The attribute that are second sort field.
     *
     * @var string
     */
    public $secondSortValue = 'user.id';

    /**
     * The attributes that are first sort fields.
     *
     * @var array
     */
    public $sortValues = [
        'staff_code',
        'full_name',
        'user_name',
        'joined_date',
        'admin'
    ];

    /**
     * The attributes that are search fields.
     *
     * @var array
     */
    public $searchFields = [
        'staff_code',
        'full_name'
    ];

    /**
     * The attributes that are raw attributes.
     *
     * @var object
     */
    public $extraFields = ['full_name', 'type'];

    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    public static function getUserName($id)
    {
        return User::find($id)->username;
    }
    public static function getAssingment($id)
    {
        if (Assignment::where('assignment_to', $id)->where('status_id', '!=', 3)->count() == 0) {
            return false;
        }
        return true;
    }
}
