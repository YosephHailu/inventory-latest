<?php

namespace App\Http\Controllers;

use App\Config;
use App\FinishedGood;
use App\FinishedGoodModel;
use App\Shop;
use App\Unit;
use Illuminate\Http\Request;

class FinishedGoodHelperController extends Controller
{
    //
    public function finishedGoodOptions(Request $request)
    {
        $units = Unit::All();
        $finished_good_models = FinishedGoodModel::All();

        return response()->json([
            'units' => $units,
            'finished_good_models' => $finished_good_models,
        ]);
    }

    public function finishedGoodReceived(Request $request, FinishedGood $finishedGood)
    {
        $finished_good_received = $finishedGood->fGReceiveDetail()->with(['fGReceive.department']);

        return response()->json([
            'finished_good_received' => $finished_good_received->paginate($request->itemsPerPage ?? 15),
        ]);
    }
    
    public function finishedGoodIssued(Request $request, FinishedGood $finishedGood)
    {
        $finished_good_issued = $finishedGood->fGIssueDetail()->with(['fGIssue.shop']);

        return response()->json([
            'finished_good_issued' => $finished_good_issued->paginate($request->itemsPerPage ?? 15),
        ]);
    }
    
    public function shopFinishedGoods(Request $request, Shop $shop)
    {
        $finished_good_issued = $shop->fGIssueDetail()->with(['fGIssue.shop']);

        return response()->json([
            'finished_good_issued' => $finished_good_issued->paginate($request->itemsPerPage ?? 15),
        ]);
    }
}
