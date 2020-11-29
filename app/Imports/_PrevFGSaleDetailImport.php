<?php

namespace App\Imports;

use App\FGSale;
use App\FGSaleDetail;
use App\FinishedGood;
use Maatwebsite\Excel\Concerns\ToModel;
use App\Shop;
use App\ShopFG;
use \Carbon\Carbon;

class _PrevFGSaleDetailImport implements ToModel
{
    /**
     * @param Collection $collection
     */
    public function model(array $row)
    {
        try {
            $finished_good = FinishedGood::where('finished_good_id', $row[7])->get();
            $f_g_sale = FGSale::where('sale_id', $row[8])->get();

            $shop_f_g = ShopFG::where('finished_good_id', $finished_good->first()->id)
                ->where('shop_id', $f_g_sale->first()->shop_id);
            $item = FGSaleDetail::firstOrCreate([
                'shop_f_g_id' => $shop_f_g->first()->id,
                'f_g_sale_id' => $f_g_sale->first()->id,
                'finished_good_id' => $finished_good->first()->id,
                'quantity' => $row[1] == null ? "" : $row[1],
                'price' => $row[2] == null ? "" : $row[2],
            ]);
        } catch (\Exception $e) {
            dd($e, $row);
            return null;
        }
        //
    }
}
