<?php

namespace App\Imports;

use App\FGReceive;
use App\FGReceiveDetail;
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

class _PrevFinishedGoodReceiveDetailImport implements ToModel
{
    /**
     * @param Collection $collection
     */
    public function model(array $row)
    {
        try {
            $finished_good = FinishedGood::where('finished_good_id', $row[8])->get();
            $f_g_received = FGReceive::where('receive_id', $row[10])->get();

            if($f_g_received->first()->receive_id == 0)
                return null;
            $item = FGReceiveDetail::firstOrCreate([
                'quantity' => $row[1] ?? 0,
                'cost' => $row[2] ?? 0,
                'finished_good_id' => $finished_good->first()->id,
                'f_g_receive_id' => $f_g_received->first()->id,
            ]);
        } catch (\Exception $e) {
            dd($e, $row);
            return null;
        }
        //
    }
}
