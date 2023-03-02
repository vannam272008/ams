<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use App\Models\Assignment;
use App\Models\User;

class LocationAssignment implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($user)
    {
        $this->user = $user;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        if (Assignment::find($value)) {
            $assignment = Assignment::find($value)->assignment_to;
            if (User::find($assignment)->location_id == $this->user->location_id && $this->user->admin) {
                return true;
            }
            return false;
        }
            return false;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'this user cannot delete assignment';
    }
}
