<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

abstract class AssetRequest extends FormRequest
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
            'asset_name' => ['required', 'string', 'max:128', 'regex:/^[a-zA-Z0-9 ]*$/'],
            'asset_specification' => ['required', 'string'],
            'asset_installed_date' => ['date'],
        ];
    }

    public function messages()
    {
        return [
            'asset_name.required' => 'Asset name is required!',
            'asset_name.max' => 'Field Asset Name exceeds maximum length (128)',
            'asset_name.regex' => 'Special character is NOT allowed',
            'asset_specification.required' => 'Asset specification is required!'
        ];
    }

    public function failedValidation(Validator $validator)
    {

        $errors = (new ValidationException($validator))->errors();
        throw new HttpResponseException(response()->json(
            [
                'Errors' => $errors,
            ],
            422
        ));
    }
}
