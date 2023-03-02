<?php

namespace App\Http\Requests;

use App\Models\Assignment;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidationException;
use App\Rules\AssignmentOfUser;
use App\Rules\AssignmentState;

class ResponseAssignmentRequest extends FormRequest
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
        $user_name = $this->user()->user_name;
        $state = "Waiting for acceptance";
        return [
            'id' => 'required|int|exists:assignment,id',
            'assigned_to' => 'required|string|exists:user,user_name',
            'state' => 'required|string|exists:assignment_status,assignment_status_name',
            'assigned_to' => new AssignmentOfUser($user_name),
            'state' => new AssignmentState($state)
        ];
    }

    public function messages()
    {
        return [
            'id.required' => 'Id is required',
            'assigned_to.required' => 'Username to is required',
            'state.required' => 'State to is required',
            'id.exists' => 'Id doesn\'t exist',
            'assigned_to.exists' => 'Username doesn\'t exist',
            'state.exists' => 'State doesn\'t exist',
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
