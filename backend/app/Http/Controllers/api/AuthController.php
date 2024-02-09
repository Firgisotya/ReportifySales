<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use App\Traits\ApiResponse;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    use ApiResponse;

    public function login(LoginRequest $request)
    {
        try {
            $user = User::where('nik', $request->nik)->first();
            if (!$user) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Email tidak terdaftar'
                ], 401);
            }
            if(!Hash::check($request->password, $user->password)){
                return response()->json([
                    'status' => 'error',
                    'message' => 'Password salah'
                ], 401);
            }
            $token = $user->createToken('token')->plainTextToken;
            return response()->json([
                'status' => 'success',
                'message' => 'Login berhasil',
                'data' => $user,
                'token' => $token
            ]);
        } catch (\Throwable $th) {
            throw new HttpResponseException($this->apiError(
                $th->getMessage(),
                Response::HTTP_UNAUTHORIZED
            ));
        }
    }

    public function logout(Request $request)
    {
        try {
            $request->user()->tokens()->delete();
            return response()->json([
                'status' => 'success',
                'message' => 'Logout berhasil'
            ]);
        } catch (\Throwable $th) {
            throw new HttpResponseException($this->apiError(
                $th->getMessage(),
                Response::HTTP_UNAUTHORIZED
            ));
        }
    }
}
