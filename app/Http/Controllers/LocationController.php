<?php

namespace App\Http\Controllers;

use App\Repositories\LocationRepository;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    protected $locationRepository;

    public function __construct(LocationRepository $locationRepository)
    {
        $this->locationRepository = $locationRepository;
    }

    /**
     * Function used to get locations.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $result = $this->locationRepository->getAllLocations();
        return response()->json($result, 200);
    }
}
