<?php

namespace App\Imports;

use App\FinishedGood;
use Maatwebsite\Excel\Concerns\ToModel;
use App\Shop;
use App\ShopFG;

class _PrevShopFGImport implements ToModel
{
    /**
     * @param Collection $collection
     */
    public function model(array $row)
    {
        try {
            $shop = Shop::where('shop_id', $row[8])->get();
            $finished_good = FinishedGood::where('finished_good_id', $row[7])->get();

            $item = ShopFG::firstOrCreate([
                'finished_good_id' => $finished_good->first()->id,
                'shop_id' => $shop->first()->id,
            ], [
                'quantity' => $row[1] == null ? 0 : $row[1],
                'beginning_balance' => $row[2] == null ? 0 : $row[2],
                'initial_balance' => $row[2] == null ? 0 : $row[2],
            ]);
        } catch (\Exception $e) {
            dd($e, $row);
            return null;
        }
        //
    }
}
