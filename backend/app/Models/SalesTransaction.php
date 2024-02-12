<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SalesTransaction extends Model
{
    use HasFactory;

    protected $table = 'sales_transactions';
    protected $fillable = [
        'transaction_id',
        'sales_id',
        'customer_id',
        'paket_id',
        'tanggal_penjualan',
        'total_harga'
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function sales()
    {
        return $this->belongsTo(Sales::class);
    }

    public function paket()
    {
        return $this->belongsTo(Paket::class);
    }
}
