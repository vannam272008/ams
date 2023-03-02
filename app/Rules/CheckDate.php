<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use Carbon\Carbon;

class CheckDate implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
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
        $joinedDateFormat = Carbon::parse($value);
        $joinedDateCheck = $joinedDateFormat->dayOfWeek;
        if ($joinedDateCheck === 6 || $joinedDateCheck === 0) {
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
        return 'Joined date is Saturday or Sunday. Please select a different date';
    }
}
