<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Assignment;
class AssignmentResource extends JsonResource
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
            'assigned_to' => $this->assigned_to,
            'assigned_by' => $this->assigned_by,
            'assigned_date' => $this->assignment_date_assigned,
            'specification' => $this->asset_specification,
            'state' => $this->status->assignment_status_name,
            'note' => $this->assignment_note ? $this->assignment_note : '',
            'has_request' => Assignment::getRequestForReturning($this->id),
        ];
    }
}
