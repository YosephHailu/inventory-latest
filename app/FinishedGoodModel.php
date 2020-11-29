<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FinishedGoodModel extends Model
{
    //

    protected $fillable = [
        'id', 'model_id', 'model', 'finished_good_category_id', 'created_at', 'updated_at'
    ];


    public function finishedGoodCategory()
    {
        return $this->belongsTo('App\FinishedGoodCategory');
    }

    public function finishedGood()
    {
        return $this->hasMany('App\FinishedGood');
    }


    public function finishedGoodSaleDetail()
    {
        return $this->hasManyThrough('App\FinishedGoodSaleDetail', 'App\FinishedGood');
    }
}
