<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\ChangePasswordRequest;
use App\Http\Resources\LoginUserResource;
use App\Repositories\SessionRepository;

class SessionController extends Controller
{
    protected $sessionRepository;

    public function __construct(SessionRepository $sessionRepository)
    {
        $this->sessionRepository = $sessionRepository;
    }

    public function store(LoginRequest $request)
    {
        $result = $this->sessionRepository->login($request);
        return new LoginUserResource($result);
    }

    public function destroy(Request $request)
    {
        $result = $this->sessionRepository->logout($request);
        return $result;
    }
}
