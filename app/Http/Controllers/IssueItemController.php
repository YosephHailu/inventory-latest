<?php

namespace App\Http\Controllers;

use App\IssueItem;
use App\IssueItemCategory;
use App\Item;
use App\Store;
use App\Unit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class IssueItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
        $item_issued_items = IssueItem::with(['section']);
        if ($request->q != null) {
            $item_issued_items->where('name', 'like', '%' . $request->q . '%')
                ->orWhere('issueItem_id', 'like', '%' . $request->q . '%');
        }
        return response()->json([
            'status' => 'success',
            'issued_items' => $item_issued_items->paginate($request->itemsPerPage ?? 15),
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
        $issue_item = IssueItem::create($request->all());

        return response()->json([
            'status' => 'success',
            'issue_item' => $issue_item
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\IssueItem  $issueItem
     * @return \Illuminate\Http\Response
     */
    public function show(IssueItem $issueItem, Request $request)
    {
        //
        $item_issue = $issueItem->itemIssued();
        if ($request->q != null) {
            $item = Item::where('name', 'like', '%' . $request->q . '%')
                ->orWhere('item_id', 'like', '%' . $request->q . '%');
            $item_issue->whereIn('item_id', $item->pluck('id'));
        }
        return response()->json([
            'status' => 'success',
            'issue_item' => $issueItem,
            'item_issue' => $item_issue->orderByDesc('updated_at')->get(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\IssueItem  $issueItem
     * @return \Illuminate\Http\Response
     */
    public function edit(IssueItem $issueItem)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\IssueItem  $issueItem
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, IssueItem $issueItem)
    {
        //
        $issueItem->update([
            'issue_id' => $request->issue_id,
            'year' => $request->year,
            'month' => $request->month,
            'day' => $request->day,
            'request_no' => $request->request_no,
            'issued_by' => $request->issued_by,
            'approved_by' => $request->approved_by,
            'received_by' => $request->received_by,
            'section_id' => $request->section_id,
        ]);

        return response()->json([
            'status' => 'success',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\IssueItem  $issueItem
     * @return \Illuminate\Http\Response
     */
    public function destroy(IssueItem $issueItem)
    {
        //
        foreach ($issueItem->itemIssued as $item_issued) {
            $item = Item::find($item_issued->item_id);
            $item->balance += $item_issued->quantity;
            $item->save();
        }

        $issueItem->delete();

        return response()->json([
            'status' => 'success',
        ]);
    }
}
