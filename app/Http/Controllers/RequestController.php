<?php

namespace App\Http\Controllers;

use App\Http\Requests\DestroyReturnRequest;
use App\Http\Requests\UpdateReturnRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Requests\StoreReturningRequest;
use App\Http\Resources\AssignmentDetailResource;
use App\Http\Resources\RequestDetailCollection;
use App\Http\Resources\RequestDetailResource;
use App\Http\Resources\ResponseAssignmentResource;
use App\Repositories\RequestRepository;
use Illuminate\Http\Request;

class RequestController extends Controller
{
    protected $requestRepository;

    public function __construct(RequestRepository $requestRepository)
    {
        $this->requestRepository = $requestRepository;
    }

    public function index(Request $request)
    {
        $result = $this->requestRepository->getAllRequests($request);
        return new RequestDetailCollection($result);
    }

    public function update(UpdateReturnRequest $request)
    {
        $result = $this->requestRepository->update($request->id, $request->user()->id);
        return new RequestDetailResource($result);
    }

    public function destroy(DestroyReturnRequest $request)
    {
        $this->requestRepository->destroy($request->id);
        return response()->json('success', 200);
    }

    public function store(StoreReturningRequest $request)
    {
        $result = $this->requestRepository->store($request->assignment_id, $request->user());
        return new ResponseAssignmentResource($result);
    }
}
