<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Config extends Model
{
    //
    protected $fillable = [
        'grn_start',
        'grn_end',
        'issue_start',
        'issue_end'
    ];
}
