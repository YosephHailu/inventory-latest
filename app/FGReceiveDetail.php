<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FGReceiveDetail extends Model
{
    //
    protected $fillable = [
        'quantity', 'cost', 'finished_good_id', 'unit_id', 'f_g_receive_id'
    ];

    protected $with = ['finishedGood'];
    
    public function finishedGood()
    {
        return $this->belongsTo('App\FinishedGood');
    }

    public function Unit()
    {
        return $this->belongsTo('App\Unit');
    }

    public function fGReceive()
    {
        return $this->belongsTo('App\FGReceive');
    }
}
