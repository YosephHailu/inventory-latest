<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FinishedGood extends Model
{
    //

    protected $fillable = [
        'id', 'finished_good_id', 'store_id', 'name', 'beginning_balance', 'initial_balance', 'size', 'minimum_balance', 'photo', 'location',
        'balance', 'finished_good_model_id', 'unit_id', 'created_at', 'updated_at'
    ];

    protected $with = ['finishedGoodModel'];

    public function Unit()
    {
        return $this->belongsTo('App\Unit');
    }
    public function finishedGoodModel()
    {
        return $this->belongsTo('App\FinishedGoodModel');
    }

    public function store()
    {
        return $this->belongsTo('App\Store');
    }
    
    public function fGReceiveDetail()
    {
        return $this->hasMany('App\fGReceiveDetail');
    }
    
    public function fGIssueDetail()
    {
        return $this->hasMany('App\fGIssueDetail');
    }
}
