<?php

namespace App\Http\Controllers;

use App\Exports\FGIssueExport;
use App\Exports\FGReceiveExport;
use App\Exports\FinishedGoodExport;
use App\Exports\GoodReceiveExport;
use App\Exports\ItemExport;
use App\Exports\ItemIssueExport;
use App\Exports\SalesExport;
use App\Shop;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class ExportController extends Controller
{
    //
    public function exportItem(Request $request)
    {
        return Excel::download(new ItemExport($request->category_id, $request->q), 'items report.xlsx');
    }
    
    public function exportGoodReceive(Request $request)
    {
        return Excel::download(new GoodReceiveExport($request->supplier_id, $request->q), 'good receive report.xlsx');
    }
    
    public function exportItemIssue(Request $request)
    {
        return Excel::download(new ItemIssueExport($request->section_id, $request->q), 'Item issue report.xlsx');
    }

    public function exportFinishedGOod(Request $request)
    {
        return Excel::download(new FinishedGoodExport($request->finished_good_model_id, $request->q), 'finished good report.xlsx');
    }
    
    public function exportFinishedGoodReceive(Request $request)
    {
        return Excel::download(new FGReceiveExport($request->department_id, $request->q), 'finished good receive report.xlsx');
    }
    
    public function exportFinishedGoodIssue(Request $request)
    {
        return Excel::download(new FGIssueExport($request->shop_id, $request->q), 'finished good issue report.xlsx');
    }
    
    public function exportSales(Request $request, Shop $shop)
    {
        return Excel::download(new SalesExport($shop, $request->q), 'Sales report.xlsx');
    }
}
