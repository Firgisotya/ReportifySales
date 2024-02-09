<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            [
                'nik' => '0000',
                'role_id' => 1,
                'password' => bcrypt('password'),
            ],
            [
                'nik' => '0001',
                'role_id' => 2,
                'password' => bcrypt('password'),
            ],
            [
                'nik' => '0002',
                'role_id' => 2,
                'password' => bcrypt('password'),
            ]
        ]);
    }
}
