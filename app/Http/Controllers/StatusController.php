<?php

namespace App\Http\Controllers;

use App\Repositories\StatusRepository;
use Illuminate\Http\Request;

class StatusController extends Controller
{
    protected $statusRepository;

    public function __construct(StatusRepository $statusRepository)
    {
        $this->statusRepository = $statusRepository;
    }

    /**
     * Function used to get status used for asset.
     *
     * @return \Illuminate\Http\Response
     */
    public function getAllAssetStatus()
    {
        $result = $this->statusRepository->getAllAssetStatus();
        return response()->json(['data' => $result], 200);
    }

    /**
     * Function used to get status used for assignment.
     *
     * @return \Illuminate\Http\Response
     */
    public function getAllAssignmentStatus()
    {
        $result = $this->statusRepository->getAllAssignmentStatus();
        return response()->json(['data' => $result], 200);
    }
}
