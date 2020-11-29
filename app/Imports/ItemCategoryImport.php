<?php

namespace App\Imports;

use App\ItemCategory;
use Maatwebsite\Excel\Concerns\ToModel;

class ItemCategoryImport implements ToModel
{
    /**
     * @param Collection $collection
     */
    public function model(array $row)
    {
        try {
            if ($row[1] == 'CatName' || $row[0] == null)
                return null;
            return ItemCategory::firstOrCreate([
                //
                'category_id' => $row[0],
                'category' => $row[1],
            ]);
        } catch (\Exception $e) {
            dd($e);
            return null;
        }
        //
    }
}
