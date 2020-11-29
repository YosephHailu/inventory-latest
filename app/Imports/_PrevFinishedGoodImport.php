<?php

namespace App\Imports;

use App\FinishedGood;
use App\FinishedGoodModel;
use App\Item;
use App\Store;
use Maatwebsite\Excel\Concerns\ToModel;
use App\ItemCategory;
use App\Supplier;
use App\ItemGoodReceived;
use App\GoodReceived;
use App\Unit;
use \Carbon\Carbon;

class _PrevFinishedGoodImport implements ToModel
{
    /**
     * @param Collection $collection
     */
    public function model(array $row)
    {
        try {
            $model = FinishedGoodModel::where('model_id', $row[13])->get();
            $store = Store::Create(['store_id' => 'ST002', 'name' => 'Finished Goods Store'], ['location' => 'Shoe Factory']);
            $unit = Unit::firstOrCreate(['name' => $row[14]]);

            $item = FinishedGood::firstOrCreate([
                'finished_good_id' => $row[1],
            ], [
                'name' => $row[2],
                'size' => $row[3],
                'minimum_balance' =>  $row[4] == null ? 0 : $row[4],
                'beginning_balance' => $row[5] == null ? 0 : $row[5],
                'initial_balance' => $row[5] == null ? 0 : $row[5],
                'balance' => $row[6] == null ? 0 : $row[6],
                'unit_id' => $unit->id,
                'store_id' =>  $store->id,
                'finished_good_model_id' => $model->first()->id,
            ]);
        } catch (\Exception $e) {
            dd($e, $row);
            return null;
        }
        //
    }
}
