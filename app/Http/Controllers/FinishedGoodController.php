<?php

namespace App\Http\Controllers;

use App\FinishedGood;
use App\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FinishedGoodController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
        $finished_goods = FinishedGood::with('finishedGoodModel', 'unit');

        if ($request->q != null) {
            $finished_goods->where('name', 'like', '%' . $request->q . '%')
                ->orWhere('finished_good_id', 'like', '%' . $request->q . '%');
        }

        if ($request->sortBy != null && $request->sortBy != "undefined") {
            $finished_goods->orderByDesc($request->sortBy);
        }

        if ($request->finished_good_model_id != null) {
            $finished_goods->where('finished_good_model_id', $request->finished_good_model_id);
        }

        return response()->json([
            'status' => 'success',
            'finished_goods' => $finished_goods->orderByDesc('updated_at')->paginate($request->itemsPerPage ?? 15),
        ]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function finishedGoods(Request $request)
    {
        //
        $finished_goods = FinishedGood::with('finishedGoodModel');
        if ($request->q != null) {
            $finished_goods->where('name', 'like', '%' . $request->q . '%')
                ->orWhere('item_id', 'like', '%' . $request->q . '%');
        }

        if ($request->finished_good_model_id != null) {
            $finished_goods->where('finished_good_model_id', $request->finished_good_model_id);
        }

        return response()->json([
            'status' => 'success',
            'finished_goods' => $finished_goods->get(),
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
            $path = $request->file('picture')->storeAs('public/finished_good', $fileNameToStore);
        } else {
            $fileNameToStore = 'nofile.jpg';
        }

        $request->request->add(['photo' => $fileNameToStore]);

        $store = Store::Create(['store_id' => 'ST002', 'name' => 'Finished Goods Store'], ['location' => 'Shoe Factory']);

        $request->request->add(['store_id' => $store->id]);
        FinishedGood::create($request->all());

        return response()->json([
            'status' => 'success',
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\FinishedGood  $finishedGood
     * @return \Illuminate\Http\Response
     */
    public function show(FinishedGood $finishedGood)
    {
        //
        return response()->json([
            'status' => 'success',
            'finished_good' => $finishedGood,
            'f_g_received_count' => $finishedGood->fGReceiveDetail->sum('quantity'),
            'f_g_issued_count' => $finishedGood->fGIssueDetail->sum('quantity'),

            'f_g_received_price' => $finishedGood->fGReceiveDetail->sum(function ($item_received) {
                return $item_received->quantity * $item_received->cost;
            }),
            'f_g_issued_price' => $finishedGood->fGIssueDetail->sum(function ($item_issued) {
                return $item_issued->quantity * $item_issued->avg_price;
            }),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\FinishedGood  $finishedGood
     * @return \Illuminate\Http\Response
     */
    public function edit(FinishedGood $finishedGood)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\FinishedGood  $finishedGood
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, FinishedGood $finishedGood)
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
            $path = $request->file('picture')->storeAs('public/finished_good', $fileNameToStore);

            if (Storage::exists('public/finished_good/' . $finishedGood->photo))
                Storage::delete('public/finished_good/' . $finishedGood->photo);
        } else {
            $fileNameToStore = $finishedGood->photo;
        }

        $request->request->add(['photo' => $fileNameToStore]);
        $finishedGood->update($request->all());

        return response()->json([
            'status' => 'success',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\FinishedGood  $finishedGood
     * @return \Illuminate\Http\Response
     */
    public function destroy(FinishedGood $finishedGood)
    {
        //

        if (Storage::exists('public/finished_good/' . $finishedGood->photo))
            Storage::delete('public/finished_good/' . $finishedGood->photo);
        $finishedGood->delete();

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
    public function updateFinishedGoodBalance(FinishedGood $finishedGood, Request $request)
    {
        //
        $finishedGood->balance = ($finishedGood->balance -  $finishedGood->initial_balance) + $request->initial_balance;

        $finishedGood->initial_balance = $request->initial_balance;
        $finishedGood->save();

        return response()->json([
            'status' => 'success',
        ]);
    }
}
