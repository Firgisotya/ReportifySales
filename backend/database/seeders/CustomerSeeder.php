<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('customers')->insert([
            [
                'nama_customer' => 'firgi',
                'no_telepon' => '081234567890',
                'alamat' => 'Jl. Jalan No. 1',
                'foto_ktp' => 'ktp.jpg',
                'foto_rumah' => 'rumah.jpg',
            ],
            [
                'nama_customer' => 'fauzi',
                'no_telepon' => '081234567891',
                'alamat' => 'Jl. Jalan No. 2',
                'foto_ktp' => 'ktp.jpg',
                'foto_rumah' => 'rumah.jpg',
            ],
            [
                'nama_customer' => 'fauzan',
                'no_telepon' => '081234567892',
                'alamat' => 'Jl. Jalan No. 3',
                'foto_ktp' => 'ktp.jpg',
                'foto_rumah' => 'rumah.jpg',
            ]
        ]);
    }
}
