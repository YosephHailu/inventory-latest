<?php

namespace App\Imports;

use App\FinishedGoodCategory;
use App\FinishedGoodModel;
use Maatwebsite\Excel\Concerns\ToModel;

class _PrevFinishedGoodModelImport implements ToModel
{
    /**
     * @param Collection $collection
     */
    public function model(array $row)
    {
        try {
            if ($row[1] == 'CatName' || $row[2] == null)
                return null;
            $finished_good_category = FinishedGoodCategory::where('category_id', $row[6])->get();

            return FinishedGoodModel::firstOrCreate([
                //
                'model_id' => $row[1],
                'model' => $row[2],
                'finished_good_category_id' => $finished_good_category->first()->id,
            ]);
        } catch (\Exception $e) {
            dd($e);
            return null;
        }
        //
    }
}
