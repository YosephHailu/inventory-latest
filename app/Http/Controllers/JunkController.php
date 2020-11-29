<?php

namespace App\Http\Controllers;

use App\FGIssue;
use App\FGIssueDetail;
use App\FinishedGood;
use App\Item;
use App\ShopFG;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use SebastianBergmann\Environment\Console;

class JunkController extends Controller
{
    //
    protected function revalidate()
    {

        foreach (ShopFG::all() as $shop_fg) {

            $f_g_issue = FGIssue::where('shop_id', $shop_fg->shop_id)->get();

            $f_g_received_quantity = FGIssueDetail::whereIn('f_g_issue_id', $f_g_issue->pluck('id'))
                ->where('finished_good_id', $shop_fg->finished_good_id)->get()->sum('quantity');

            if (($f_g_received_quantity + $shop_fg->initial_balance - $shop_fg->fGSaleDetail->sum('quantity'))
                != $shop_fg->quantity
            ) {
                $balance = ($f_g_received_quantity + $shop_fg->initial_balance - $shop_fg->fGSaleDetail->sum('quantity'));
                $shop_fg->quantity = $balance;
                $shop_fg->save();
            }
        }

        foreach (FinishedGood::all() as $finishedGood) {
            if (($finishedGood->fGReceiveDetail->sum('quantity') + $finishedGood->initial_balance - $finishedGood->fGIssueDetail->sum('quantity'))
                != $finishedGood->balance
            ) {
                $balance = ($finishedGood->fGReceiveDetail->sum('quantity') + $finishedGood->initial_balance - $finishedGood->fGIssueDetail->sum('quantity'));
                $finishedGood->balance = $balance;
                $finishedGood->save();
            }
        }

        foreach (Item::all() as $item) {
            if (($item->itemReceived->sum('quantity') + $item->initial_balance - $item->itemIssued->sum('quantity')) != $item->balance) {
                $balance = ($item->itemReceived->sum('quantity') - $item->itemIssued->sum('quantity')) + $item->initial_balance;
                $item->balance = $balance;
                $item->save();
            }
        }
    }
    
    public function closeup()
    {

        foreach (ShopFG::all() as $shop_fg) {

            $f_g_issue = FGIssue::where('shop_id', $shop_fg->shop_id)->get();

            $f_g_received_quantity = FGIssueDetail::whereIn('f_g_issue_id', $f_g_issue->pluck('id'))
                ->where('finished_good_id', $shop_fg->finished_good_id)->get()->sum('quantity');

            $balance = ($f_g_received_quantity + $shop_fg->initial_balance - $shop_fg->fGSaleDetail->sum('quantity'));
            $shop_fg->beginning_balance = $balance;
            $shop_fg->quantity = $balance;
            $shop_fg->save();
        }

        foreach (FinishedGood::all() as $finishedGood) {
            $balance = ($finishedGood->fGReceiveDetail->sum('quantity') + $finishedGood->initial_balance - $finishedGood->fGIssueDetail->sum('quantity'));
            $finishedGood->beginning_balance = $balance;
            $finishedGood->balance = $balance;
            $finishedGood->save();
        }

        foreach (Item::All() as $item) {
            $balance = ($item->itemReceived->sum('quantity') - $item->itemIssued->sum('quantity')) + $item->initial_balance;
            $item->beginning_balance = $balance;
            $item->balance = $balance;
            $item->save();
        }
        return response()->json([
            'status' => 'success',
        ]);
    }

    public function takeBackup(){
        Artisan::call('backup:run --only-db --disable-notifications');
        return "Successfully taken";
    }
}
