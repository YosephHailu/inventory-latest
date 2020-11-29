<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FGSale extends Model
{
    //
    protected $fillable = [
        'sale_id', 'to', 'year', 'month', 'day', 'shop_id'
    ];

    protected $with = ['shop'];
    protected $appends = ['date'];

    public function fGSaleDetail()
    {
        return $this->hasMany('App\FGSaleDetail');
    }

    public function shop()
    {
        return $this->belongsTo('App\Shop');
    }

    public function getDateAttribute()
    {
        return $this->day . "-" . $this->month . "-" . $this->year;
    }
}
