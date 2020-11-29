<?php

namespace App\Http\Controllers;

use App\FGIssue;
use App\FGIssueDetail;
use App\FGReceive;
use App\FinishedGood;
use App\Shop;
use App\ShopFG;
use Exception;
use Illuminate\Http\Request;

class FGIssueDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //

        $f_g_issued = FGIssueDetail::with('fGIssue');

        if ($request->q != null) {
            $finished_good = FinishedGood::where('name', 'like', '%' . $request->q . '%')
                ->orWhere('finished_good_id', 'like', '%' . $request->q . '%');
            $f_g_issue = FGIssue::where('issue_id', 'like', '%' . $request->q . '%');
            $f_g_issued->whereIn('finished_good_id', $finished_good->pluck('id'))->orWhereIn('f_g_issue_id', $f_g_issue->pluck('id'));
        }

        if ($request->shop_id != null) {
            $f_g_issue = FGIssue::where('shop_id', $request->shop_id);

            $f_g_issued->whereIn('f_g_issue_id', $f_g_issue->pluck('id'))->get();
        }

        try {
            $date = json_decode($request->date);

            $f_g_receive = FGIssue::whereBetween('day', [$date->day_from, $date->day_to])
                ->whereBetween('month', [$date->month_from, $date->month_to])
                ->whereBetween('year', [$date->year_from, $date->year_to]);
            $f_g_issued->whereIn('f_g_issue_id', $f_g_receive->pluck('id'))->get();
        } catch (Exception $e) {
        };

        return response()->json([
            'status' => 'success',
            'f_g_issued' => $f_g_issued->paginate($request->itemsPerPage ?? 15),
        ]);
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
        $finished_good = FinishedGood::find($request->finished_good_id);

        $avg_price = $finished_good->fGReceiveDetail->sum('cost') / $finished_good->fGReceiveDetail->count();

        $request->request->add(['avg_price' => round($avg_price, 2)]);
        $issued = FGIssueDetail::create($request->all());
        $f_g_issue_detail = FGIssueDetail::find($issued->id);

        $finished_good->balance -= $request->quantity;
        $finished_good->save();

        $shop_f_g  = ShopFG::where('shop_id', $f_g_issue_detail->fGIssue->shop->id)
            ->where('finished_good_id', $finished_good->id)->get();
        if ($shop_f_g->first() == null) {
            ShopFG::Create(
                [
                    'finished_good_id' => $finished_good->id,
                    'quantity' => $request->quantity,
                    'shop_id' => $f_g_issue_detail->fGIssue->shop->id,
                    'beginning_balance' => $request->quantity,
                ]
            );
        } else {
            $shop_f_g = $shop_f_g->first();
            $shop_f_g->update(
                [
                    'finished_good_id' => $finished_good->id,
                    'quantity' => $shop_f_g->quantity + $request->quantity,
                    'shop_id' => $f_g_issue_detail->fGIssue->shop->id,
                ]
            );
        }

        return response()->json([
            'status' => 'success',
            'f_g_issue_detail' => $f_g_issue_detail,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\FGIssueDetail  $fGIssueDetail
     * @return \Illuminate\Http\Response
     */
    public function show(FGIssueDetail $fGIssueDetail)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\FGIssueDetail  $fGIssueDetail
     * @return \Illuminate\Http\Response
     */
    public function edit(FGIssueDetail $fGIssueDetail)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\FGIssueDetail  $fGIssueDetail
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $fGIssueDetail)
    {
        //
        $fGIssueDetail = FGIssueDetail::find($fGIssueDetail);
        $finished_good = FinishedGood::find($request->finished_good_id);

        $avg_price = $finished_good->fGReceiveDetail->sum('cost') / $finished_good->fGReceiveDetail->count();

        $finished_good->balance += $fGIssueDetail->quantity;

        //Substitute previous balance from Shop store
        $shop_f_g  = ShopFG::where('shop_id', $fGIssueDetail->fGIssue->shop->id)
            ->where('finished_good_id', $finished_good->id)->get();
        if ($shop_f_g->first() != null) {
            $shop_f_g = $shop_f_g->first();
            $shop_f_g->update(
                [
                    'quantity' => $shop_f_g->quantity - $fGIssueDetail->quantity,
                ]
            );
        }

        $fGIssueDetail->update([
            'quantity' => $request->quantity,
            'avg_price' => round($avg_price, 2),
            'item_id' => $request->item_id
        ]);


        $finished_good->balance -= $request->quantity;
        $finished_good->save();

        if ($shop_f_g->first() == null) {
            ShopFG::Create(
                [
                    'finished_good_id' => $finished_good->id,
                    'quantity' => $request->quantity,
                    'shop_id' => $fGIssueDetail->fGIssue->shop->id,
                    'beginning_balance' => $request->quantity,
                ]
            );
        } else {
            $shop_f_g = $shop_f_g->first();
            $shop_f_g->update(
                [
                    'finished_good_id' => $finished_good->id,
                    'quantity' => $shop_f_g->quantity + $request->quantity,
                    'shop_id' => $fGIssueDetail->fGIssue->shop->id,
                ]
            );
        }

        return response()->json([
            'status' => 'success',
            'f_g_issue_detail' => $fGIssueDetail,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\FGIssueDetail  $fGIssueDetail
     * @return \Illuminate\Http\Response
     */
    public function destroy($fGIssueDetail)
    {
        //        

        $fGIssueDetail = FGIssueDetail::find($fGIssueDetail);
        $finished_good = FinishedGood::find($fGIssueDetail->finished_good_id);
        $finished_good->balance += $fGIssueDetail->quantity;
        $finished_good->save();

        $shop_f_g  = ShopFG::where('shop_id', $fGIssueDetail->fGIssue->shop_id)
            ->where('finished_good_id', $finished_good->id)->get();
        if ($shop_f_g->first() != null) {
            $shop_f_g = $shop_f_g->first();
            $shop_f_g->update(
                [
                    'quantity' => $shop_f_g->quantity - $fGIssueDetail->quantity,
                ]
            );
        }

        $fGIssueDetail->delete();

        return response()->json([
            'status' => 'success',
        ]);
    }
}
