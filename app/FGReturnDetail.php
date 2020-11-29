<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FGReturnDetail extends Model
{
    //
    protected $fillable = [
        'quantity', 'finished_good_id', 'price', 'f_g_return_id', 'shop_f_g_id'
    ];

    protected $with = ['finishedGood'];

    public function finishedGood()
    {
        return $this->belongsTo('App\FinishedGood');
    }

    public function fGReturn()
    {
        return $this->belongsTo('App\FGReturn');
    }
}
