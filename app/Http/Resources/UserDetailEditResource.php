<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;

class UserDetailEditResource extends JsonResource
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
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'date_of_birth' => $this->date_of_birth,
            'gender' => $this->gender ? 1 : 0,
            'joined_date' => $this->joined_date,
            'type' => $this->admin ? 'Admin' : 'Staff',
            'staff_code' => $this->staff_code,
            'full_name' => $this->first_name . " " . $this->last_name,
            'location' => $this->location,
            'user_name' => $this->user_name,
            'has_assignment' => User::getAssingment($this->id),
        ];
    }
}
