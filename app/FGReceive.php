<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FGReceive extends Model
{
    //
    protected $fillable = [
        'receive_id', 'year', 'month', 'day', 'department_id'
    ];

    protected $with = ['department'];
    protected $appends = ['total_price', 'total_quantity'];
    
    public function fGReceiveDetail()
    {
        return $this->hasMany('App\fGReceiveDetail');
    }

    public function department()
    {
        return $this->belongsTo('App\Department');
    }

    protected function getTotalPriceAttribute($value)
    {
        return $this->fGReceiveDetail()->sum('cost');
    }
    
    protected function getTotalQuantityAttribute($value)
    {
        return $this->fGReceiveDetail()->sum('quantity');
    }
}
