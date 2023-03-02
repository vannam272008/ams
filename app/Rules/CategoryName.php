<?php

namespace App\Rules;

use App\Models\Category;
use Illuminate\Support\Facades\DB;
use Illuminate\Contracts\Validation\Rule;

class CategoryName implements Rule
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
        $count = Category::where(DB::raw('LOWER(category_name)'), 'like', strtolower($value))->count();
        if ($count == 0) {
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
        return 'Category is already existed. Please enter a different category';
    }
}
