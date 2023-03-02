<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class Assignment extends Model
{
    use HasFactory;
    use SoftDeletes;

    public $timestamps = false;
    public static $assignmentStatusAccepted = 1;
    public static $assignmentStatusWaiting = 2;
    public static $assignmentStatusDeclined = 3;

    protected $table = 'assignment';
    protected $fillable = [
        'status_id',
        'asset_id',
        'assignment_to',
        'assignment_by',
        'assignment_date_assigned',
        'assignment_note',
    ];

    /**
     * The attributes that used to be apply sort, filter, search.
     *
     * @var array
     */
    public $fields = [
        'sort',
        'search',
        'state',
        'assigned_date'
    ];

    /**
     * The attribute that are default sort field.
     *
     * @var string
     */
    public $defaultSortValue = 'asset_name';

    /**
     * The attribute that are second sort field.
     *
     * @var string
     */
    public $secondSortValue = 'assignment.id';

    /**
     * The attributes that are first sort fields.
     *
     * @var array
     */
    public $sortValues = [
        'id',
        'asset_code',
        'asset_name',
        'assigned_to',
        'assigned_by',
        'assigned_date',
        'state'
    ];

    /**
     * The attributes that are search fields.
     *
     * @var array
     */
    public $searchFields = [
        'assignment_to.user_name',
        'assignment_by.user_name',
        'asset.asset_name',
        'asset.asset_code'
    ];

    /**
     * The attributes that are extra attributes.
     *
     * @var object
     */
    public $extraFields = [
        'id',
        'asset_code',
        'asset_name',
        'assigned_to',
        'assigned_by',
        'assigned_date',
        'state'
    ];

    public function asset()
    {
        return $this->belongsTo(Asset::class, 'asset_id', 'id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function status()
    {
        return $this->belongsTo(AssignmentStatus::class);
    }

    public function request()
    {
        return $this->belongsTo(RequestForReturning::class);
    }

    /**
     * Scope a query to show all assignments.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeGetAllDetails($query, $location_id)
    {
        return $query->select('assignment.*')
            ->join('user as assignment_to', 'assignment_to.id', '=', 'assignment.assignment_to')
            ->join('user as assignment_by', 'assignment_by.id', '=', 'assignment.assignment_by')
            ->join('asset', 'assignment.asset_id', '=', 'asset.id')
            ->where('assignment_to.location_id', $location_id)
            ->SelectRaw('
                assignment_to.user_name as assigned_to,
                assignment_by.user_name as assigned_by,
                assignment.assignment_date_assigned as assigned_date,
                assignment.status_id as state,
                asset.asset_name,
                asset.asset_code,
                asset.asset_specification
            ');
    }

    public static function getRequestForReturning($id)
    {
        if (RequestForReturning::where('assignment_id', $id)->count() == 0) {
            return false;
        }
        return true;
    }
}
