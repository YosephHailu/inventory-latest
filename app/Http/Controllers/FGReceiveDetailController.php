<?php

namespace App\Http\Controllers;

use App\FGReceive;
use App\FGReceiveDetail;
use App\FinishedGood;
use Exception;
use Illuminate\Http\Request;

class FGReceiveDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
        $f_g_received_details = FGReceiveDetail::with('fGReceive');

        if ($request->q != null) {
            $finished_goods = FinishedGood::where('name', 'like', '%' . $request->q . '%')
                ->orWhere('finished_good_id', 'like', '%' . $request->q . '%');
            $f_g_received = FGReceive::where('receive_id', 'like', '%' . $request->q . '%');
            $f_g_received_details->whereIn('finished_good_id', $finished_goods->pluck('id'))
                ->orWhereIn('f_g_receive_id', $f_g_received->pluck('id'));
        }

        if ($request->department_id != null) {
            $f_g_received = FGReceive::where('department_id', $request->department_id);

            $f_g_received_details->whereIn('f_g_receive_id', $f_g_received->pluck('id'))->get();
        }

        try {
            $date = json_decode($request->date);

            $f_g_receive = FGReceive::whereBetween('day', [$date->day_from, $date->day_to])
                ->whereBetween('month', [$date->month_from, $date->month_to])
                ->whereBetween('year', [$date->year_from, $date->year_to])->get();
            $f_g_received_details->whereIn('f_g_receive_id', $f_g_receive->pluck('id'))->get();
        } catch (Exception $e) {
        };

        return response()->json([
            'status' => 'success',
            'f_g_received_details' => $f_g_received_details->paginate($request->itemsPerPage ?? 15),
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

        $received = FGReceiveDetail::create($request->all());
        $finished_good = FinishedGood::find($request->finished_good_id);
        $finished_good->balance += $request->quantity;
        $finished_good->save();
        $f_g_received_detail = FGReceiveDetail::find($received->id);

        return response()->json([
            'status' => 'success',
            'f_g_received_detail' => $f_g_received_detail,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\FGReceiveDetail  $fGReceiveDetail
     * @return \Illuminate\Http\Response
     */
    public function show(FGReceiveDetail $fGReceiveDetail)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\FGReceiveDetail  $fGReceiveDetail
     * @return \Illuminate\Http\Response
     */
    public function edit(FGReceiveDetail $fGReceiveDetail)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\FGReceiveDetail  $fGReceiveDetail
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $fGReceiveDetail)
    {
        //
        $f_g_received_detail = FGReceiveDetail::find($fGReceiveDetail);

        $finished_good = FinishedGood::find($request->finished_good_id);
        $finished_good->balance -= $f_g_received_detail->quantity;

        $f_g_received_detail->update($request->all());

        $finished_good->balance += $request->quantity;
        $finished_good->save();

        return response()->json([
            'status' => 'success',
            'f_g_received_detail' => $f_g_received_detail,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\FGReceiveDetail  $fGReceiveDetail
     * @return \Illuminate\Http\Response
     */
    public function destroy($fGReceiveDetail)
    {
        //
        $f_g_received_detail = FGReceiveDetail::find($fGReceiveDetail);

        $finished_good = FinishedGood::find($f_g_received_detail->finished_good_id);
        $finished_good->balance -= $f_g_received_detail->quantity;
        $finished_good->save();

        $f_g_received_detail->delete();

        return response()->json([
            'status' => 'success',
        ]);
    }
}
