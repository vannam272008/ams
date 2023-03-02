<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use App\Models\Asset;

class UpdateAssignmentForAsset implements Rule
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
        $asset = Asset::find($value);
        if ($asset) {
            if ($asset->location_id != $this->locationAdmin || $asset->status_id != Asset::$assetStatusAvailable) {
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
        return 'Invalid Asset';
    }
}
