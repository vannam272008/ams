<?php

namespace App\Repositories;

use App\Models\AssetStatus;
use App\Models\AssignmentStatus;
use Illuminate\Http\Request;

class StatusRepository
{
    /**
     * Function used to get status used for asset.
     *
     * @return \Illuminate\Http\Response
     */
    public function getAllAssetStatus()
    {
        $status = AssetStatus::orderBy('asset_status_name', 'asc')->get();
        return $status;
    }

    /**
     * Function used to get status used for assignment.
     *
     * @return \Illuminate\Http\Response
     */
    public function getAllAssignmentStatus()
    {
        $status = AssignmentStatus::orderBy('assignment_status_name', 'asc')->get();
        return $status;
    }
}
