<?php

namespace App\Imports;

use App\ItemCategory;
use Maatwebsite\Excel\Concerns\ToModel;

class _PrevItemCategoryImport implements ToModel
{
    /**
     * @param Collection $collection
     */
    public function model(array $row)
    {
        try {
            if ($row[1] == 'CatName' || $row[2] == null)
                return null;
            return ItemCategory::firstOrCreate([
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
