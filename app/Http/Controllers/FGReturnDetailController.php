<?php

namespace App\Http\Controllers;

use App\FGReturn;
use App\FGReturnDetail;
use App\FinishedGood;
use App\ShopFG;
use Illuminate\Http\Request;

class FGReturnDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
        $f_g_returns = FGReturnDetail::with('fGIssue');

        if ($request->q != null) {
            $finished_good = FinishedGood::where('name', 'like', '%' . $request->q . '%')
                ->orWhere('finished_good_id', 'like', '%' . $request->q . '%');
            $f_g_issue = FGReturn::where('issue_id', 'like', '%' . $request->q . '%');
            $f_g_returns->whereIn('finished_good_id', $finished_good->pluck('id'))->orWhereIn('f_g_issue_id', $f_g_issue->pluck('id'));
        }

        if ($request->shop_id != null) {
            $f_g_issue = FGReturn::where('shop_id', $request->shop_id);
            $f_g_returns->whereIn('f_g_issue_id', $f_g_issue->pluck('id'))->get();
        }

        return response()->json([
            'status' => 'success',
            'f_g_returns' => $f_g_returns->paginate($request->itemsPerPage ?? 15),
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
        $f_g_return = FGReturn::find($request->f_g_return_id);
        $shop_f_g = ShopFG::find($request->shop_f_g_id);

        $request->request->add(['finished_good_id' => $shop_f_g->finished_good_id]);

        $returned = FGReturnDetail::create($request->all());
        $f_g_return_detail = FGReturnDetail::find($returned->id);

        $shop_f_g->quantity -= $request->quantity;
        $shop_f_g->save();

        $finished_good = FinishedGood::find($shop_f_g->finished_good_id);
        $finished_good->balance += $request->quantity;
        $finished_good->save();

        return response()->json([
            'status' => 'success',
            'f_g_return_detail' => $f_g_return_detail,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\FGReturnDetail  $fGReturnDetail
     * @return \Illuminate\Http\Response
     */
    public function show(FGReturnDetail $fGReturnDetail)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\FGReturnDetail  $fGReturnDetail
     * @return \Illuminate\Http\Response
     */
    public function edit(FGReturnDetail $fGReturnDetail)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\FGReturnDetail  $fGReturnDetail
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $fGReturnDetail)
    {
        //
        $fGReturnDetail = FGReturnDetail::find($fGReturnDetail);
        $f_g_return = FGReturn::find($request->f_g_return_id);
        $shop_f_g = ShopFG::find($request->shop_f_g_id);
        $finished_good = FinishedGood::find($shop_f_g->finished_good_id);

        $shop_f_g->quantity += $fGReturnDetail->quantity;
        $shop_f_g->save();
        
        $finished_good->balance -= $fGReturnDetail->quantity;
        $finished_good->save();

        $request->request->add(['finished_good_id' => $shop_f_g->finished_good_id]);

        $fGReturnDetail->update($request->all());

        $shop_f_g->quantity -= $request->quantity;
        $shop_f_g->save();

        $finished_good->balance += $request->quantity;
        $finished_good->save();

        return response()->json([
            'status' => 'success',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\FGReturnDetail  $fGReturnDetail
     * @return \Illuminate\Http\Response
     */
    public function destroy($fGReturnDetail)
    {
        //    
        $fGReturnDetail = FGReturnDetail::find($fGReturnDetail);
        $shop_f_g = ShopFG::find($fGReturnDetail->shop_f_g_id);
        $shop_f_g->quantity += $fGReturnDetail->quantity;
        $shop_f_g->save();
        
        $finished_good = FinishedGood::find($shop_f_g->finished_good_id);
        $finished_good->balance -= $fGReturnDetail->quantity;
        $finished_good->save();

        $fGReturnDetail->delete();

        return response()->json([
            'status' => 'success',
        ]);
    }
}
