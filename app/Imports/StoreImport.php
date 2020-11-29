<?php

namespace App\Imports;

use App\Store;
use Maatwebsite\Excel\Concerns\ToModel;

class StoreImport implements ToModel
{
    /**
     * @param Collection $collection
     */
    public function model(array $row)
    {
        try {
            if ($row[1] == 'StoreName')
                return null;
            if ($row[0] == null)
                return null;
            return Store::firstOrCreate([
                'store_id' => $row[0],
            ], [
                //
                'name' => $row[1],
                'location' => $row[2],
            ]);
        } catch (\Exception $e) {
            dd($e);
            return null;
        }
        //
    }
}
