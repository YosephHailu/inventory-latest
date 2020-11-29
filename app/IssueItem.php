<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class IssueItem extends Model
{
    //
    protected $fillable = [
        'issue_id', 'year', 'month', 'day', 'request_no', 'remark', 'issued_by', 'approved_by', 'received_by', 'section_id'
    ];

    protected $with = ['section'];
    protected $appends = ['total_price', 'total_quantity'];

    public function section()
    {
        return $this->belongsTo('App\Section');
    }

    public function itemIssued()
    {
        return $this->hasMany('App\ItemIssued');
    }
    
    protected function getTotalPriceAttribute($value)
    {
        return $this->itemIssued()->sum('avg_price');
    }
    
    protected function getTotalQuantityAttribute($value)
    {
        return $this->itemIssued()->sum('quantity');
    }
}
