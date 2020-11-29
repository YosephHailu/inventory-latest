<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ItemIssued extends Model
{
    //
    protected $fillable = [
        'quantity',
        'avg_price',
        'issue_item_id',
        'item_id'
    ];
    
    protected $with = ['item'];

    public function item()
    {
        return $this->belongsTo('App\Item');
    }

    public function issueItem()
    {
        return $this->belongsTo('App\IssueItem');
    }
}
