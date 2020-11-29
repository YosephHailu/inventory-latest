<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    //
    protected $fillable = [
        'id', 'supplier_id', 'name', 'tin_no', 'created_at', 'updated_at'
    ];

    public function goodReceived()
    {
        return $this->hasMany('App\GoodReceived');
    }
}
