<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaketRequest;
use App\Models\Paket;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;

class PaketController extends Controller
{
    use ApiResponse;
    public function index()
    {
        try {
            $paket = Paket::orderBy('id', 'asc')->get();
            return response()->json([
                'status' => 'success',
                'message' => 'Paket berhasil ditampilkan',
                'data' => $paket
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
    public function store(PaketRequest $request)
    {
        try {
            $paket = Paket::create([
                'nama_paket' => $request->nama_paket,
                'harga' => $request->harga,
            ]);
            return response()->json([
                'status' => 'success',
                'message' => 'Paket berhasil ditambahkan',
                'data' => $paket
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
     * @param  \App\Models\Paket  $paket
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $paket = Paket::find($id);
            if (!$paket) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Paket tidak ditemukan'
                ]);
            }
            return response()->json([
                'status' => 'success',
                'message' => 'Paket berhasil ditampilkan',
                'data' => $paket
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage()
            ]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Paket  $paket
     * @return \Illuminate\Http\Response
     */
    public function edit(Paket $paket)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Paket  $paket
     * @return \Illuminate\Http\Response
     */
    public function update(PaketRequest $request, $id)
    {
        try {
            $paket = Paket::find($id);
            if (!$paket) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Paket tidak ditemukan'
                ]);
            }
            $paket->update([
                'nama_paket' => $request->nama_paket,
                'harga' => $request->harga,
            ]);
            return response()->json([
                'status' => 'success',
                'message' => 'Paket berhasil diupdate',
                'data' => $paket
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
     * @param  \App\Models\Paket  $paket
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $paket = Paket::find($id);
            if (!$paket) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Paket tidak ditemukan'
                ]);
            }
            $paket->delete();
            return response()->json([
                'status' => 'success',
                'message' => 'Paket berhasil dihapus'
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage()
            ]);
        }
    }
}
