<?php

namespace App\Imports;

use App\Department;
use Maatwebsite\Excel\Concerns\ToModel;

class _PrevDepartmentImport implements ToModel
{
    /**
     * @param Collection $collection
     */
    public function model(array $row)
    {
        try {
            if ($row[1] == 'DeptName')
                return null;
            if ($row[0] == null)
                return null;
            return Department::firstOrCreate([
                //
                'department_id' => $row[1],
                'name' => $row[2],
            ]);
        } catch (\Exception $e) {
            dd($e, $row);
            return null;
        }
        //
    }
}
