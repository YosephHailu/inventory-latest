<?php

namespace App\Imports;

use App\FGIssue;
use App\FGIssueDetail;
use App\FinishedGood;
use Maatwebsite\Excel\Concerns\ToModel;

class _PrevFinishedGoodIssueDetailImport implements ToModel
{
    /**
     * @param Collection $collection
     */
    public function model(array $row)
    {
        try {
            if ($row[1] == 0)
                return null;
            $finished_good = FinishedGood::where('finished_good_id', $row[7])->get();
            $f_g_issued = FGIssue::where('issue_id', $row[8])->get();

            $item = FGIssueDetail::firstOrCreate([
                'quantity' => $row[1],
                'avg_price' => $row[2] ?? 0,
                'finished_good_id' => $finished_good->first()->id,
                'f_g_issue_id' => $f_g_issued->first()->id,
            ]);
        } catch (\Exception $e) {
            dd($e, $row);
            return null;
        }
        //
    }
}
