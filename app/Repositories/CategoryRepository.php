<?php

namespace App\Repositories;

use App\Http\Requests\StoreCategoryRequest;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryRepository
{
    /**
     * Function used to get categories.
     *
     * @return \Illuminate\Http\Response
     */
    public function getAllCategories()
    {
        return Category::orderBy('category_name', 'asc')->get();
    }

    public function createCategory(StoreCategoryRequest $request)
    {
        $data = $request->all();
        $categoryPrefix = strtoupper($data['category_prefix']);
        $category = Category::create(
            [
                "category_name" => $data['category_name'],
                "category_prefix" => $categoryPrefix,
            ]
        );
        return $category;
    }

    public function getAllCategoriesById()
    {
        $categories = Category::orderBy('id')->get();
        return $categories;
    }
}
