<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Date;

class UserResource extends JsonResource
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
            'staff_code' => $this->staff_code,
            'user_name' => $this->user_name,
            'date_of_birth' => $this->date_of_birth,
            'gender' => $this->gender,
            'joined_date' => $this->joined_date,
            'location' => $this->location,
            'admin' => $this->admin,
            'has_assignment' => User::getAssingment($this->id),
          ];
    }
}
