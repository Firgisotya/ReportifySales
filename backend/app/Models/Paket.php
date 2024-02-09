<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paket extends Model
{
    use HasFactory;
    protected $table = 'pakets';
    protected $guarded = ['id'];

    public function salesReport()
    {
        return $this->hasMany(SalesReport::class);
    }
}
