<?php

namespace App\Http\Controllers;

use App\IssueItem;
use App\Item;
use App\ItemIssued;
use Exception;
use Illuminate\Http\Request;

class ItemIssuedController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //

        $item_issued = ItemIssued::with('issueItem');

        if ($request->q != null) {
            $items = Item::where('name', 'like', '%' . $request->q . '%')
                ->orWhere('item_id', 'like', '%' . $request->q . '%');
            $issue_item = IssueItem::where('issue_id', 'like', '%' . $request->q . '%');
            $item_issued->whereIn('item_id', $items->pluck('id'))->orWhereIn('issue_item_id', $issue_item->pluck('id'));
        }

        if ($request->section_id != null) {
            $issue_item = IssueItem::where('section_id', $request->section_id);

            $item_issued->whereIn('issue_item_id', $issue_item->pluck('id'))->get();
        }

        try {
            $date = json_decode($request->date);

            $issue_item = IssueItem::whereBetween('day', [$date->day_from, $date->day_to])
                ->whereBetween('month', [$date->month_from, $date->month_to])
                ->whereBetween('year', [$date->year_from, $date->year_to]);
            $item_issued->whereIn('issue_item_id', $issue_item->pluck('id'))->get();
        } catch (Exception $e) {
        };
        
        return response()->json([
            'status' => 'success',
            'item_issued' => $item_issued->orderByDesc('updated_at')->paginate($request->itemsPerPage ?? 15),
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
        $item = Item::find($request->item_id);

        $receivedQuantity = $item->itemReceived->sum('quantity') <= 0 ? 1 : $item->itemReceived->sum('quantity');
        $avg_price = $item->itemReceived->sum(function ($goodReceived) {
            return $goodReceived->quantity * $goodReceived->item_price;
        }) / $receivedQuantity;

        $request->request->add(['avg_price' => round($avg_price, 2)]);
        $issued = ItemIssued::create($request->all());
        $item_issued = ItemIssued::find($issued->id);

        $item->balance -= $request->quantity;
        $item->save();

        return response()->json([
            'status' => 'success',
            'item_issued' => $item_issued,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ItemIssued  $itemIssued
     * @return \Illuminate\Http\Response
     */
    public function show(ItemIssued $itemIssued)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\ItemIssued  $itemIssued
     * @return \Illuminate\Http\Response
     */
    public function edit(ItemIssued $itemIssued)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ItemIssued  $itemIssued
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $itemIssued)
    {
        //
        $itemIssued = ItemIssued::find($itemIssued);
        $item = Item::find($request->item_id);
        $receivedQuantity = $item->itemReceived->sum('quantity') <= 0 ? 1 : $item->itemReceived->sum('quantity');
        $avg_price = $item->itemReceived->sum(function ($goodReceived) {
            return $goodReceived->quantity * $goodReceived->item_price;
        }) / $receivedQuantity;

        $item->balance += $itemIssued->quantity;

        $itemIssued->update([
            'quantity' => $request->quantity,
            'avg_price' => round($avg_price, 2),
            'item_id' => $request->item_id
        ]);


        $item->balance -= $request->quantity;
        $item->save();

        return response()->json([
            'status' => 'success',
            'item_issued' => $itemIssued,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ItemIssued  $itemIssued
     * @return \Illuminate\Http\Response
     */
    public function destroy($itemIssued)
    {
        //
        $itemIssued = ItemIssued::find($itemIssued);

        $item = Item::find($itemIssued->item_id);
        $item->balance += $itemIssued->quantity;
        $item->save();

        $itemIssued->delete();

        return response()->json([
            'status' => 'success',
        ]);
    }
}
