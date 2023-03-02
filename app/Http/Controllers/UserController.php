<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChangePasswordFirstRequest;
use App\Http\Requests\ManageUserViewRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\ListManageUserCollection;
use App\Http\Resources\UserDetailEditResource;
use Illuminate\Http\Request;
use App\Http\Requests\ChangePasswordRequest;
use App\Http\Requests\DestroyUserRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Resources\UserResource;
use App\Repositories\UserRepository;
use Illuminate\Http\Response;

class UserController extends Controller
{
    protected $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreUserRequest $request)
    {
        $user = $this->userRepository->createUser($request);
        return new UserResource($user);
    }

    public function update(UpdateUserRequest $request)
    {
        $user = $this->userRepository->updateUser($request);
        return new UserResource($user);
    }

    public function index(ManageUserViewRequest $request)
    {
        $result = $this->userRepository->getAllUsers($request);
        return new ListManageUserCollection($result);
    }

    public function show(Request $request, $id)
    {
        $userDetailResult = $this->userRepository->getUserDetailEdit($request, $id);
        return new UserDetailEditResource($userDetailResult);
    }

    public function changePassword(ChangePasswordRequest $request)
    {
        $result = $this->userRepository->changePassword($request);
        return $result;
    }

    public function changePasswordFirst(ChangePasswordFirstRequest $request)
    {
        $result = $this->userRepository->changePasswordFirst($request);
        return $result;
    }

    public function destroy(DestroyUserRequest $request)
    {
        $this->userRepository->destroy($request->user_id);
        return response()->json('success', 200);
    }
}
