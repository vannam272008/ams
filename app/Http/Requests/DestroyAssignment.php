<?php

namespace App\Http\Requests;

use App\Rules\CheckStateAssignment;
use App\Rules\CheckStateAssignmentDestroy;
use App\Rules\LocationAssignment;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidationException;

class DestroyAssignment extends FormRequest
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
            'assignment_id' => ['required','exists:assignment,id', new CheckStateAssignmentDestroy()
            , new LocationAssignment($this->user())],
        ];
    }

    public function messages()
    {
        return [
            'assignment_id.required' => 'Assignment ID is required',
            'assignment_id.exists' => 'Invalid Assignment',
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
