<?php

namespace App\Http\Controllers;

use App\FGIssue;
use App\FinishedGood;
use App\ShopFG;
use Illuminate\Http\Request;
use JsonSerializable;

class FGIssueController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
        $f_g_issues = FGIssue::with(['shop']);
        if ($request->q != null) {
            $f_g_issues->where('name', 'like', '%' . $request->q . '%')
                ->orWhere('issue_id', 'like', '%' . $request->q . '%');
        }
        return response()->json([
            'status' => 'success',
            'f_g_issues' => $f_g_issues->orderByDesc('updated_at')->paginate($request->itemsPerPage ?? 15),
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
        $f_g_issue = FGIssue::create($request->all());

        return response()->json([
            'status' => 'success',
            'f_g_issue' => $f_g_issue
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\FGIssue  $fGIssue
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $fGIssue)
    {
        $fGIssue = FGIssue::find($fGIssue);
        //
        $f_g_issue_detail = $fGIssue->fGIssueDetail();
        if ($request->q != null) {
            $finished_good = FinishedGood::where('name', 'like', '%' . $request->q . '%')
                ->orWhere('finished_good_id', 'like', '%' . $request->q . '%');
            $f_g_issue_detail->whereIn('finished_good_id', $finished_good->pluck('id'));
        }
        return response()->json([
            'status' => 'success',
            'f_g_issue' => $fGIssue,
            'f_g_issue_detail' => $f_g_issue_detail->orderByDesc('updated_at')->get(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\FGIssue  $fGIssue
     * @return \Illuminate\Http\Response
     */
    public function edit(FGIssue $fGIssue)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\FGIssue  $fGIssue
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $fGIssue)
    {
        //
        $fGIssue = FGIssue::find($fGIssue);
        $fGIssue->update([
            'issue_id' => $request->issue_id,
            'year' => $request->year,
            'month' => $request->month,
            'day' => $request->day,
            'shop_id' => $request->shop_id

        ]);

        return response()->json([
            'status' => 'success',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\FGIssue  $fGIssue
     * @return \Illuminate\Http\Response
     */
    public function destroy($fGIssue)
    {
        //
        $fGIssue = FGIssue::find($fGIssue);

        foreach ($fGIssue->fGIssueDetail as $issue_detail) {
            $finished_good = FinishedGood::find($issue_detail->finished_good_id);
            $finished_good->balance += $issue_detail->quantity;
            $finished_good->save();

            $shop_f_g  = ShopFG::where('shop_id', $issue_detail->fGIssue->shop_id)
                ->where('finished_good_id', $finished_good->id)->get();
            if ($shop_f_g->first() != null) {
                $shop_f_g = $shop_f_g->first();
                $shop_f_g->update(
                    [
                        'quantity' => $shop_f_g->quantity - $issue_detail->quantity,
                    ]
                );
            }
        }

        $fGIssue->delete();

        return response()->json([
            'status' => 'success',
        ]);
    }
}
