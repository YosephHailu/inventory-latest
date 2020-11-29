<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    //
    protected $fillable = [
        'section_id',
        'name',
        'department_id',
    ];

    public function department()
    {
        return $this->belongsTo('App\Department');
    }
}
