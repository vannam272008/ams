<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class AssignmentState implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($state)
    {
        $this->state = $state;
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
        if ($value != $this->state) {
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
        return 'Assignment is not available to accept or decline';
    }
}
