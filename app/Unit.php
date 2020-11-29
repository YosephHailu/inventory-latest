<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Unit extends Model
{
    //
    protected $fillable = ['name'];

    
    protected $casts = [
        'created_at' => 'datetime',
    ];
    protected function getCreatedAtAttribute($value) {
        return \Carbon\Carbon::parse($value)->format('D-M-Y');
    }
}
