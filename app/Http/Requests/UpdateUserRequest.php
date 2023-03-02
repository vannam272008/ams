<?php

namespace App\Http\Requests;

use App\Rules\checkDate;
use App\Rules\checkDateDobAndJoined;
use Illuminate\Contracts\Validation\Validator;

class UpdateUserRequest extends UserRequest
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
        return array_merge_recursive([
            'date_of_birth' => 'nullable',
            'gender' => 'nullable|between:0,1',
            'joined_date' => 'nullable',
            'type' => 'nullable|between:0,1'
        ], parent::rules());
    }

    public function messages()
    {
        return parent::messages();
    }

    public function failedValidation(Validator $validator)
    {
        parent::failedValidation($validator);
    }
}
