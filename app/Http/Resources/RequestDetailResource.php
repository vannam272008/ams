<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RequestDetailResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'asset_code' => $this->asset_code,
            'asset_name' => $this->asset_name,
            'requested_by' => $this->requested_by,
            'accepted_by' => $this->accepted_by,
            'assigned_date' => $this->assigned_date,
            'returned_date' => $this->returned_date,
            'state' => $this->state
        ];
    }
}
