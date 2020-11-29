<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GoodReceive extends Model
{
    //
    protected $fillable = [
        'id', 'good_receive_id', 'year', 'month', 'day', 'pro_no', 'po_no', 'supplier_id', 'invoice_no', 'lc_no', 'prepared_by', 'approved_by', 'created_at', 'updated_at'
    ];

    protected $with = ['supplier'];
    protected $appends = ['total_price', 'total_quantity'];

    public function items()
    {
        return $this->belongsToMany('App\Item', 'item_good_receives')->withPivot('id', 'quantity', 'item_price');
    }

    public function supplier()
    {
        return $this->belongsTo('App\Supplier');
    }

    public function itemReceived()
    {
        return $this->hasMany('App\ItemReceived');
    }

    protected function getTotalPriceAttribute($value)
    {
        return $this->itemReceived()->sum('item_price');
    }
    
    protected function getTotalQuantityAttribute($value)
    {
        return $this->itemReceived()->sum('quantity');
    }
}
