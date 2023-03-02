<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use App\Models\User;

class LocationUser implements Rule
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
        if (User::find($value)) {
            if (User::withTrashed()->find($value)->location_id == $this->locationAdmin) {
                if (User::find($value)) {
                    return true;
                }
                return false;
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
        return 'Invalid User';
    }
}
