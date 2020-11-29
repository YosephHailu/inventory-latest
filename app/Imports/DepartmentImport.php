<?php

namespace App\Imports;

use App\Department;
use Maatwebsite\Excel\Concerns\ToModel;

class DepartmentImport implements ToModel
{
    /**
    * @param Collection $collection
    */
    public function model(array $row)
    {
        try{
            if($row[1] == 'DeptName')
                return null;
            if($row[0] == null)
                return null;
            return Department::firstOrCreate([
                            //
                            'department_id' => $row[0],
                            'name' => $row[1],
                        ]);
        }catch(\Exception $e){
            dd($e, $row);
            return null;
        }
        //
    }
}
