<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    //
    protected $fillable = [
        'id', 'item_id', 'name', 'balance', 'location', 'beginning_balance', 'store_id', 'initial_balance',
        'unit_id', 'photo', 'min_balance', 'item_category_id', 'created_at', 'updated_at'
    ];

    protected $with = ['itemCategory', 'unit', 'store'];

    public function itemCategory()
    {
        return $this->belongsTo('App\ItemCategory');
    }

    public function store()
    {
        return $this->belongsTo('App\Store');
    }

    public function unit()
    {
        return $this->belongsTo('App\Unit');
    }

    public function itemReceived()
    {
        return $this->hasMany('App\ItemReceived');
    }

    public function itemIssued()
    {
        return $this->hasMany('App\ItemIssued');
    }

}
