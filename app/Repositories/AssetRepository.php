<?php

namespace App\Repositories;

use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use App\Models\Asset;
use App\Models\Assignment;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AssetRepository extends BaseRepository
{
    public function createAsset(Request $request)
    {
        $data = $request->all();
        $assetName = $this->handleAssetName($data['asset_name']);

        $assetId = $this->getNewId();
        $categoryId = $data['category_id'];

        $assetCode = $this->getAssetCode($categoryId, $assetId);

        return Asset::create(
            [
                "asset_name" => $assetName,
                "location_id" => $request->user()->location_id,
                "status_id" => $data['status_id'],
                "category_id" => $data['category_id'],
                "asset_specification" => $data['asset_specification'],
                "asset_installed_date" => $data['asset_installed_date'],
                "asset_code" => $assetCode
            ]
        );
    }

    protected function getNewId()
    {
        return Asset::max('id') + 1;
    }

    protected function handleAssetName(string $assetName)
    {
        $assetName = preg_replace(array('/\s{2,}/', '/[\t\n]/'), ' ', $assetName);
        return ucwords($assetName, ' ');
    }

    protected function getAssetCode(string $categoryId, string $id)
    {
        $category_prefix = Category::find($categoryId)->category_prefix;
        return sprintf('%s%06d', $category_prefix, $id);
    }

    public function getAllAssets($request)
    {
        $user = $request->user();
        $params = $request->all();
        $limit = $this->getLimit($request);
        $order = $this->getOrder($request);
        $perPage = $this->getPerPage($request);
        $extraFields = null;
        $model = new Asset();
        $query = $model::getAllDetails()
            ->when($request->has('create-assignment'), function ($query) {
                $query->whereDoesntHave('assignments');
            })
            ->when($request->has('edit-assignment'), function ($query) use ($request) {
                $query->where(function ($query) use ($request) {
                    $query->whereDoesntHave('assignments')
                        ->orWhere('asset.id', '=', $request->input('edit-assignment'));
                });
            });
        $query = $this->applySortFilterSearch($query, $params, $order, $model, $extraFields);
        $query = $query->where('location_id', $user->location_id);
        $assets = $query->paginate($limit ? $limit : $perPage);
        return $assets;
    }

    public function getAssetDetail(Request $request, $id)
    {
        $asset = Asset::findOrFail($id);
        if ($request->user()->location_id !== $asset->location_id) {
            throw new NotFoundHttpException('Wrong location');
        }
        return $asset;
    }

    public function getAssetDetailEdit(Request $request)
    {
        return Asset::findOrFail($request->id);
    }

    public function updateAsset(Request $request)
    {
        try {
            DB::beginTransaction();
            if ($request->user()->location_id != Asset::where('id', $request->id)->first()->location_id) {
                throw new \Exception('Wrong Location');
            }
            $update = Asset::where('id', $request->id)->firstOrFail();
            $update->asset_name = $request->asset_name;
            $update->asset_specification = $request->asset_specification;
            $update->asset_installed_date = $request->asset_installed_date;
            $update->status_id = $request->status;
            $update->save();
            if ($request->input('warning') == 1) {
                $assignment = Assignment::where('asset_id', '=', $update->id)
                    ->where('status_id', '=', 2)
                    ->firstOrFail();
                if ($assignment != null) {
                    $assignment->status_id = 4;
                    $assignment->save();
                }
            }
            DB::commit();
            return $update;
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function checkAssetHasAssignment($request)
    {
        $assignment = null;
        if ($request->input('asset_id') != null) {
            $assignment = Assignment::where('asset_id', '=', $request->input('asset_id'))
                ->where('status_id', '=', 2)
                ->get();
        }
        return $assignment;
    }
    public function destroy($assetID)
    {
        DB::beginTransaction();
        try {
            Asset::find($assetID)->delete();
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw new \Exception($e->getMessage());
        }
    }
}
