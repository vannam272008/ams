<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RequestForReturning extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'request_for_returning';
    protected $fillable = [
        'status_id',
        'assignment_id',
        'requested_by',
        'accepted_by',
    ];
    public static $requestStatusCompleted = 1;
    public static $requestStatusWaiting = 2;

    public function status()
    {
        return $this->belongsTo(RequestStatus::class);
    }

    public function assignment()
    {
        return $this->belongsTo(Assignment::class, 'assignment_id', 'id');
    }

    /**
     * The attributes that used to be apply sort, filter, search.
     *
     * @var array
     */
    public $fields = [
        'sort',
        'search',
        'state',
        'returned_date'
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
    public $secondSortValue = 'request_for_returning.id';

    /**
     * The attributes that are first sort fields.
     *
     * @var array
     */
    public $sortValues = [
        'asset_code',
        'asset_name',
        'requested_by',
        'accepted_by',
        'assigned_date',
        'returned_date',
        'state'
    ];

    /**
     * The attributes that are search fields.
     *
     * @var array
     */
    public $searchFields = [
        'asset_code',
        'asset_name',
        'user_requested_by.user_name'
    ];

    /**
     * The attributes that are raw attributes.
     *
     * @var object
     */
    public $extraFields = ['state', 'returned_date'];

    /**
     * Scope a query to show all books.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeGetAllDetails($query)
    {
        return $query
            ->leftJoin('assignment', 'assignment.id', '=', 'request_for_returning.assignment_id')
            ->leftJoin('user as user_accepted_by', 'user_accepted_by.id', '=', 'request_for_returning.accepted_by')
            ->leftJoin('user as user_requested_by', 'user_requested_by.id', '=', 'request_for_returning.requested_by')
            ->leftJoin('request_status', 'request_status.id', '=', 'request_for_returning.status_id')
            ->leftJoin('asset', 'asset.id', '=', 'assignment.asset_id')
            ->select(
                'request_for_returning.id',
                'asset.asset_code as asset_code',
                'asset.asset_name as asset_name',
                'asset.location_id',
                'user_requested_by.user_name as requested_by',
                'user_accepted_by.user_name as accepted_by',
                'assignment.assignment_date_assigned as assigned_date',
                'assignment.assignment_date_returned as returned_date',
                'request_status.request_status_name as state',
            )
            ->groupBy(
                'request_for_returning.id',
                'asset.asset_code',
                'asset.asset_name',
                'asset.location_id',
                'user_requested_by.user_name',
                'user_accepted_by.user_name',
                'assignment.assignment_date_assigned',
                'assignment.assignment_date_returned',
                'request_status.request_status_name'
            );
    }
}
