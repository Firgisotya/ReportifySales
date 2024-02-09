<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SalesTransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('sales_transactions')->insert([
            [
                'transaction_id' => 'TRX0001',
                'sales_id' => 1,
                'customer_id' => 1,
                'paket_id' => 1,
                'tanggal_penjualan' => '2021-01-01',
                'total_harga' => 1000000,
            ],
            [
                'transaction_id' => 'TRX0002',
                'sales_id' => 2,
                'customer_id' => 2,
                'paket_id' => 2,
                'tanggal_penjualan' => '2021-01-02',
                'total_harga' => 2000000,
            ],
            [
                'transaction_id' => 'TRX0003',
                'sales_id' => 1,
                'customer_id' => 3,
                'paket_id' => 3,
                'tanggal_penjualan' => '2021-01-03',
                'total_harga' => 3000000,
            ]
        ]);
    }
}
