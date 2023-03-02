<?php

namespace App\Repositories;

use App\Models\Location;
use Illuminate\Http\Request;

class LocationRepository
{
    /**
     * Function used to get locations.
     *
     * @return \Illuminate\Http\Response
     */
    public function getAllLocations()
    {
        $locations = Location::all();
        return $locations;
    }
}
