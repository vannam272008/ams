<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use App\Models\RequestForReturning;
use App\Models\Assignment;
use App\Models\User;

class CompleteReturn implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($locationAdmin)
    {
        $this->locationAdmin = $locationAdmin;
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
        $requestReturn = RequestForReturning::find($value);
        if ($requestReturn) {
            $assignment = Assignment::find($requestReturn->assignment_id);
            $user = User::find($assignment->assignment_to);
            if ($user->location_id != $this->locationAdmin) {
                return false;
            }
            if ($requestReturn->status_id != RequestForReturning::$requestStatusWaiting) {
                return false;
            }
            return true;
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
        return 'Invalid request';
    }
}
