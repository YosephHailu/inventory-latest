<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ItemReceived extends Model
{
    //
    protected $fillable = [
        'quantity',
        'item_price',
        'good_receive_id',
        'item_id'
    ];

    protected $with = ['item'];

    public function item()
    {
        return $this->belongsTo('App\Item');
    }

    public function goodReceive()
    {
        return $this->belongsTo('App\GoodReceive');
    }
}
