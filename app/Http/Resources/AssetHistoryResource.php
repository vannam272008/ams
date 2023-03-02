<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\User;

class AssetHistoryResource extends JsonResource
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
            'assignment_date_assigned' => $this->assignment_date_assigned,
            'assignment_to' => User::withTrashed()->find($this->assignment_to)->user_name,
            'assignment_by' => User::withTrashed()->find($this->assignment_by)->user_name,
            'assignment_date_returned' => $this->assignment_date_returned,
        ];
    }
}
