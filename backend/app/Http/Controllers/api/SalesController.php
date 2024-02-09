<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SalesRequest;
use App\Models\Sales;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class SalesController extends Controller
{
    use ApiResponse;
    public function index()
    {
        try {
            $sales = Sales::orderBy('id', 'asc')->get();
            return response()->json([
                'status' => 'success',
                'message' => 'Sales berhasil ditampilkan',
                'data' => $sales
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage()
            ]);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(SalesRequest $request)
    {
        try {
            $sales = Sales::create([
                'nik' => $request->nik,
                'nama_sales' => $request->nama_sales,
                'password' => Hash::make($request->password),
            ]);
            return response()->json([
                'status' => 'success',
                'message' => 'Sales berhasil ditambahkan',
                'data' => $sales
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage()
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Sales  $sales
     * @return \Illuminate\Http\Response
     */
    public function show(Sales $sales)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Sales  $sales
     * @return \Illuminate\Http\Response
     */
    public function edit(Sales $sales)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Sales  $sales
     * @return \Illuminate\Http\Response
     */
    public function update(SalesRequest $request, $id)
    {
        try {
            $sales = Sales::find($id);
            if (!$sales) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Sales tidak ditemukan'
                ]);
            }
            $sales->update([
                'nik' => $request->nik,
                'nama_sales' => $request->nama_sales,
                'password' => Hash::make($request->password),
            ]);
            return response()->json([
                'status' => 'success',
                'message' => 'Sales berhasil diupdate',
                'data' => $sales
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage()
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Sales  $sales
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $sales = Sales::find($id);
            if (!$sales) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Sales tidak ditemukan'
                ]);
            }
            $sales->delete();
            return response()->json([
                'status' => 'success',
                'message' => 'Sales berhasil dihapus'
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage()
            ]);
        }
    }
}
