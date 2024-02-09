<?php

use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\api\CustomerController;
use App\Http\Controllers\api\PaketController;
use App\Http\Controllers\api\RoleController;
use App\Http\Controllers\api\SalesController;
use App\Http\Controllers\api\SalesTransactionController;
use App\Http\Controllers\api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('/auth')->group(function(){
    Route::post('/login', [AuthController::class, 'Login']);
});

Route::middleware('auth:sanctum')->group(function(){
    Route::prefix('/auth')->group(function(){
        Route::post('/logout', [AuthController::class, 'Logout']);
    });

    Route::apiResource('/users', UserController::class);
    Route::apiResource('/roles', RoleController::class);
    Route::apiResource('/paket', PaketController::class);
    Route::apiResource('/sales', SalesController::class);
    Route::apiResource('/customers', CustomerController::class);
    Route::apiResource('/sales-transaction', SalesTransactionController::class);
    Route::post('/sales-transaction/report/sales-transaction-by-range-date', [SalesTransactionController::class, 'ReportSalesByRangeDate']);
    Route::get('/sales-transaction/report/export-pdf', [SalesTransactionController::class, 'ReportAllSales']);
});
