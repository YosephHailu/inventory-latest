<?php

namespace App\Http\Controllers;

use App\FGIssue;
use App\FGIssueDetail;
use App\FGReturn;
use App\FGReturnDetail;
use App\FGSale;
use App\FGSaleDetail;
use App\FinishedGood;
use App\FinishedGoodModel;
use App\Shop;
use App\ShopFG;
use Exception;
use Illuminate\Http\Request;

class ShopHelperController extends Controller
{
    //
    protected function shopFinishedGoods(Request $request, Shop $shop)
    {
        $shop_f_gs = $shop->shopFG()->with('finishedGood');

        if ($request->q) {
            $f_g_ids = FinishedGood::where('name', 'like', '%' . $request->q . '%')
                ->orWhere('finished_good_id', 'like', '%' . $request->q . '%')->get()->pluck('id');
            $shop_f_gs->whereIn('finished_good_id', $f_g_ids);
        }

        if ($request->finished_good_model_id) {
            $f_g_ids = FinishedGood::where('finished_good_model_id', $request->finished_good_model_id)->get()->pluck('id');
            $shop_f_gs->whereIn('finished_good_id', $f_g_ids);
        }
        return response()->json([
            'shop_f_gs' => $shop_f_gs->paginate($request->itemsPerPage ?? 15),
        ]);
    }


    protected function shopReceives(Request $request, Shop $shop)
    {

        $f_g_issues = $shop->fGIssue()->with(['fGIssueDetail.finishedGood']);

        if ($request->q) {
            $f_g_ids = FinishedGood::where('name', 'like', '%' . $request->q . '%')
                ->orWhere('finished_good_id', 'like', '%' . $request->q . '%')->get()->pluck('id');
            $issue_details = FGIssueDetail::whereIn('f_g_issue_id', $shop->fGIssue->pluck('id'))
                ->whereIn('finished_good_id', $f_g_ids)->pluck('f_g_issue_id');
            $f_g_issues->whereIn('id', $issue_details);
        }

        return response()->json([
            'f_g_issues' => $f_g_issues->paginate($request->itemsPerPage ?? 15),
        ]);
    }

    protected function shopSales(Request $request, Shop $shop)
    {

        $f_g_sales = $shop->fGSale();

        return response()->json([
            'f_g_sales' => $f_g_sales->paginate($request->itemsPerPage ?? 15),
        ]);
    }

    protected function shopSaleDetails(Request $request, Shop $shop)
    {

        $f_g_sales = $shop->fGSale;
        $f_g_sale_details = FGSaleDetail::whereIn('f_g_sale_id', $f_g_sales->pluck('id'))
            ->with('fGSale', 'finishedGood');

        if ($request->q != null) {
            $finished_good = FinishedGood::where('name', 'like', '%' . $request->q . '%')
                ->orWhere('finished_good_id', 'like', '%' . $request->q . '%');
            $f_g_sale = FGSale::where('sale_id', 'like', '%' . $request->q . '%');
            $f_g_sale_details->whereIn('finished_good_id', $finished_good->pluck('id'))
                ->orWhereIn('f_g_sale_id', $f_g_sale->pluck('id'));
        }

        if ($request->year != null && $request->year != 'null') {
            $f_g_sale = FGSale::where('year', $request->year);
            $f_g_sale_details->whereIn('f_g_sale_id', $f_g_sale->pluck('id'));
        }

        if ($request->month != null) {
            $f_g_sale = FGSale::where('month', $request->month);
            $f_g_sale_details->whereIn('f_g_sale_id', $f_g_sale->pluck('id'));
        }

        if ($request->day != null) {
            $f_g_sale = FGSale::where('day', $request->day);
            $f_g_sale_details->whereIn('f_g_sale_id', $f_g_sale->pluck('id'));
        }

        if ($request->date)
            try {
                $date = json_decode($request->date);
               return $f_g_sale = FGSale::whereBetween('day', [$date->day_from, $date->day_to])
                    ->whereBetween('month', [$date->month_from, $date->month_to])
                    ->whereBetween('year', [$date->year_from, $date->year_to])->get();
                $f_g_sale_details->whereIn('f_g_sale_id', $f_g_sale->pluck('id'));
            } catch (Exception $e) {
                return $e;
            };

        return response()->json([
            'status' => 'success',
            'f_g_sale_details' => $f_g_sale_details->paginate($request->itemsPerPage ?? 15),
        ]);
    }

