<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;

class StoreUserRequest extends UserRequest
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
        // preg_match("", $nameUser) -- not contains special chars
        return array_merge_recursive([
            'first_name' => ['required', 'string', 'max:128', 'regex:/^[a-zA-Z]+$/u'],
            'last_name' => ['required', 'string', 'max:128', 'regex:/^[a-zA-Z\s]+$/u'],
            'date_of_birth' => ['required'], //need >= 18
            'joined_date' => ['required'],
            'admin' => ['required', 'boolean'],
            'gender' => ['required', 'boolean']
        ], parent::rules());
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return array_merge_recursive([
            'first_name.required' => 'First name is required!',
            'first_name.max' => 'Field First Name exceeds maximum length (128)',
            'first_name.regex' => 'Alphabetical characters only',
            'last_name.required' => 'Last name is required!',
            'last_name.max' => 'Field Last Name exceeds maximum length (128)',
            'last_name.regex' => 'Alphabetical characters only',
            'date_of_birth.required' => 'Date of birth is required!',
            'joined_date.required' => 'Joined date is required!',
            'admin.required' => 'Type is required!',
            'gender.required' => 'Gender is required!',
        ], parent::messages());
    }

    public function failedValidation(Validator $validator)
    {
        parent::failedValidation($validator);
    }
}
