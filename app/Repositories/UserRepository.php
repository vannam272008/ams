<?php

namespace App\Repositories;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

class UserRepository extends BaseRepository
{
    public function createUser($request)
    {
        DB::beginTransaction();
        $data = $request->all();

        $locationId = $request->location_id ? $request->location_id : $request->user()->location_id;

        $user = $this->getDataFormated($data);

        $userName = $this->getUsername($user->first_name, $user->last_name);

        $password = ucwords($userName) . '@' . date_format($user->dob_format, 'dmY');
        $password = Hash::make($password);

        $staffCode = $this->getStaffCode();
        $user = User::create(
            [
                "first_name" => $user->first_name,
                "last_name" => $user->last_name,
                "user_name" => $userName,
                "date_of_birth" => $data['date_of_birth'],
                "joined_date" => $data['joined_date'],
                "location_id" => $locationId,
                "gender" => $data['gender'],
                "admin" => $data['admin'],
                "staff_code" => $staffCode,
                "password" => $password,
            ]
        );
        DB::commit();
        return $user;
    }

    public function getDataFormated($data)
    {
        $lastName = preg_replace(array('/\s{2,}/', '/[\t\n]/'), ' ', $data['last_name']);
        $user = (object) array(
            'first_name' => ucwords($data['first_name'], ' '),
            'last_name' => ucwords($lastName, ' '),
            'dob_format' => date_create($data['date_of_birth'])
        );
        return $user;
    }

    protected function getInitialUsername(string $firstName, string $lastName)
    {
        $userName = strtolower($firstName);
        foreach (explode(' ', $lastName) as $word) {
            $userName .= strtolower($word[0]);
        }

        return $userName;
    }

    protected function getUsername(string $firstName, string $lastName)
    {
        $userName = $this->getInitialUsername($firstName, $lastName);
        $listUsersDuplicateName = User::withTrashed()->where('user_name', 'like', $userName . '%')->get();
        $count = 0;
        if (count($listUsersDuplicateName) >= 1) {
            foreach ($listUsersDuplicateName as $user) {
                $diffUserName = str_replace($userName, "", $user->user_name);
                if (strlen($diffUserName) == 0) {
                    $count += 1;
                } elseif (strlen($diffUserName) >= 0) {
                    if ((int)$diffUserName != 0) {
                        $count += 1;
                    }
                }
            }
        }
        if ($count > 0) {
            $userName .= $count;
        }

        return $userName;
    }

    protected function getStaffCode()
    {
        $id = User::max('id') + 1;
        $idLength = 4;
        $staffCode = 'SD';
        for ($i = 0; $i < $idLength - strlen($id); $i++) {
            $staffCode .= '0';
        }

        $staffCode .= $id;

        return $staffCode;
    }

    public function updateUser(Request $request)
    {
        DB::beginTransaction();

        $userEdit = User::where('id', $request->id)->firstOrFail();

        if ($request->user()->location_id != $userEdit->location_id) {
            throw new NotFoundHttpException('Wrong location');
        }

        if ($request->has('date_of_birth')) {
            $userEdit->date_of_birth = $request->date_of_birth;
        };

        if ($request->has('type')) {
            $userEdit->admin = $request->type;
        };

        if ($request->has('gender')) {
            $userEdit->gender = $request->gender;
        };
        if ($request->has('joined_date')) {
            $userEdit->joined_date = $request->joined_date;
        };
        $userEdit->save();
        DB::commit();
        return $userEdit;
    }

    public function getUserDetailEdit(Request $request, $id)
    {
        return User::find($id);
    }

    public function changePassword($request)
    {
        $oldPassword = $request->input('old_password');
        $newPassword = $request->input('new_password');
        $user = $request->user();
        if (!Hash::check($oldPassword, $user->password)) {
            throw new UnprocessableEntityHttpException('Password is incorrect');
        }
        if ($oldPassword == $newPassword) {
            throw new UnprocessableEntityHttpException('New password can not be the same as old password');
        }
        $user->update([
            'password' => Hash::make($newPassword)
        ]);
        return ((object)array(
            'message' => 'Your password has been changed successfully'
        ));
    }

    public function changePasswordFirst($request)
    {
        $newPassword = $request->input('new_password');
        $user = $request->user();
        if (Hash::check($newPassword, $user->password)) {
            throw new UnprocessableEntityHttpException('New password can not be the same as old password');
        }
        $user->password = Hash::make($newPassword);
        $user->first_login = false;
        $user->save();
        return ((object)array(
            'message' => 'Your password has been changed successfully'
        ));
    }

    public function getAllUsers($request)
    {
        $params = $request->all();
        $limit = $this->getLimit($request);
        $order = $this->getOrder($request);
        $perPage = $this->getPerPage($request);
        $extraFields = (object) array(
            'full_name' => "CONCAT(LOWER(first_name), ' ', LOWER(last_name))",
            'type' => 'admin'
        );
        $model = new User();
        $query = User::select('*')
            ->addselect(DB::raw("CONCAT(first_name,' ',last_name) AS full_name"))
            ->when(!$request->has('create-assignment'), function ($query) use ($request) {
                return $query->where('id', '!=', $request->user()->id);
            })
            ->where('location_id', $request->user()->location_id);
        $query = $this->applySortFilterSearch($query, $params, $order, $model, $extraFields);
        $users = $query->paginate($limit ? $limit : $perPage);
        return $users;
    }

    public function destroy($userID)
    {
        DB::beginTransaction();
        try {
            User::find($userID)->delete();
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw new \Exception($e->getMessage());
        }
    }
}
