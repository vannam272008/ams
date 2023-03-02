<?php

namespace App\Http\Resources;
use App\Models\Review;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ListManageUserCollection extends ResourceCollection
{
    public function toArray($request)
    {
        return [
            'data' => $this->collection,
        ];
    }
}
