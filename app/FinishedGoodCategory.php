<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FinishedGoodCategory extends Model
{
    //
    protected $fillable = [
        'id', 'category_id', 'category', 'created_at','updated_at'
    ];

    public function finishedGoodModel()
    {
        return $this->hasMany('App\FinishedGoodModel');
    }

    public function finishedGood()
    {
        return $this->hasManyThrough('App\FinishedGood', 'App\FinishedGoodModel');
    }
}
