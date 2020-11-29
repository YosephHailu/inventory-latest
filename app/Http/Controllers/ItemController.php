<?php

namespace App\Http\Controllers;

use App\Item;
use App\ItemCategory;
use App\Store;
use App\Unit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
        $items = Item::query();

        if ($request->q != null) {
            $items->where('name', 'like', '%' . $request->q . '%')
                ->orWhere('item_id', 'like', '%' . $request->q . '%');
        }

        if ($request->sortBy != null && $request->sortBy != "undefined") {
            $items->orderByDesc($request->sortBy);
        }

        if ($request->category_id != null) {
            $items->where('item_category_id', $request->category_id);
        }

        return response()->json([
            'status' => 'success',
            'items' => $items->orderByDesc('updated_at')->paginate($request->itemsPerPage ?? 15),
        ]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function items(Request $request)
    {
        //
        $items = Item::query();
        if ($request->q != null) {
            $items->where('name', 'like', '%' . $request->q . '%')
                ->orWhere('item_id', 'like', '%' . $request->q . '%');
        }

        if ($request->item_category_id != null) {
            $items->where('item_category_id', $request->item_category_id);
        }
        return response()->json([
            'status' => 'success',
            'items' => $items->get(),
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

        if ($request->hasFile('picture')) {
            $fileNameWithExt = $request->file('picture')->getClientOriginalName();
            //Get only file name
            $fileName = pathinfo($fileNameWithExt, PATHINFO_FILENAME);
            //File extension
            $extension = $request->file('picture')->getClientOriginalExtension();
            //File name to store
            $fileNameToStore = $fileName . '_' . time() . '.' . $extension;
            //Upload Image
            $path = $request->file('picture')->storeAs('public/item', $fileNameToStore);
        } else {
            $fileNameToStore = "nofile.png";
        }

        $request->request->add(['photo' => $fileNameToStore]);

        $item_category = ItemCategory::where('category', json_decode($request->item_category)->category)->first();
        $unit = Unit::where('name', json_decode($request->unit)->name)->first();

        $request->request->add(['unit_id' => $unit->id]);
        $request->request->add(['item_category_id' => $item_category->id]);
        $request->request->add(['store_id' => Store::firstOrCreate(['store_id' => 'ST001', 'name' => 'Raw Material', 'location' => 'Shoe Factory'])->id]);

        Item::create($request->all());

        return response()->json([
            'status' => 'success',
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function show(Item $item)
    {
        //
        return response()->json([
            'status' => 'success',
            'item' => $item,
            'item_received_count' => $item->itemReceived->sum('quantity'),
            'item_issued_count' => $item->itemIssued->sum('quantity'),

            'item_received_price' => $item->itemReceived->sum(function ($item_received) {
                return $item_received->quantity * $item_received->item_price;
            }),
            'item_issued_price' => $item->itemIssued->sum(function ($item_issued) {
                return $item_issued->quantity * $item_issued->avg_price;
            }),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function edit(Item $item)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Item $item)
    {

        //
        if ($request->hasFile('picture')) {
            $fileNameWithExt = $request->file('picture')->getClientOriginalName();
            //Get only file name
            $fileName = pathinfo($fileNameWithExt, PATHINFO_FILENAME);
            //File extension
            $extension = $request->file('picture')->getClientOriginalExtension();
            //File name to store
            $fileNameToStore = $fileName . '_' . time() . '.' . $extension;
            //Upload Image
            $path = $request->file('picture')->storeAs('public/item', $fileNameToStore);
            if (Storage::exists('public/item/' . $item->photo))
                Storage::delete('public/item/' . $item->photo);
        } else {
            $fileNameToStore = $item->photo;
        }

        $request->request->add(['photo' => $fileNameToStore]);

        $item->update([
            'name' => $request->name,
            'location' => $request->location,
            'min_balance' => $request->min_balance,
            'unit_id' => $request->unit_id,
            'item_category_id' => $request->item_category_id,
            'photo' => $fileNameToStore,
        ]);

        return response()->json([
            'status' => 'success',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function destroy(Item $item)
    {
        //
        $item->delete();
        if (Storage::exists('public/item/' . $item->photo))
            Storage::delete('public/item/' . $item->photo);

        return response()->json([
            'status' => 'success',
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function updateItemBalance(Item $item, Request $request)
    {
        $item->balance = ($item->balance - $item->initial_balance) + $request->initial_balance;

        $item->initial_balance = $request->initial_balance;
        $item->save();

        return response()->json([
            'status' => 'success',
        ]);
    }
}
