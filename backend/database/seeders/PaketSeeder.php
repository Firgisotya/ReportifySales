<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PaketSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('pakets')->insert([
            [
                'nama_paket' => 'Rumah A',
                'harga' => 1000000,
            ],
            [
                'nama_paket' => 'Rumah B',
                'harga' => 2000000,
            ],
            [
                'nama_paket' => 'Rumah C',
                'harga' => 3000000,
            ]
        ]);
    }
}
