<?php

namespace App\Http\Controllers;

use App\FGSale;
use App\FGSaleDetail;
use App\FinishedGood;
use App\ShopFG;
use Illuminate\Http\Request;

class FGSaleDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
        $f_g_sales = FGSaleDetail::with('fGIssue');

        if ($request->q != null) {
            $finished_good = FinishedGood::where('name', 'like', '%' . $request->q . '%')
                ->orWhere('finished_good_id', 'like', '%' . $request->q . '%');
            $f_g_issue = FGSale::where('issue_id', 'like', '%' . $request->q . '%');
            $f_g_sales->whereIn('finished_good_id', $finished_good->pluck('id'))->orWhereIn('f_g_issue_id', $f_g_issue->pluck('id'));
        }

        if ($request->shop_id != null) {
            $f_g_issue = FGSale::where('shop_id', $request->shop_id);
            $f_g_sales->whereIn('f_g_issue_id', $f_g_issue->pluck('id'))->get();
        }

        return response()->json([
            'status' => 'success',
            'f_g_sales' => $f_g_sales->paginate($request->itemsPerPage ?? 15),
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
        $f_g_sale = FGSale::find($request->f_g_sale_id);
        $shop_f_g = ShopFG::find($request->shop_f_g_id);

        $request->request->add(['finished_good_id' => $shop_f_g->finished_good_id]);

        $sold = FGSaleDetail::create($request->all());
        $f_g_sale_detail = FGSaleDetail::find($sold->id);

        $shop_f_g->quantity -= $request->quantity;
        $shop_f_g->save();

        return response()->json([
            'status' => 'success',
            'f_g_sale_detail' => $f_g_sale_detail,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\FGSaleDetail  $fGSaleDetail
     * @return \Illuminate\Http\Response
     */
    public function show(FGSaleDetail $fGSaleDetail)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\FGSaleDetail  $fGSaleDetail
     * @return \Illuminate\Http\Response
     */
    public function edit(FGSaleDetail $fGSaleDetail)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\FGSaleDetail  $fGSaleDetail
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $fGSaleDetail)
    {
        //
        $fGSaleDetail = FGSaleDetail::find($fGSaleDetail);
        $f_g_sale = FGSale::find($request->f_g_sale_id);
        $shop_f_g = ShopFG::find($request->shop_f_g_id);

        $shop_f_g->quantity += $fGSaleDetail->quantity;
        $shop_f_g->save();

        $request->request->add(['finished_good_id' => $shop_f_g->finished_good_id]);

        $fGSaleDetail->update($request->all());

        $shop_f_g->quantity -= $request->quantity;
        $shop_f_g->save();

        return response()->json([
            'status' => 'success',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\FGSaleDetail  $fGSaleDetail
     * @return \Illuminate\Http\Response
     */
    public function destroy($fGSaleDetail)
    {
        //    
        $fGSaleDetail = FGSaleDetail::find($fGSaleDetail);
        $shop_f_g = ShopFG::find($fGSaleDetail->shop_f_g_id);
        $shop_f_g->quantity += $fGSaleDetail->quantity;
        $shop_f_g->save();

        $fGSaleDetail->delete();

        return response()->json([
            'status' => 'success',
        ]);
    }
}
