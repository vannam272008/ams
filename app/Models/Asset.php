<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\DB;

class Asset extends Model
{
    use HasFactory;
    use Notifiable;
    use HasApiTokens;

    public $timestamps = false;
    protected $table = 'asset';
    public static $assetStatusAvailable = 1;
    public static $assetStatusNotAvailable = 2;
    public static $assetStatusAssigned = 3;
    public static $assetStatusWaiting = 4;
    public static $assetStatusRecycle = 5;
    protected $fillable = [
        'asset_name',
        'location_id',
        'asset_code',
        'category_id',
        'status_id',
        'asset_specification',
        'asset_installed_date',
    ];

    public function status()
    {
        return $this->belongsTo(AssetStatus::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    public function assignments()
    {
        return $this->hasMany(Assignment::class);
    }

    /**
     * The attributes that used to be apply sort, filter, search.
     *
     * @var array
     */
    public $fields = [
        'sort',
        'search',
        'status_id',
        'category_id'
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
    public $secondSortValue = 'asset.id';

    /**
     * The attributes that are first sort fields.
     *
     * @var array
     */
    public $sortValues = [
        'asset_code',
        'asset_name',
        'asset_status_name',
        'category_name'
    ];

    /**
     * The attributes that are search fields.
     *
     * @var array
     */
    public $searchFields = [
        'asset_code',
        'asset_name'
    ];

    /**
     * Scope a query to show all assets.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeGetAllDetails($query)
    {
        return $query
            ->leftJoin('category', 'asset.category_id', '=', 'category.id')
            ->leftJoin('asset_status', 'asset.status_id', '=', 'asset_status.id')
            ->leftJoin('location', 'asset.location_id', '=', 'location.id')
            ->select(
                'asset.id',
                'asset.category_id',
                'asset.status_id',
                'asset.location_id',
                'asset.asset_code',
                'asset.asset_name',
                'asset.asset_specification',
                'asset.asset_installed_date',
                'category.category_name as category_name',
                'asset_status.asset_status_name as asset_status_name',
                'location.location_prefix as location_prefix'
            )
            ->groupBy(
                'asset.id',
                'category.category_name',
                'asset_status.asset_status_name',
                'location.location_prefix'
            );
    }

    public static function getAssingment($id)
    {
        if (Assignment::where('asset_id', $id)->where('status_id', '!=', 3)->count() == 0) {
            return false;
        }
        return true;
    }
}
