<?php

namespace App\Repositories;

use App\Models\Asset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use App\Models\Assignment;
use Illuminate\Support\Carbon;

class AssignmentRepository extends BaseRepository
{
    /**
     * Function used to get locations.
     *
     * @return \Illuminate\Http\Response
     */

    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            $assignment = Assignment::create([
                'status_id' => 2,
                'asset_id' => $request->asset_id,
                'assignment_to' => $request->assignment_to,
                'assignment_by' => $request->user()->id,
                'assignment_date_assigned' => $request->assignment_date_assigned,
                'assignment_note' => $request->assignment_note ?: '',
            ]);
            DB::commit();

            return    Assignment::select('assignment.*')
                ->join('user as assignment_to', 'assignment_to.id', '=', 'assignment.assignment_to')
                ->join('user as assignment_by', 'assignment_by.id', '=', 'assignment.assignment_by')
                ->join('asset', 'assignment.asset_id', '=', 'asset.id')
                ->where('assignment.id', $assignment->id)
                ->SelectRaw('
                        assignment_to.user_name as assigned_to,
                        assignment_by.user_name as assigned_by,
                        asset.asset_name,
                        asset.asset_code,
                        asset.asset_specification
                    ')->first();
        } catch (\Exception $e) {
            DB::rollback();
            throw new \Exception($e->getMessage());
        }
    }

    public function sort($list, $request)
    {
        switch ($request->sort) {
            case 'id':
                if ($request->sorttype == 2) {
                    $list->orderby('assignment.id', 'asc');
                } else {
                    $list->orderby('assignment.id', 'desc');
                }
                break;
            case 'asset_code':
                if ($request->sorttype == 2) {
                    $list->orderby('asset.asset_code', 'asc');
                } else {
                    $list->orderby('asset.asset_code', 'desc');
                }
                break;
            case 'asset_name':
                if ($request->sorttype == 2) {
                    $list->orderby('asset.asset_name', 'asc');
                } else {
                    $list->orderby('asset.asset_name', 'desc');
                }
                break;
            case 'assigned_to':
                if ($request->sorttype == 2) {
                    $list->orderby('assignment_to.user_name', 'asc');
                } else {
                    $list->orderby('assignment_to.user_name', 'desc');
                }
                break;
            case 'assigned_by':
                if ($request->sorttype == 2) {
                    $list->orderby('assignment_by.user_name', 'asc');
                } else {
                    $list->orderby('assignment_by.user_name', 'desc');
                }
                break;
            case 'assigned_date':
                if ($request->sorttype == 2) {
                    $list->orderby('assignment.assignment_date_assigned', 'asc');
                } else {
                    $list->orderby('assignment.assignment_date_assigned', 'desc');
                }
                break;
            case 'state':
                if ($request->sorttype == 2) {
                    $list->orderby('assignment.status_id', 'asc');
                } else {
                    $list->orderby('assignment.status_id', 'desc');
                }
                break;
        }
        return $list;
    }

    public function getAllAssignments($request)
    {
        $params = $request->all();
        $limit = $this->getLimit($request);
        $order = $this->getOrder($request);
        $perPage = $this->getPerPage($request);
        $extraFields = (object) array(
            'id' => 'assignment.id',
            'asset_code' => 'asset.asset_code',
            'asset_name' => 'asset.asset_name',
            'assigned_to' => 'assignment_to.user_name',
            'assigned_by' => 'assignment_by.user_name',
            'assigned_date' => "assignment.assignment_date_assigned",
            'state' => 'assignment.status_id'
        );
        $model = new Assignment();
        $query = Assignment::getAllDetails($request->user()->location_id);
        $query = $this->applySortFilterSearch($query, $params, $order, $model, $extraFields);
        $assets = $query->paginate($limit ? $limit : $perPage);
        return $assets;
    }

    public function getAssignmentDetail($request, $id)
    {
        return Assignment::findOrFail($id);
    }

    public function updateAssignment($request)
    {
        DB::beginTransaction();
        if (
            $request->user()->location_id != Asset::find($request->asset_id)->location_id
        ) {
            throw new \Exception('Wrong Location');
        }
        $update = Assignment::where('id', $request->id)->firstOrFail();
        $update->asset_id = $request->asset_id;
        $update->assignment_to = $request->assignment_to;
        $update->assignment_date_assigned = $request->assignment_date_assigned;
        $update->assignment_note = $request->assignment_note ?: '';
        $update->save();
        DB::commit();
        return $update;
    }

    public function getAssignmentByUser(Request $request)
    {
        $limit = $this->getLimit($request);
        $perPage = $this->getPerPage($request);
        $today = Carbon::today('Asia/Ho_Chi_Minh')->format('Y-m-d');
        $list = Assignment::select('assignment.*')
            ->join('user as assignment_to', 'assignment_to.id', '=', 'assignment.assignment_to')
            ->join('user as assignment_by', 'assignment_by.id', '=', 'assignment.assignment_by')
            ->join('asset', 'assignment.asset_id', '=', 'asset.id')
            ->where('assignment_to.id', $request->user()->id)
            ->where('assignment.assignment_date_assigned', '<=', $today)
            ->SelectRaw('
             assignment_to.user_name as assigned_to,
             assignment_by.user_name as assigned_by,
             asset.asset_name,
             asset.asset_code,
             asset.asset_specification
         ');
        $list = $this->sort($list, $request);
        return $list->paginate($limit ? $limit : $perPage);
    }

    public function getAssignmentsByAssetId($request)
    {
        $assignments = Assignment::withTrashed()
            ->where('asset_id', '=', $request->input('id'))
            ->where('assignment.status_id', '=', 1)
            ->get();
        return $assignments;
    }

    public function destroy($assignmentID)
    {
        DB::beginTransaction();
        try {
            Assignment::find($assignmentID)->forceDelete();
            DB::commit();
            return true;
        } catch (\Exception $e) {
            DB::rollBack();
            throw new \Exception($e->getMessage());
        }
    }

    public function responseAssignment($request)
    {
        $action = $request->input('action');
        $assignment = Assignment::findOrFail($request->id);
        if ($action == 'accept') {
            $assignment->status_id = 1;
            $asset = Asset::findOrFail($assignment->asset_id);
            $asset->status_id = 3;
            $asset->save();
        }
        if ($action == 'decline') {
            $assignment->status_id = 3;
        }
        $assignment->save();
        return $assignment;
    }
}
