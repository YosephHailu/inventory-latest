<?php

namespace App\Imports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToModel;
use App\Supplier;

class SupplierImport implements ToModel
{
    /**
    * @param Collection $collection
    */
    public function model(array $row)
    {
        try{
            if($row[1] == 'SuppId' || $row[0] == null)
                return null;
            return Supplier::firstOrCreate([
                            'supplier_id' => $row[0],
                            'name' => $row[1],
                            'tin_no' => $row[2],
                        ]);
        }catch(\Exception $e){
            dd($e);
            return null;
        }
        //
    }
}
