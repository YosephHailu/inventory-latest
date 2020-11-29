<?php

namespace App\Imports;

use App\GoodReceive;
use App\Item;
use App\ItemReceived;
use Carbon\Carbon;
use Maatwebsite\Excel\Concerns\ToModel;

class _PrevReceiveImport implements ToModel
{
    /**
     * @param Collection $collection
     */
    public function model(array $row)
    {
        try {
            if ($row[7] == 0)
                return null;
            if ($row[0] == null)
                return null;

            $date = Carbon::now();
            if ($row[10] != null)
                $date = Carbon::parse($row[10]);

            $good_receive = GoodReceive::firstOrCreate([
                'good_receive_id' => $row[7],
            ], [
                'invoice_no' => $row[8],
                'year' => $date->year, 'month'  => $date->month, 'day' => $date->day
            ]);
            $item = Item::where('item_id', $row[9])->first();
            if ($item != null) {
                return ItemReceived::firstOrCreate([
                    'quantity' => $row[1],
                    'item_price' => $row[2],
                    'good_receive_id' => $good_receive->id,
                    'item_id' => $item->id,

                ]);
            }
        } catch (\Exception $e) {
            dd($e, $row[9]);
            return null;
        }
        //
    }
}
