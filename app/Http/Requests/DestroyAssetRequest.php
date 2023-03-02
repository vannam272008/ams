<?php

namespace App\Http\Requests;

use App\Rules\CheckDisableAsset;
use App\Rules\LocationAsset;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidationException;

class DestroyAssetRequest extends FormRequest
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
            'asset_id' => [
                'required', 'exists:asset,id',
                new LocationAsset($this->user()->location_id), new CheckDisableAsset()
            ],
        ];
    }
    public function messages()
    {
        return [
            'asset_id.required' => 'asset id is required',
            'asset_id.exists' => 'asset id doesn\'t exist',
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
