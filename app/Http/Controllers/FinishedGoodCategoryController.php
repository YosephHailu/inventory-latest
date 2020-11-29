<?php

namespace App\Http\Controllers;

use App\FinishedGoodCategory;
use Illuminate\Http\Request;

class FinishedGoodCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $finished_good_categories = FinishedGoodCategory::All();
        return response()->json([
            'status' => 'success',
            'finished_good_categories' => $finished_good_categories,
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
        FinishedGoodCategory::create($request->all());

        return response()->json([
            'status' => 'success',
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\FinishedGoodCategory  $finishedGoodCategory
     * @return \Illuminate\Http\Response
     */
    public function show(FinishedGoodCategory $finishedGoodCategory)
    {
        //
        return response()->json([
            'status' => 'success',
            'finishedGoodCategory' => $finishedGoodCategory,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\FinishedGoodCategory  $finishedGoodCategory
     * @return \Illuminate\Http\Response
     */
    public function edit(FinishedGoodCategory $finishedGoodCategory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\FinishedGoodCategory  $finishedGoodCategory
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, FinishedGoodCategory $finishedGoodCategory)
    {
        //
        $finishedGoodCategory->update($request->all());

        return response()->json([
            'status' => 'success',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\FinishedGoodCategory  $finishedGoodCategory
     * @return \Illuminate\Http\Response
     */
    public function destroy(FinishedGoodCategory $finishedGoodCategory)
    {
        //
        $finishedGoodCategory->delete();
        return response()->json([
            'status' => 'success',
        ]);
    }
}
