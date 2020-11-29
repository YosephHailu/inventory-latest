<?php

namespace App\Imports;

use App\GoodReceive;
use App\Item;
use App\ItemReceived;
use App\Store;
use Maatwebsite\Excel\Concerns\ToModel;

class ReceiveImport implements ToModel
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
            $good_receive = GoodReceive::firstOrCreate([
                'good_receive_id' => $row[7],
            ], [
                'invoice_no' => $row[8],
            ]);
            $item = Item::where('item_id', $row[9])->first();
            if ($item != null) {
                $item->balance += $row[1];
                $item->save();

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
