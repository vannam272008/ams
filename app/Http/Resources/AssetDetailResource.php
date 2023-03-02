<?php

namespace App\Http\Resources;

use App\Models\Asset;
use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;

class AssetDetailResource extends JsonResource
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
            'category' => $this->category->category_name,
            'installed_date' => $this->asset_installed_date,
            'state' => $this->status->asset_status_name,
            'location' => $this->location->location_prefix,
            'specification' => $this->asset_specification,
            'has_assignment' => Asset::getAssingment($this->id),
        ];
    }
}
