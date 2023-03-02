<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidationException;
use App\Rules\CheckDate;

abstract class UserRequest extends FormRequest
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
        $minJoinedDate = date('Y-m-d', strtotime($this->date_of_birth . ' + 18 years'));
        return [
            'date_of_birth' => ['date','before: -18 years'], //need >= 18
            'joined_date' => ['date', 'after:date_of_birth','after_or_equal:' . $minJoinedDate, new CheckDate()],
        ];
    }

    public function messages()
    {
        return [
            'date_of_birth.before' => 'User is under 18. Please select a different date',
            'joined_date.after' => 'Joined date is not later than Date of Birth. Please select a different date!',
            'joined_date.after_or_equal' =>
            'Joined date is not later than Date of Birth of 18. Please select a different date!',
        ];
    }

    public function failedValidation(Validator $validator)
    {

        $errors = (new ValidationException($validator))->errors();
        throw new HttpResponseException(response()->json(
            [
                'error' => $errors,
            ],
            422
        ));
    }
}
