<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use App\Models\Assignment;
use App\Models\Asset;

class CheckDisableAsset implements Rule
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
        $assignment = Assignment::withTrashed()
            ->where('asset_id', $value)
            ->where('status_id', '!=', Assignment::$assignmentStatusDeclined)
            ->count();
        if ($assignment == 0) {
            if (Asset::find($value)->status_id != Asset::$assetStatusAssigned) {
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
        return 'Invalid asset';
    }
}
