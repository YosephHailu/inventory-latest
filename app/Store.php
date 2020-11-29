<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    //
    protected $fillable = [
        'store_id',
        'name',
        'location',
        'photo'
    ];

    public function item()
    {
        return $this->hasMany('App\Item');
    }

    public function finishedGood()
    {
        return $this->hasMany('App\FinishedGood');
    }

    public function sparePart()
    {
        return $this->hasMany('App\SparePart');
    }
}
