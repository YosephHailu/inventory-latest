<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FGIssue extends Model
{
    //
    protected $fillable = [
        'issue_id', 'year', 'month', 'day', 'shop_id'
    ];

    protected $with = ['shop'];
    protected $appends = ['total_price', 'total_quantity'];

    public function shop(){
        return $this->belongsTo('App\Shop');
    }

    public function fGIssueDetail()
    {
        return $this->hasMany('App\FGIssueDetail');
    }
    
    protected function getTotalPriceAttribute($value)
    {
        return $this->fGIssueDetail()->sum('avg_price');
    }
    
    protected function getTotalQuantityAttribute($value)
    {
        return $this->fGIssueDetail()->sum('quantity');
    }
}
