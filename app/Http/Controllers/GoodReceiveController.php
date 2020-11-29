<?php

namespace App\Http\Controllers;

use App\GoodReceive;
use App\GoodReceiveCategory;
use App\Item;
use App\Store;
use App\Unit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class GoodReceiveController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
        $received_goods = GoodReceive::with(['supplier']);
        if ($request->q != null) {
            $received_goods->where('invoice_no', 'like', '%' . $request->q . '%')
                ->orWhere('good_receive_id', 'like', '%' . $request->q . '%');
        }
        return response()->json([
            'status' => 'success',
            'received_goods' => $received_goods->orderByDesc('updated_at')->paginate($request->itemsPerPage ?? 15),
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
        $good_receive = GoodReceive::create($request->all());

        return response()->json([
            'status' => 'success',
            'good_receive' => $good_receive
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\GoodReceive  $goodReceive
     * @return \Illuminate\Http\Response
     */
    public function show(GoodReceive $goodReceive, Request $request)
    {
        //
        $item_receive = $goodReceive->itemReceived();
        if ($request->q != null) {
            $item = Item::where('name', 'like', '%' . $request->q . '%')
                ->orWhere('item_id', 'like', '%' . $request->q . '%');
            $item_receive->whereIn('item_id', $item->pluck('id'));
        }
        return response()->json([
            'status' => 'success',
            'good_receive' => $goodReceive,
            'item_receive' => $item_receive->orderByDesc('updated_at')->get(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\GoodReceive  $goodReceive
     * @return \Illuminate\Http\Response
     */
    public function edit(GoodReceive $goodReceive)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\GoodReceive  $goodReceive
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, GoodReceive $goodReceive)
    {
        //

        $goodReceive->update([
            'good_receive_id' => $request->good_receive_id,
            'year' => $request->year,
            'month' => $request->month,
            'day' => $request->day,
            'pro_no' => $request->pro_no,
            'po_no' => $request->po_no,
            'invoice_no' => $request->invoice_no,
            'lc_no' => $request->lc_no,
            'supplier_id' => $request->supplier_id,
            'prepared_by' => $request->prepared_by,
            'approved_by' => $request->approved_by,
        ]);

        return response()->json([
            'status' => 'success',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\GoodReceive  $goodReceive
     * @return \Illuminate\Http\Response
     */
    public function destroy(GoodReceive $goodReceive)
    {
        //
        foreach ($goodReceive->itemReceived as $received) {
            $item = Item::find($received->item_id);
            $item->balance -= $received->quantity;
            $item->save();
        }

        $goodReceive->delete();

        return response()->json([
            'status' => 'success',
        ]);
    }
}
