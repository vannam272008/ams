<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAssetRequest;
use App\Http\Resources\AssetDetailResource;
use App\Repositories\AssetRepository;
use App\Http\Resources\AssetDetailEditResource;
use App\Http\Requests\AssetDetailRequest;
use App\Http\Requests\DestroyAssetRequest;
use App\Http\Requests\UpdateAssetRequest;
use App\Http\Resources\AssetCollection;
use Illuminate\Http\Request;

class AssetController extends Controller
{
    protected $assetRepository;

    public function __construct(AssetRepository $assetRepository)
    {
        $this->assetRepository = $assetRepository;
    }

    public function getDetailAsset(AssetDetailRequest $request)
    {
        $assetDetail = $this->assetRepository->getAssetDetailEdit($request);
        return new AssetDetailEditResource($assetDetail);
    }

    public function update(UpdateAssetRequest $request)
    {
        $assetDetailResult = $this->assetRepository->updateAsset($request);
        return new AssetDetailResource($assetDetailResult);
    }

    public function store(StoreAssetRequest $request)
    {
        $asset = $this->assetRepository->createAsset($request);
        return new AssetDetailResource($asset);
    }

    public function index(Request $request)
    {
        $result = $this->assetRepository->getAllAssets($request);
        return new AssetCollection($result);
    }

    public function show(Request $request, $id)
    {
        $result = $this->assetRepository->getAssetDetail($request, $id);
        return new AssetDetailResource($result);
    }

    public function destroy(DestroyAssetRequest $request)
    {
        $this->assetRepository->destroy($request->asset_id);
        return response()->json('sucess', 200);
    }

    public function checkAssetHasAssignment(Request $request)
    {
        $result = $this->assetRepository->checkAssetHasAssignment($request);
        return response()->json(['data' => $result], 200);
    }
}
