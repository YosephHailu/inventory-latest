<?php

namespace App\Imports;

use App\GoodReceive;
use App\IssueItem;
use App\Item;
use App\ItemIssued;
use App\ItemReceived;
use App\Section;
use App\Store;
use Maatwebsite\Excel\Concerns\ToModel;

class IssueImport implements ToModel
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

            $section = Section::where('section_id', $row[8])->first();
            $issue_item = IssueItem::firstOrCreate(
                [
                    'issue_id' => $row[7]
                ],
                [
                    'section_id' => $section->id,
                    'request_no' => $row[10],
                    'issued_by' => $row[11],
                    'received_by' => $row[12],
                ]
            );

            $item = Item::where('item_id', $row[9])->first();
            if ($item != null) {
                $item->balance -= $row[1];
                $item->save();

                return ItemIssued::firstOrCreate([
                    'quantity' => $row[1],
                    'avg_price' => $row[2] ?? 0,
                    'issue_item_id' => $issue_item->id,
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
