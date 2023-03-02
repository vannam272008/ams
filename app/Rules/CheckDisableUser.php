<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use App\Models\Assignment;

class CheckDisableUser implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
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
        $list = Assignment::where('assignment_to', $value)
                            ->where('status_id', '!=', Assignment::$assignmentStatusDeclined)
                            ->count();
        if ($list == 0) {
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
        return 'User Has Assignment';
    }
}
