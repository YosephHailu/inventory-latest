<?php

namespace App\Imports;

use App\Shop;
use App\FGIssue;
use Carbon\Carbon;
use Maatwebsite\Excel\Concerns\ToModel;

class _PrevFinishedGoodIssueImport implements ToModel
{
    /**
     * @param Collection $collection
     */
    public function model(array $row)
    {
        try {
            $shop = Shop::where('shop_id', $row[6])->get();
            $date = Carbon::now();
            if ($row[2] != null)
                $date = Carbon::parse($row[2]);
            $item = FGIssue::firstOrCreate([
                'issue_id' => $row[1],
            ], [
                'shop_id' => $shop->first()->id,
                'year' => $date->year, 'month'  => $date->month, 'day' => $date->day
            ]);
        } catch (\Exception $e) {
            dd($e, $row);
            return null;
        }
        //
    }
}
