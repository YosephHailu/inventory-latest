<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ShopFG extends Model
{
    //
    protected $fillable = [
        'quantity',
        'beginning_balance',
        'initial_balance',
        'finished_good_id',
        'shop_id',
    ];
    
    public function shop()
    {
        return $this->belongsTo('App\Shop');
    }
    
    public function fGSaleDetail()
    {
        return $this->hasMany('App\FGSaleDetail');
    }
    
    public function fGReturnDetail()
    {
        return $this->hasMany('App\FGReturnDetail');
    }

    public function finishedGood()
    {
        return $this->belongsTo('App\FinishedGood');
    }
}
