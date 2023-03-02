<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use App\Models\Assignment;
use App\Models\User;

class CheckUserReturning implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($userID)
    {
        $this->userID = $userID;
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
        if (!User::find($this->userID)->admin && Assignment::find($value)->assignment_to != $this->userID) {
            return false;
        }
        return true;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'Invalid User To Return For This Assignment';
    }
}
