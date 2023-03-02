<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class SessionRepository
{
    public function login(Request $request)
    {
        $userName = $request->input('user_name');
        $password = $request->input('password');

        $user = User::where('user_name', $userName)->firstOr(function () {
            return null;
        });
        if ($user == null) {
            throw new NotFoundHttpException('Username or password is incorrect!');
        } else {
            if (!Hash::check($password, $user->password, [])) {
                throw new NotFoundHttpException('Username or password is incorrect!');
            }
        }
        $user->remember_token = $user->createToken('authToken')->plainTextToken;
        return $user;
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return ((object)array(
            'message' => 'Logged out successfully!'
        ));
    }
}
