<?php

namespace App\Http\Requests;

use App\Rules\LocationAsset;
use Illuminate\Contracts\Validation\Validator;

class UpdateAssetRequest extends AssetRequest
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
            'id' => ['required','integer','exists:asset,id', new LocationAsset($this->user()->location_id)],
            'asset_installed_date' => 'nullable',
            'status' => 'required|int'
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
