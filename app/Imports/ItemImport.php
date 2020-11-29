<?php

namespace App\Imports;

use App\Item;
use App\Store;
use Maatwebsite\Excel\Concerns\ToModel;
use App\ItemCategory;
use App\Supplier;
use App\ItemGoodReceived;
use App\GoodReceived;
use App\Unit;
use \Carbon\Carbon;

class ItemImport implements ToModel
{
    /**
     * @param Collection $collection
     */
    public function model(array $row)
    {
        try {
            if ($row[1] == 'ItemName' || $row[0] == null || $row[5] == null)
                return null;
            $itemCategory = ItemCategory::where('category_id', $row[3])->get();
            
            $unit = Unit::firstOrCreate(['name' => $row[2]]);
            $item = Item::firstOrCreate([
                'item_id' => $row[0],
            ], [
                'name' => $row[1],
                'unit_id' => $unit->id,
                'balance' => $row[4] == null ? 0 : $row[4],
                'initial_balance' => $row[4] == null ? 0 : $row[4],
                'store_id' => Store::where('store_id', str_replace('O', '0', $row[5]))->first()->id,
                'min_balance' => 0,
                'beginning_balance' => 0,
                'item_category_id' => $itemCategory->first()->id,
            ]);
        } catch (\Exception $e) {
            dd($e, $row);
            return null;
        }
        //
    }
}
