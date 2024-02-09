<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SalesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('sales')->insert([
           [
            'nik' => '0001',
            'nama_sales' => 'Firgiawan',
            'password' => bcrypt('password'),
           ],
           [
            'nik' => '0002',
            'nama_sales' => 'Fauzi',
            'password' => bcrypt('password'),
           ]
        ]);
    }
}
