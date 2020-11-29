<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FGSaleDetail extends Model
{
    //
    protected $fillable = [
        'id', 'quantity', 'finished_good_id', 'price', 'f_g_sale_id', 'shop_f_g_id', 'created_at', 'updated_at'
    ];

    protected $with = ['finishedGood'];

    public function finishedGood()
    {
        return $this->belongsTo('App\FinishedGood');
    }

    public function fGSale()
    {
        return $this->belongsTo('App\FGSale');
    }
}
