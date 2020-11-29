<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use App\VerifyUser;
use App\Mail\VerifyMail;
use App\ModelHasRole;
use Carbon\Carbon;
use Exception;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{
    public function register(Request $request)
    {

        $v = Validator::make($request->all(), [
            'email' => 'required|email|unique:users',
            'password'  => 'required|min:3|confirmed',
        ]);

        if ($v->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $v->errors()
            ], 422);
        }

        $user = new User;
        $user->account_type = $request->accountType;
        $user->first_name = $request->first_name;
        $user->middle_name = $request->middle_name;
        $user->last_name = $request->last_name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->agent_code = "";

        $user->save();
        $user->agent_code = strtolower('TechJobs' . '-' . substr($request->first_name, 0, 2) . '-' . $user->id);
        $user->save();

        $role = Role::firstOrCreate(['name' => strtolower($user->account_type)]);
        $user->assignRole($user->account_type);


        $verifyUser = VerifyUser::create([
            'user_id' => $user->id,
            'token' => mt_rand(100000, 999999)
        ]);
        try {
            \Mail::to($user->email)->send(new VerifyMail($user));
        } catch (Exception $extension) {
        }

        return response()->json(['status' => 'success'], 200);
    }

    public function update(User $user, Request $request)
    {
        $this->authorize('update', $user);
        
        $v = Validator::make($request->all(), [
            'email' => 'required|email',
            'password'  => 'required|min:3|confirmed',
        ]);

        if ($v->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $v->errors()
            ], 422);
        }

        $user->first_name = $request->first_name;
        $user->middle_name = $request->middle_name;
        $user->last_name = $request->last_name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->agent_code = strtolower('TechJobs' . '-' . substr($request->first_name, 0, 2) . '-' . $user->id);

        $user->save();

        return response()->json(['status' => 'success'], 200);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        if ($token = $this->guard()->attempt($credentials)) {
            return $this->respondWithToken($token);
        }
        return response()->json(['error' => 'login_error'], 401);
    }
    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth('api')->user());
    }

    public function logout()
    {
        $this->guard()->logout();
        return response()->json([
            'status' => 'success',
            'msg' => 'Logged out Successfully.'
        ], 200);
    }
    public function user(Request $request)
    {
        $user = User::find(Auth::user()->id);
        return response()->json([
            'status' => 'success',
            'data' => $user
        ]);
    }
    public function refresh()
    {
        if ($token = $this->guard()->refresh()) {
            return response()
                ->json(['status' => 'success'], 200)
                ->header('access_token', $token);
        }
        return response()->json(['error' => 'refresh_token_error'], 401);
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'user' => $this->guard()->user(),
            'roles' => $this->guard()->user()->roles->pluck('name'),
            'expires_in' => auth('api')->factory()->getTTL() * 60
        ]);
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function verify(Request $request)
    {
        $user = Auth::user();
        if ($request->code == $user->verifyUser->token) {
            $user->email_verified_at = Carbon::now();
            $user->save();
            return redirect('/');
        }

        return response()->json([
            'errors' => ["Invalid token"],
        ], 500);
    }

    protected function resend(Request $request)
    {
        $user = Auth::user();
        $user->email = $request->email;
        $user->save();

        VerifyUser::where('user_id', $user->id)->delete();

        $verifyUser = VerifyUser::create([
            'user_id' => $user->id,
            'token' => mt_rand(100000, 999999)
        ]);

        \Mail::to($user->email)->send(new VerifyMail($user));
    }


    public function destroy(User $user)
    {
        $this->authorize('delete', $user);
        if (Storage::exists('public/profile/' . $user->picture))
            Storage::delete('public/profile/' . $user->picture);

        $user->delete();
        return response()->json(['status' => 'success']);
    }
    private function guard()
    {
        return Auth::guard();
    }

    public function authenticate()
    {
        return response()->json([
            'active' => Auth::check(),
        ]);
    }
}
