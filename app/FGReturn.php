<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FGReturn extends Model
{
    //
    protected $fillable = [
        'return_id', 'reason', 'year', 'month', 'day', 'shop_id'
    ];
    
    protected $with = ['shop'];
    
    public function fGReturnDetail()
    {
        return $this->hasMany('App\FGReturnDetail');
    }
    
    public function shop()
    {
        return $this->belongsTo('App\Shop');
    }
}
