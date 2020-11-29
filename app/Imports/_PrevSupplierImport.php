<?php

namespace App\Imports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToModel;
use App\Supplier;

class _PrevSupplierImport implements ToModel
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
                            'supplier_id' => $row[1],
                            'name' => $row[2],
                            'tin_no' => $row[3],
                        ]);
        }catch(\Exception $e){
            dd($e);
            return null;
        }
        //
    }
}
