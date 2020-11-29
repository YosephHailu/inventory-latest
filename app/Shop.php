<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Shop extends Model
{
    //
    protected $fillable = [
        'shop_id', 'name', 'manager', 'location', 'photo'
    ];
    
    /**
     * Get all of the Detail for the ISSUED FinishedGOOD.
     */
    
    public function fGIssue()
    {
        return $this->hasMany('App\FGIssue');
    }

    public function fGSale()
    {
        return $this->hasMany('App\FGSale');
    }

    public function fGReturn()
    {
        return $this->hasMany('App\FGReturn');
    }

    public function shopFG()
    {
        return $this->hasMany('App\ShopFG');
    }
}
