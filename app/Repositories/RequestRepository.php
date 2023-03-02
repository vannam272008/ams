<?php

namespace App\Repositories;

use App\Models\Assignment;
use App\Models\RequestForReturning;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use function PHPUnit\Framework\throwException;

class RequestRepository extends BaseRepository
{
    protected $defaultRequestStatus = 2;
    public function getAllRequests($request)
    {
        $user = $request->user();
        $params = $request->all();
        $limit = $this->getLimit($request);
        $order = $this->getOrder($request);
        $perPage = $this->getPerPage($request);
        $extraFields = (object) array(
            'returned_date' => 'assignment.assignment_date_returned',
            'state' => 'request_for_returning.status_id',
        );
        $model = new RequestForReturning();
        $query = $model::getAllDetails();
        $query = $this->applySortFilterSearch($query, $params, $order, $model, $extraFields);
        $query = $query->where('asset.location_id', $user->location_id);
        $assets = $query->paginate($limit ? $limit : $perPage);
        return $assets;
    }

    public function update($id, $acceptedBy)
    {
        DB::beginTransaction();
        try {
            $requestReturn = RequestForReturning::where('id', $id)->update([
                    'status_id' => 1,
                    'accepted_by' => $acceptedBy,
                ]);
            RequestForReturning::find($id)->assignment()->update(['assignment_date_returned' => Carbon::now()]);
            Assignment::find(RequestForReturning::find($id)->assignment_id)->asset()->update(['status_id' => 1]);
            RequestForReturning::find($id)->assignment()->delete();
            DB::commit();
            $result = RequestForReturning::getAllDetails()->find($id);
            return $result;
        } catch (\Exception $e) {
            DB::rollBack();
            throw new \Exception($e->getMessage());
        }
    }
    public function destroy($id)
    {
        RequestForReturning::find($id)->delete();
    }

    public function store($assignmentID, $user)
    {
        DB::beginTransaction();
        try {
            RequestForReturning::create([
                "status_id" => $this->defaultRequestStatus,
                "assignment_id" => (int) $assignmentID,
                "requested_by" => $user->id,
            ]);
            DB::commit();
            $result = Assignment::getAllDetails($user->location_id)->find($assignmentID);
            return $result;
        } catch (\Exception $e) {
            DB::rollBack();
            throw new \Exception($e->getMessage());
        }
    }
}
