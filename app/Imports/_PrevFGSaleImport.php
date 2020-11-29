<?php

namespace App\Imports;

use App\FGSale;
use Maatwebsite\Excel\Concerns\ToModel;
use App\Shop;
use \Carbon\Carbon;

class _PrevFGSaleImport implements ToModel
{
    /**
     * @param Collection $collection
     */
    public function model(array $row)
    {
        try {
            $shop = Shop::where('shop_id', $row[7])->get();
            $date = Carbon::now();
            if ($row[2] != null)
                $date = Carbon::parse($row[2]);

            $item = FGSale::firstOrCreate([
                'sale_id' => $row[1],
            ], [
                'shop_id' => $shop->first()->id,
                'to' => $row[3] == null ? "" : $row[3],
                'year' => $date->year, 'month'  => $date->month, 'day' => $date->day
            ]);
        } catch (\Exception $e) {
            dd($e, $row);
            return null;
        }
        //
    }
}
