<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;

class StoreAssetRequest extends AssetRequest
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
            'asset_installed_date' => ['required'],
            'status_id' => ['required'],
        ], parent::rules());
    }

    public function messages()
    {
        return array_merge_recursive([
            'asset_installed_date.required' => 'Installed date is required!',
            'status_id.required' => 'state is required!',
        ], parent::messages());
    }

    public function failedValidation(Validator $validator)
    {
        parent::failedValidation($validator);
    }
}
