<?php

namespace App\Http\Requests;

use App\Rules\CategoryName;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidationException;

class StoreCategoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'category_name' => ['required', 'string', 'max:30', 'regex:/^[a-zA-Z ]+$/', new CategoryName()],
            'category_prefix' => [
                'required', 'string', 'max:3', 'regex:/^[a-zA-Z ]+$/', 'unique:category,category_prefix'
            ]
        ];
    }

    public function messages()
    {
        return [
            'category_name.required' => 'Category name is required!',
            'category_name.max' => 'Field Category Name exceeds maximum length (30)',
            'category_name.regex' => 'Alphabetical characters only',
            'category_name.unique' => 'Category is already existed. Please enter a different category',
            'category_prefix.required' => 'Category prefix is required!',
            'category_prefix.max' => 'Field Category Prefix exceeds maximum length (3)',
            'category_prefix.regex' => 'Alphabetical characters only',
            'category_prefix.unique' => 'Prefix is already existed. Please enter a different prefix',
        ];
    }

    protected function failedValidation(Validator $validator)
    {

        $errors = (new ValidationException($validator))->errors();
        throw new HttpResponseException(response()->json([
            'error' => $errors,
        ], 422));
    }
}
