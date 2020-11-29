<?php

namespace App\Imports;

use App\FinishedGoodCategory;
use Maatwebsite\Excel\Concerns\ToModel;

class _PrevFinishedGoodCategoryImport implements ToModel
{
    /**
     * @param Collection $collection
     */
    public function model(array $row)
    {
        try {
            if ($row[1] == 'CatName' || $row[2] == null)
                return null;
            return FinishedGoodCategory::firstOrCreate([
                //
                'category_id' => $row[1],
                'category' => $row[2],
            ]);
        } catch (\Exception $e) {
            dd($e);
            return null;
        }
        //
    }
}
