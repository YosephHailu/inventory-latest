<?php

namespace App\Http\Controllers;

use App\Company;
use App\FGIssue;
use App\FGReceive;
use App\FinishedGood;
use App\GoodReceive;
use App\IssueItem;
use App\Item;
use Carbon\Carbon;
use DateTime;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    //
    protected function statistics(Request $request)
    {
        $items = Item::query();
        $good_received = GoodReceive::orderByDesc('updated_at');
        $issue_item = IssueItem::orderByDesc('updated_at');

        $finished_goods = FinishedGood::query();
        $f_g_received = FGReceive::orderByDesc('updated_at');
        $f_g_issued = FGIssue::orderByDesc('updated_at');
        return response()->json([
            'item_count' => $items->count(),
            'received_quantity' => $good_received->take(50)->get()->pluck('total_quantity'),
            'issued_quantity' => $issue_item->take(50)->get()->pluck('total_quantity'),

            'f_g_count' => $finished_goods->count(),
            'f_g_received_quantity' => $f_g_received->take(50)->get()->pluck('total_quantity'),
            'f_g_issued_quantity' => $f_g_issued->take(50)->get()->pluck('total_quantity'),
        ]);
    }


    protected function setting(Request $request)
    {
        $company = Company::first();

        // create a gregorian date using PHP's built-in DateTime class
        $gregorian = new DateTime();

        // just pass it to Andegna\DateTime constractor and you will get $ethiopian date
        $ethipic = new \Andegna\DateTime($gregorian);

        $date = explode('-', $ethipic->format("d-m-Y"));

        return response()->json([
            'current_date' => $ethipic->format(DATE_COOKIE),
            'date' => $date,
            'company' => $company,
        ]);
    }
}
