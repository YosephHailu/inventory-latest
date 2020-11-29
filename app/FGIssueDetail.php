<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FGIssueDetail extends Model
{
    //
    protected $fillable = [
        'quantity', 'avg_price', 'finished_good_id', 'f_g_issue_id'
    ];
    
    protected $with = ['finishedGood'];

    public function finishedGood()
    {
        return $this->belongsTo('App\FinishedGood');
    }

    public function fGIssue()
    {
        return $this->belongsTo('App\FGIssue');
    }

}
