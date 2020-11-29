<?php

namespace App\Http\Controllers;

use App\FGReceive;
use App\FinishedGood;
use Illuminate\Http\Request;

class FGReceiveController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
        $received_finished_goods = FGReceive::with(['department']);
        if ($request->q != null) {
            $received_finished_goods->orWhere('receive_id', 'like', '%' . $request->q . '%');
        }
        return response()->json([
            'status' => 'success',
            'received_finished_goods' => $received_finished_goods->orderByDesc('updated_at')->paginate($request->itemsPerPage ?? 15),
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
        $f_g_receive = FGReceive::create($request->all());

        return response()->json([
            'status' => 'success',
            'f_g_receive' => $f_g_receive
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\FGReceive  $fGReceive
     * @return \Illuminate\Http\Response
     */
    public function show($fGReceive, Request $request)
    {
        //
        $fGReceive = FGReceive::find($fGReceive);
        $f_g_receive_details = $fGReceive->fGReceiveDetail();
        if ($request->q != null) {
            $item = FinishedGood::where('name', 'like', '%' . $request->q . '%')
                ->orWhere('finished_good_id', 'like', '%' . $request->q . '%');
            $f_g_receive_details->whereIn('finished_good_id', $item->pluck('id'));
        }
        return response()->json([
            'status' => 'success',
            'f_g_receive' => $fGReceive,
            'f_g_receive_details' => $f_g_receive_details->orderByDesc('updated_at')->get(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\FGReceive  $fGReceive
     * @return \Illuminate\Http\Response
     */
    public function edit(FGReceive $fGReceive)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\FGReceive  $fGReceive
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $fGReceive)
    {
        //     
        $fGReceive = FGReceive::find($fGReceive);
        $fGReceive->update($request->all());

        return response()->json([
            'status' => 'success',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\FGReceive  $fGReceive
     * @return \Illuminate\Http\Response
     */
    public function destroy($fGReceive)
    {
        //
        $fGReceive = FGReceive::find($fGReceive);

        foreach ($fGReceive->fGReceiveDetail as $received) {
            $finished_good = FinishedGood::find($received->finished_good_id);
            $finished_good->balance -= $received->quantity;
            $finished_good->save();
        }

        $fGReceive->delete();

        return response()->json([
            'status' => 'success',
        ]);
    }
}
