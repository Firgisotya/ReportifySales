<?php

namespace App\Http\Controllers;

use App\Http\Requests\RangeDateRequest;
use App\Http\Requests\SalesTransactionRequest;
use App\Models\SalesReport;
use App\Models\SalesTransaction;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class SalesTransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $salesReport = SalesTransaction::with('sales', 'customer', 'paket')->orderBy('id', 'desc')->get();
            return response()->json([
                'status' => 'success',
                'message' => 'Sales Report berhasil ditampilkan',
                'data' => $salesReport
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage()
            ]);
        }
    }

    public function ReportSalesByRangeDate(RangeDateRequest $request)
    {
        try {
            $startDate = Carbon::parse($request->start_date);
            $endDate = Carbon::parse($request->end_date);
            $salesReport = SalesTransaction::with('sales', 'customer', 'paket')
                ->whereBetween('tanggal_penjualan', [$startDate, $endDate])
                ->orderBy('id', 'desc')
                ->get();

            return response()->json([
                'status' => 'success',
                'message' => 'Sales Report berhasil ditampilkan',
                'data' => $salesReport
            ]);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage()
            ]);
        }
    }

    public function ReportAllSales()
    {
        try {
            $salesReport = SalesTransaction::with('sales', 'customer', 'paket')->orderBy('id', 'desc')->get();

            $summedReport = $salesReport->groupBy('sales_id')->map(function ($groupedSales) {
            $totalPaket = $groupedSales->unique('paket_id')->count();
            $totalCustomer = $groupedSales->unique('customer_id')->count();
            $totalPrice = $groupedSales->sum('total_harga');

            return [
                'sales_id' => $groupedSales->first()->sales_id,
                'total_paket' => $totalPaket,
                'total_customer' => $totalCustomer,
                'total_pendapatan' => $totalPrice,
            ];
        });

        return response()->json([
            'status' => 'success',
            'message' => 'Sales Report berhasil ditampilkan',
            'data' => $summedReport->values()->all(),
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
    public function store(SalesTransactionRequest $request)
    {
        try {
            $validate = $request->validated();
            $latest = SalesTransaction::orderBy('transaction_id', 'DESC')->first();
            $id_number = $latest ? (int)substr($latest->transaction_id, 6) + 1 : 1;
            $id = 'TRX' . str_pad($id_number, 4, '0', STR_PAD_LEFT);

            SalesTransaction::create([
                'transaction_id' => $id,
                'id_sales' => Auth::user()->id,
                'id_customer' => $request->id_customer,
                'id_paket' => $request->id_paket,
                'tanggal_penjualan' => Carbon::now(),
                'total_harga' => $request->total_harga,
            ]);

            $response = SalesTransaction::with('sales', 'customer', 'paket')->where('transaction_id', $id)->first();

            return response()->json([
                'status' => 'success',
                'message' => 'Sales Report berhasil ditambahkan',
                'data' => $response
            ]);
        } catch (\Throwable $th) {
            return $this->apiError(
                $th->getMessage(),
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }

    }


    public function show($id)
    {
        try {
            $response = SalesTransaction::find($id);
            if ($response == null) {
                return $this->apiError(
                    'Data not found',
                    Response::HTTP_NOT_FOUND
                );
            }
            return $this->apiSuccess($response);
        } catch (\Throwable $th) {
            return $this->apiError(
                $th->getMessage(),
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }


    public function edit($id)
    {
        //
    }


    public function update(SalesTransactionRequest $request, $id)
    {
        try {
            $validated = $request->validated();
            $response = SalesTransaction::find($id);
            if ($response == null) {
                return $this->apiError(
                    'Data not found',
                    Response::HTTP_NOT_FOUND
                );
            }
            $response->update($validated);
            return $this->apiSuccess($response, Response::HTTP_OK);
        } catch (\Throwable $th) {
            return $this->apiError(
                $th->getMessage(),
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }


    public function destroy($id)
    {
        try{
            $response = SalesTransaction::find($id);
            if($response == null){
                return $this->apiError(
                    'Data not found',
                    Response::HTTP_NOT_FOUND
                );
            }
            $response->delete();
            return $this->apiSuccess($response, Response::HTTP_OK);
        } catch(\Throwable $th){
            return $this->apiError(
                $th->getMessage(),
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }
}