    protected function shopReturns(Request $request, Shop $shop)
    {

        $f_g_returns = $shop->fGReturn();

        return response()->json([
            'f_g_returns' => $f_g_returns->paginate($request->itemsPerPage ?? 15),
        ]);
    }

    protected function shopReturnDetails(Request $request, Shop $shop)
    {

        $f_g_returns = $shop->fGReturn;
        $f_g_return_details = FGReturnDetail::whereIn('f_g_return_id', $f_g_returns->pluck('id'))
            ->with('fGReturn', 'finishedGood');

        if ($request->q != null) {
            $finished_good = FinishedGood::where('name', 'like', '%' . $request->q . '%')
                ->orWhere('finished_good_id', 'like', '%' . $request->q . '%');
            $f_g_issue = FGReturn::where('issue_id', 'like', '%' . $request->q . '%');
            $f_g_return_details->whereIn('finished_good_id', $finished_good->pluck('id'))->orWhereIn('f_g_issue_id', $f_g_issue->pluck('id'));
        }

        return response()->json([
            'status' => 'success',
            'f_g_return_details' => $f_g_return_details->paginate($request->itemsPerPage ?? 15),
        ]);
    }

    protected function shopFinishedGoodDetail(Request $request, Shop $shop, FinishedGood $finishedGood)
    {

        $shopFG = ShopFG::where('shop_id', $shop->id)->where('finished_good_id', $finishedGood->id)
            ->with(['finishedGood'])->first();

        $f_g_issue = FGIssue::where('shop_id', $shop->id)->get();
        $f_g_return = FGReturn::where('shop_id', $shop->id)->get();
        $f_g_received_count = FGIssueDetail::whereIn('f_g_issue_id', $f_g_issue->pluck('id'))
            ->where('finished_good_id', $finishedGood->id)->sum('quantity');

        $f_g_received_price = FGIssueDetail::whereIn('f_g_issue_id', $f_g_issue->pluck('id'))
            ->where('finished_good_id', $finishedGood->id)->get()->sum(function ($item_received) {
                return $item_received->quantity * $item_received->avg_price;
            });
        return response()->json([
            'status' => 'success',
            'shop_f_g' => $shopFG,
            'f_g_received_count' => $f_g_received_count,
            'f_g_sale_count' => $shopFG->fGSaleDetail->sum('quantity'),
            'f_g_return_count' => $shopFG->fGReturnDetail->sum('quantity'),

            'f_g_received_price' => $f_g_received_price,
            'f_g_sale_price' => $shopFG->fGSaleDetail->sum(function ($sale) {
                return $sale->quantity * $sale->price;
            }),
        ]);
    }

    protected function shopFinishedGoodReceived(Request $request, Shop $shop, FinishedGood $finishedGood)
    {

        $f_g_issue = FGIssue::where('shop_id', $shop->id)->get();

        $f_g_issue_details = FGIssueDetail::whereIn('f_g_issue_id', $f_g_issue->pluck('id'))
            ->where('finished_good_id', $finishedGood->id)->with('fGIssue');

        return response()->json([
            'status' => 'success',
            'f_g_issue_details' => $f_g_issue_details->paginate($request->itemsPerPage ?? 15),
        ]);
    }

    protected function shopFinishedGoodSold(Request $request, Shop $shop, FinishedGood $finishedGood)
    {
        $f_g_sale = FGSale::where('shop_id', $shop->id)->get();

        $f_g_sale_details = FGSaleDetail::whereIn('f_g_sale_id', $f_g_sale->pluck('id'))
            ->where('finished_good_id', $finishedGood->id)->with('fGSale');
        return response()->json([
            'status' => 'success',
            'f_g_sale_details' => $f_g_sale_details->paginate($request->itemsPerPage ?? 15),
        ]);
    }

    protected function shopFinishedGoodReturned(Request $request, Shop $shop, FinishedGood $finishedGood)
    {
        $f_g_return = FGReturn::where('shop_id', $shop->id)->get();

        $f_g_return_details = FGReturnDetail::whereIn('f_g_return_id', $f_g_return->pluck('id'))
            ->where('finished_good_id', $finishedGood->id)->with('fGReturn');
        return response()->json([
            'status' => 'success',
            'f_g_return_details' => $f_g_return_details->paginate($request->itemsPerPage ?? 15),
        ]);
    }
}
