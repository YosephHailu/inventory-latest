<?php

namespace App\Http\Controllers;

use App\FGReturn;
use App\FinishedGood;
use App\ShopFG;
use Illuminate\Http\Request;

class FGReturnController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
        $f_g_returns = FGReturn::with(['shop']);
        if ($request->q != null) {
            $f_g_returns->where('name', 'like', '%' . $request->q . '%')
                ->orWhere('issue_id', 'like', '%' . $request->q . '%');
        }

        if ($request->shop_id != null) {
            $f_g_returns->where('shop_id', $request->shop_id);
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
        $f_g_return = FGReturn::create($request->all());

        return response()->json([
            'status' => 'success',
            'f_g_return' => $f_g_return
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\FGReturn  $fGReturn
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $fGReturn)
    {
        //
        $fGReturn = FGReturn::find($fGReturn);
        //
        $f_g_return_detail = $fGReturn->fGReturnDetail();
        if ($request->q != null) {
            $finished_good = FinishedGood::where('name', 'like', '%' . $request->q . '%')
                ->orWhere('finished_good_id', 'like', '%' . $request->q . '%');
            $f_g_return_detail->whereIn('finished_good_id', $finished_good->pluck('id'));
        }
        return response()->json([
            'status' => 'success',
            'f_g_return' => $fGReturn,
            'f_g_return_detail' => $f_g_return_detail->orderByDesc('updated_at')->get(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\FGReturn  $fGReturn
     * @return \Illuminate\Http\Response
     */
    public function edit(FGReturn $fGReturn)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\FGReturn  $fGReturn
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $fGReturn)
    {
        //
        $fGReturn = FGReturn::find($fGReturn);
        $fGReturn->update($request->all());

        return response()->json([
            'status' => 'success',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\FGReturn  $fGReturn
     * @return \Illuminate\Http\Response
     */
    public function destroy($fGReturn)
    {
        //
        $fGReturn = FGReturn::find($fGReturn);
        foreach ($fGReturn->fGReturnDetail as $fGReturnDetail) {
            $shop_f_g = ShopFG::find($fGReturnDetail->shop_f_g_id);
            $shop_f_g->quantity += $fGReturnDetail->quantity;
            $shop_f_g->save();

            $finished_good = FinishedGood::find($shop_f_g->finished_good_id);
            $finished_good->balance -= $fGReturnDetail->quantity;
            $finished_good->save();

            $fGReturnDetail->delete();
        }

        $fGReturn->delete();

        return response()->json([
            'status' => 'success',
        ]);
    }
}
