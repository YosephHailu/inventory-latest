<?php

namespace App\Http\Controllers;

use App\FGIssue;
use App\FGIssueDetail;
use App\ShopFG;
use Illuminate\Http\Request;

class ShopFGController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ShopFG  $shopFG
     * @return \Illuminate\Http\Response
     */
    public function show($shopFG)
    {
        //
       return $shopFG = ShopFG::find($shopFG);
        $f_g_issue = FGIssue::where('shop_id', $shopFG->shop_id)->get();
       return $f_g_received_count = FGIssueDetail::whereIn('f_g_issue_id', $f_g_issue->pluck('id'))
            ->where('finished_good_id', $shopFG->finished_good_id)->get();

        $f_g_received_price = FGIssueDetail::whereIn('f_g_issue_id', $f_g_issue->pluck('id'))
            ->where('finished_good_id', $shopFG->finished_good_id)->get()->sum(function ($item_received) {
                    return $item_received->quantity * $item_received->avg_price;
                });
        return response()->json([
            'status' => 'success',
            'shop_f_g' => $shopFG,
            'f_g_received_count' => $f_g_received_count,
            // 'f_g_issued_count' => $shopFG->fGIssueDetail->sum('quantity'),

            'f_g_received_price' => $f_g_received_price,
            // 'f_g_issued_price' => $shopFG->fGIssueDetail->sum(function ($item_issued) {
            //     return $item_issued->quantity * $item_issued->avg_price;
            // }),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\ShopFG  $shopFG
     * @return \Illuminate\Http\Response
     */
    public function edit(ShopFG $shopFG)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ShopFG  $shopFG
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ShopFG $shopFG)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ShopFG  $shopFG
     * @return \Illuminate\Http\Response
     */
    public function destroy(ShopFG $shopFG)
    {
        //
    }
}
