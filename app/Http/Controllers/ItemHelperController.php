<?php

namespace App\Http\Controllers;

use App\Config;
use App\Item;
use App\ItemCategory;
use App\Section;
use App\Supplier;
use App\Unit;
use Illuminate\Http\Request;

class ItemHelperController extends Controller
{
    //
    public function itemOptions(Request $request)
    {
        $units = Unit::All();
        $itemCategories = ItemCategory::All();

        return response()->json([
            'units' => $units,
            'itemCategories' => $itemCategories,
        ]);
    }

    public function goodReceiveOptions(Request $request)
    {
        $suppliers = Supplier::All();
        $config = Config::first();

        return response()->json([
            'suppliers' => $suppliers,
            'config' => $config,
        ]);
    }

    public function itemIssueOptions(Request $request)
    {
        $sections = Section::All();
        $config = Config::first();

        return response()->json([
            'sections' => $sections,
            'config' => $config,
        ]);
    }

    public function itemReceived(Request $request, Item $item)
    {
        $item_received = $item->itemReceived()->with(['goodReceive.supplier']);

        return response()->json([
            'item_received' => $item_received->paginate($request->itemsPerPage ?? 15),
        ]);
    }
    
    public function itemIssued(Request $request, Item $item)
    {
        $item_issued = $item->itemIssued()->with(['issueItem']);

        return response()->json([
            'item_issued' => $item_issued->paginate($request->itemsPerPage ?? 15),
        ]);
    }
}
