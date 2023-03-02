<?php

namespace App\Repositories;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

abstract class BaseRepository
{
    /**
     * Get number of books per page for a listing of book.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return int $perPage
     */
    public function getPerPage(Request $request)
    {
        if ($request->input('perpage')) {
            return $request->input('perpage');
        }
        return 20;
    }

    /**
     * Get limit for a listing of book.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return int or null $limit
     */
    public function getLimit(Request $request)
    {
        if ($request->input('limit')) {
            return $request->input('limit');
        }
        return null;
    }

    /**
     * Get sort order for a listing of book.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string $order
     */
    public function getOrder(Request $request)
    {
        if ($request->input('sorttype') && $request->input('sorttype') == 1) {
            return 'desc';
        }
        return 'asc';
    }

    /**
     * Function used to apply sort, filter, search for list resource.
     */
    public function applySortFilterSearch($query, $params, $order, $model, $extraFields)
    {
        foreach ($params as $field => $value) {
            if (in_array($field, $model->fields)) {
                if ($field === "sort") {
                    if (!in_array($value, $model->sortValues)) {
                        $value = $model->defaultSortValue;
                    }
                    $query = $query->orderBy($value, $order)->orderBy($model->secondSortValue, 'asc');
                } elseif ($field === 'search') {
                    if ($value != null && $value != '') {
                        $searchFields = $model->searchFields;
                        $value = '%' . strtolower($value) . '%';
                        $query = $query->where(function ($query) use ($searchFields, $value, $model, $extraFields) {
                            foreach ($searchFields as $searchField) {
                                if ($extraFields != null && in_array($searchField, $model->extraFields)) {
                                    $searchColumn = $extraFields->{$searchField};
                                } else {
                                    $searchColumn = 'LOWER(' . $searchField . ')';
                                }
                                $query = $query->orWhere(DB::raw($searchColumn), 'like', $value);
                            }
                        });
                    }
                } else {
                    if ($value != 'all' && $value != '') {
                        $filterValues = explode(' ', $value);
                        $query = $query->where(function ($query) use ($field, $filterValues, $model, $extraFields) {
                            foreach ($filterValues as $filterValue) {
                                if ($extraFields != null && in_array($field, $model->extraFields)) {
                                    $filterColumn = $extraFields->{$field};
                                } else {
                                    $filterColumn = $field;
                                }
                                $query = $query->orWhere($filterColumn, '=', $filterValue);
                            }
                        });
                    }
                }
            }
        }
        return $query;
    }
}
