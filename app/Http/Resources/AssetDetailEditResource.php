<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AssetDetailEditResource extends JsonResource
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
            'asset_name' => $this->asset_name,
            'asset_specification' => $this->asset_specification,
            'asset_code' => $this->asset_code,
            'asset_installed_date' => $this->asset_installed_date,
            'location' => $this->location_id,
            'status_id' => $this->status_id,
            'category' => $this-> category,
        ];
    }
}
