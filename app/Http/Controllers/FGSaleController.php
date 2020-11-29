<?php

namespace App\Http\Controllers;

use App\FGSale;
use App\FinishedGood;
use App\ShopFG;
use Illuminate\Http\Request;

class FGSaleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
        $f_g_sales = FGSale::with(['shop']);
        if ($request->q != null) {
            $f_g_sales->where('name', 'like', '%' . $request->q . '%')
                ->orWhere('issue_id', 'like', '%' . $request->q . '%');
        }

        if ($request->shop_id != null) {
            $f_g_sales->where('shop_id', $request->shop_id);
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
        $f_g_sale = FGSale::create($request->all());

        return response()->json([
            'status' => 'success',
            'f_g_sale' => $f_g_sale
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\FGSale  $fGSale
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $fGSale)
    {
        //
        $fGSale = FGSale::find($fGSale);
        //
        $f_g_sale_detail = $fGSale->fGSaleDetail();
        if ($request->q != null) {
            $finished_good = FinishedGood::where('name', 'like', '%' . $request->q . '%')
                ->orWhere('finished_good_id', 'like', '%' . $request->q . '%');
            $f_g_sale_detail->whereIn('finished_good_id', $finished_good->pluck('id'));
        }
        return response()->json([
            'status' => 'success',
            'f_g_sale' => $fGSale,
            'f_g_sale_detail' => $f_g_sale_detail->orderByDesc('updated_at')->get(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\FGSale  $fGSale
     * @return \Illuminate\Http\Response
     */
    public function edit(FGSale $fGSale)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\FGSale  $fGSale
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $fGSale)
    {
        //
        $fGSale = FGSale::find($fGSale);
        $fGSale->update($request->all());

        return response()->json([
            'status' => 'success',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\FGSale  $fGSale
     * @return \Illuminate\Http\Response
     */
    public function destroy($fGSale)
    {
        //
        $fGSale = FGSale::find($fGSale);
        foreach ($fGSale->fGSaleDetail as $fGSaleDetail) {
            $shop_f_g = ShopFG::find($fGSaleDetail->shop_f_g_id);
            $shop_f_g->quantity += $fGSaleDetail->quantity;
            $shop_f_g->save();
            $fGSaleDetail->delete();
        }

        $fGSale->delete();

        return response()->json([
            'status' => 'success',
        ]);
    }
}
