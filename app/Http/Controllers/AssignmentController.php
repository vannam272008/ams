<?php

namespace App\Http\Controllers;

use App\Http\Requests\AssignmentRequest;
use App\Http\Requests\DestroyAssignment;
use App\Http\Requests\ResponseAssignmentRequest;
use App\Http\Requests\UpdateAssetRequest;
use App\Http\Resources\AssetDetailResource;
use App\Http\Resources\ResponseAssignmentResource;
use App\Http\Resources\AssignmentDetailResource;
use App\Http\Resources\AssignmentResource;
use Illuminate\Http\Request;
use App\Repositories\AssignmentRepository;
use App\Http\Requests\StoreAssignmentRequest;
use App\Http\Requests\UpdateAssignmentRequest;
use App\Http\Resources\AssetHistoryCollection;
use App\Http\Resources\AssignmentCollection;
use App\Http\Resources\EditAssignmentResource;

class AssignmentController extends Controller
{
    protected $assignmentRepository;

    public function __construct(AssignmentRepository $assignmentRepository)
    {
        $this->assignmentRepository = $assignmentRepository;
    }

    public function store(StoreAssignmentRequest $request)
    {
        $storeResult = $this->assignmentRepository->store($request);
        return response()->json(new AssignmentResource($storeResult), 200);
    }

    public function getAssignmentByUser(Request $request)
    {
        $result = $this->assignmentRepository->getAssignmentByUser($request);
        return new AssignmentCollection($result);
    }

    public function updateAssignment(UpdateAssignmentRequest $request)
    {
        $assignmentDetailResult = $this->assignmentRepository->updateAssignment($request);
        return new EditAssignmentResource($assignmentDetailResult);
    }

    public function index(Request $request)
    {
        $result = $this->assignmentRepository->getAllAssignments($request);
        return new AssignmentCollection($result);
    }

    public function show(Request $request, $id)
    {
        $result = $this->assignmentRepository->getAssignmentDetail($request, $id);
        return new AssignmentDetailResource($result);
    }

    public function getAssignmentsByAssetId(Request $request)
    {
        $assignments = $this->assignmentRepository->getAssignmentsByAssetId($request);
        return new AssetHistoryCollection($assignments);
    }

    public function responseAssignment(ResponseAssignmentRequest $request)
    {
        $assignment = $this->assignmentRepository->responseAssignment($request);
        return new ResponseAssignmentResource($assignment);
    }

    public function destroy(DestroyAssignment $request)
    {
        $this->assignmentRepository->destroy($request->assignment_id);
        return response()->json('success', 202);
    }
}
