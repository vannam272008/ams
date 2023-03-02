<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use App\Models\Asset;

class LocationAsset implements Rule
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
        if (Asset::find($value)) {
            if (Asset::find($value)->location_id != $this->locationAdmin) {
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
        return 'Wrong Location Please Check Again';
    }
}
