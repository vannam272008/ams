<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ViewAssignmentRequest extends FormRequest
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
            'sort' => 'nullable|string',
            'sorttype' => 'nullable|numeric|between:1,2',
            'search' => 'nullable|string|max:128',
            'date' => 'nullable|date',
        ];
    }
}
