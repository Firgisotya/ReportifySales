<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SalesReportSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('sales_reports')->insert([
            [
                'sales_id' => 1,
                'customer_id' => 1,
                'paket_id' => 1,
                'tanggal_penjualan' => '2021-01-01',
                'total_harga' => 1000000,
            ],
            [
                'sales_id' => 2,
                'customer_id' => 2,
                'paket_id' => 2,
                'tanggal_penjualan' => '2021-01-02',
                'total_harga' => 2000000,
            ],
            [
                'sales_id' => 1,
                'customer_id' => 3,
                'paket_id' => 3,
                'tanggal_penjualan' => '2021-01-03',
                'total_harga' => 3000000,
            ]
        ]);
    }
}
