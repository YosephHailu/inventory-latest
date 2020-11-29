<?php

namespace App\Imports;

use App\Section;
use Maatwebsite\Excel\Concerns\ToModel;
use App\Department;

class SectionImport implements ToModel
{
    /**
    * @param Collection $collection
    */
    public function model(array $row)
    {
        try{
            if($row[1] == 'SecName')
                return null;
            if($row[0] == null)
                return null;
            return Section::firstOrCreate([
                            //
                            'section_id' => $row[0],
                            'name' => $row[1],
                            'department_id' => Department::where('department_id', str_replace('O', '0', $row[2]))->first()->id,
                        ]);
        }catch(\Exception $e){
            dd($e, $row);
            return null;
        }
        //
    }
}
