<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:6'
        ]);

        $user = User::create([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'password' => bcrypt($fields['password'])
        ]);

        $token = $user->createToken('apitoken')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ], 201);
    }
        // Giriş yapma
        public function login(Request $request)
        {
            $fields = $request->validate([
                'email' => 'required|string|email',
                'password' => 'required|string'
            ]);
    
            // Kullanıcıyı bul
            $user = User::where('email', $fields['email'])->first();
    
            if (!$user || !Hash::check($fields['password'], $user->password)) {
                return response()->json([
                    'message' => 'Giriş bilgileri hatalı'
                ], 401);
            }
    
            // Token oluştur
            $token = $user->createToken('apitoken')->plainTextToken;
    
            return response()->json([
                'user' => $user,
                'token' => $token
            ], 200);
        }
}

