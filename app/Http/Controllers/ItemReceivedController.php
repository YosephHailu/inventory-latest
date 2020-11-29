<?php

namespace App\Http\Controllers;

use App\GoodReceive;
use App\Item;
use App\ItemReceived;
use Exception;
use Illuminate\Http\Request;

class ItemReceivedController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //

        $item_received = ItemReceived::with('goodReceive');

        if ($request->q != null) {
            $items = Item::where('name', 'like', '%' . $request->q . '%')
                ->orWhere('item_id', 'like', '%' . $request->q . '%');
            $good_received = GoodReceive::where('good_receive_id', 'like', '%' . $request->q . '%');
            $item_received->whereIn('item_id', $items->pluck('id'))->orWhereIn('good_receive_id', $good_received->pluck('id'));
        }

        if ($request->supplier_id != null) {
            $good_received = GoodReceive::where('supplier_id', $request->supplier_id);

            $item_received->whereIn('good_receive_id', $good_received->pluck('id'));
        }

        try {
            $date = json_decode($request->date);

            $good_received = GoodReceive::whereBetween('day', [$date->day_from, $date->day_to])
                ->whereBetween('month', [$date->month_from, $date->month_to])
                ->whereBetween('year', [$date->year_from, $date->year_to]);
            $item_received->whereIn('good_receive_id', $good_received->pluck('id'));
        } catch (Exception $e) {
        };
        
        return response()->json([
            'status' => 'success',
            'item_received' => $item_received->orderByDesc('updated_at')->paginate($request->itemsPerPage ?? 15),
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

        $received = ItemReceived::create($request->all());
        $item = Item::find($request->item_id);
        $item->balance += $request->quantity;
        $item->save();
        $item_received = ItemReceived::find($received->id);

        return response()->json([
            'status' => 'success',
            'item_received' => $item_received,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ItemReceived  $itemReceived
     * @return \Illuminate\Http\Response
     */
    public function show(ItemReceived $itemReceived)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\ItemReceived  $itemReceived
     * @return \Illuminate\Http\Response
     */
    public function edit(ItemReceived $itemReceived)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ItemReceived  $itemReceived
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,  $itemReceived)
    {
        //
        $itemReceived = ItemReceived::find($itemReceived);

        $item = Item::find($request->item_id);
        $item->balance -= $itemReceived->quantity;

        $itemReceived->update($request->all());

        $item->balance += $request->quantity;
        $item->save();

        return response()->json([
            'status' => 'success',
            'item_received' => $itemReceived,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ItemReceived  $itemReceived
     * @return \Illuminate\Http\Response
     */
    public function destroy($itemReceived)
    {
        //
        $itemReceived = ItemReceived::find($itemReceived);

        $item = Item::find($itemReceived->item_id);
        $item->balance -= $itemReceived->quantity;
        $item->save();

        $itemReceived->delete();
        return response()->json([
            'status' => 'success',
        ]);
    }
}
