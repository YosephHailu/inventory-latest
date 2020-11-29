<?php

namespace App\Imports;

use App\Shop;
use Maatwebsite\Excel\Concerns\ToModel;

class _PrevShopImport implements ToModel
{
    /**
     * @param Collection $collection
     */
    public function model(array $row)
    {
        try {
            if ($row[0] == null)
                return null;
            return Shop::firstOrCreate([
                //
                'shop_id' => $row[1],
                'name' => $row[2],
            ]);
        } catch (\Exception $e) {
            dd($e, $row);
            return null;
        }
        //
    }
}
