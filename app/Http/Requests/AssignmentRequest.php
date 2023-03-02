<?php

namespace App\Http\Requests;

use App\Rules\AssignmentForAsset;
use App\Rules\LocationUser;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidationException;

class AssignmentRequest extends FormRequest
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
            'asset_id' => 'required|integer|exists:asset,id',
            'assignment_to' => 'required|integer|exists:user,id',
            'assignment_date_assigned' => 'required|date|date_format:Y-m-d',
            'assignment_note' => 'nullable|string|max:256',
            'assignment_to' => new LocationUser($this->user()->location_id),
            'asset_id' => new AssignmentForAsset($this->user()->location_id),
        ];
    }
    public function messages()
    {
        return [
            'asset_id.required' => 'asset id is required',
            'assignment_to.required' => 'assignment to is required',
            'assignment_date_assigned.required' => 'assignment date is required',
            'asset_id.exists' => 'asset id doesn\'t exist',
            'assignment_to.exists' => 'assignment to id doesn\'t exist',
            'assignment_note.max' => 'assignment note is too long',
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
