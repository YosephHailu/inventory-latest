<?php

namespace App\Imports;

use App\Section;
use Maatwebsite\Excel\Concerns\ToModel;
use App\Department;

class _PrevSectionImport implements ToModel
{
    /**
     * @param Collection $collection
     */
    public function model(array $row)
    {
        try {
            if ($row[1] == 'SecName')
                return null;
            if ($row[0] == null)
                return null;
            return Section::firstOrCreate([
                //
                'section_id' => $row[1],
                'name' => $row[2],
                'department_id' => Department::where('department_id', str_replace('O', '0', $row[6]))->first()->id,
            ]);
        } catch (\Exception $e) {
            dd($e, $row);
            return null;
        }
        //
    }
}
