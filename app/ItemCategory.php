<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ItemCategory extends Model
{
    //
    protected $fillable = [
        'category_id',
        'category'
    ];
}
