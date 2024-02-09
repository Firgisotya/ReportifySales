<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CustomerRequest;
use App\Models\Customer;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CustomerController extends Controller
{
    use ApiResponse;
    public function index()
    {
        try {
            $customer = Customer::orderBy('id', 'asc')->get();
            return response()->json([
                'status' => 'success',
                'message' => 'Customer berhasil ditampilkan',
                'data' => $customer
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
    public function store(CustomerRequest $request)
    {
        try {
            $ktp_path = $request->file('foto_ktp')->store('ktp', 'public');
            $rumah_path = $request->file('foto_rumah')->store('rumah', 'public');
            $customer = Customer::create([
                'nama_customer' => $request->nama_customer,
                'no_telepon' => $request->no_telepon,
                'alamat' => $request->alamat,
                'foto_ktp' => $ktp_path,
                'foto_rumah' => $rumah_path,
            ]);
            return response()->json([
                'status' => 'success',
                'message' => 'Customer berhasil ditambahkan',
                'data' => $customer
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage()
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
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $customer = Customer::find($id);
            if (!$customer) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Customer tidak ditemukan'
                ]);
            }
            return response()->json([
                'status' => 'success',
                'message' => 'Customer berhasil ditampilkan',
                'data' => $customer
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
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function edit(Customer $customer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function update(CustomerRequest $request, $id)
    {
        try {
            $customer = Customer::findOrFail($id);

        // Update customer data
        $customer->nama_customer = $request->nama_customer;
        $customer->no_telepon = $request->no_telepon;
        $customer->alamat = $request->alamat;

        // Check and replace old photos if new ones are provided
        if ($request->hasFile('foto_ktp')) {
            // Delete old photo if it exists
            if ($customer->foto_ktp) {
                Storage::disk('public')->delete($customer->foto_ktp);
            }

            $ktp_path = $request->file('foto_ktp')->store('ktp', 'public');
            $customer->foto_ktp = $ktp_path;
        }

        if ($request->hasFile('foto_rumah')) {
            // Delete old photo if it exists
            if ($customer->foto_rumah) {
                Storage::disk('public')->delete($customer->foto_rumah);
            }

            $rumah_path = $request->file('foto_rumah')->store('rumah', 'public');
            $customer->foto_rumah = $rumah_path;
        }

        $customer->save();

            return response()->json([
                'status' => 'success',
                'message' => 'Customer berhasil diupdate',
                'data' => $customer
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
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $customer = Customer::where('id', $id)->delete();
            return response()->json([
                'status' => 'success',
                'message' => 'Customer berhasil dihapus',
                'data' => $customer
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage()
            ]);
        }
    }
}
