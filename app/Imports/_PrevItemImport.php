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

class _PrevItemImport implements ToModel
{
    /**
     * @param Collection $collection
     */
    public function model(array $row)
    {
        try {
            if ($row[1] == 'ItemName' || $row[0] == null)
                return null;
            $itemCategory = ItemCategory::where('category_id', $row[14])->get();
            $store = Store::where('store_id', $row[13])->get();

            $unit = Unit::firstOrCreate(['name' => $row[3]]);
            $item = Item::firstOrCreate([
                'item_id' => $row[1],
            ], [
                'name' => $row[2],
                'unit_id' => $unit->id,
                'beginning_balance' => $row[4] == null ? 0 : $row[4],
                'balance' => $row[5] == null ? 0 : $row[5],
                'min_balance' =>  $row[6] == null ? 0 : $row[6],
                'location' => $row[7],
                'store_id' =>  $store->first()->id,
                'item_category_id' => $itemCategory->first()->id,
                'initial_balance' => $row[5] == null ? 0 : $row[5],
            ]);
        } catch (\Exception $e) {
            dd($e, $row);
            return null;
        }
        //
    }
}
