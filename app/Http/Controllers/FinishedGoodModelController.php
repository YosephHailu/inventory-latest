<?php

namespace App\Http\Controllers;

use App\FinishedGoodModel;
use Illuminate\Http\Request;

class FinishedGoodModelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $finished_good_models = FinishedGoodModel::All();
        return response()->json([
            'status' => 'success',
            'finished_good_models' => $finished_good_models,
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
        FinishedGoodModel::create($request->all());

        return response()->json([
            'status' => 'success',
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\FinishedGoodModel  $finishedGoodModel
     * @return \Illuminate\Http\Response
     */
    public function show(FinishedGoodModel $finishedGoodModel)
    {
        //
        return response()->json([
            'status' => 'success',
            'finishedGoodModel' => $finishedGoodModel,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\FinishedGoodModel  $finishedGoodModel
     * @return \Illuminate\Http\Response
     */
    public function edit(FinishedGoodModel $finishedGoodModel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\FinishedGoodModel  $finishedGoodModel
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, FinishedGoodModel $finishedGoodModel)
    {
        //
        $finishedGoodModel->update($request->all());

        return response()->json([
            'status' => 'success',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\FinishedGoodModel  $finishedGoodModel
     * @return \Illuminate\Http\Response
     */
    public function destroy(FinishedGoodModel $finishedGoodModel)
    {
        //
        $finishedGoodModel->delete();
        return response()->json([
            'status' => 'success',
        ]);
    }
}
