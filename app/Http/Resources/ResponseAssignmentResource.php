<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;

class ResponseAssignmentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $asset = $this->asset;
        return [
            'id' => $this->id,
            'asset_code' => $asset->asset_code,
            'asset_name' => $asset->asset_name,
            'assigned_to' => User::findOrFail($this->assignment_to)->user_name,
            'assigned_by' => User::findOrFail($this->assignment_by)->user_name,
            'assigned_date' => $this->assignment_date_assigned,
            'specification' => $asset->asset_specification,
            'state' => $this->status->assignment_status_name,
            'note' => $this->assignment_note ? $this->assignment_note : '',
        ];
    }
}
