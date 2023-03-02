<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use Carbon\Carbon;

class CheckDateDobAndJoined implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($dob, $joinedDate)
    {
        $this->dob = $dob;
        $this->joinedDate = $joinedDate;
    }

    public function getAge($dobFormat, $date)
    {
        return date_diff($date, $dobFormat)->y;
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
        $dobFormat = Carbon::parse($this->dob);
        $joinedDateFormat = Carbon::parse($this->joinedDate);
        $age = $this->getAge($dobFormat, $joinedDateFormat);
        if ($age < 18) {
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
        return 'Joined date is not later than Date of Birth of 18. Please select a different date';
    }
}
