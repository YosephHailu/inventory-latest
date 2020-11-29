<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    //
    protected $fillable = [
        'id', 'name', 'phone', 'address', 'email', 'beginning_date', 'ending_date', 'logo', 'created_at', 'updated_at'
    ];
}
