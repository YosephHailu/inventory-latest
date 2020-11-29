<?php

namespace App\Imports;

use App\Department;
use App\FGReceive;
use Carbon\Carbon;
use Maatwebsite\Excel\Concerns\ToModel;

class _PrevFinishedGoodReceiveImport implements ToModel
{
    /**
     * @param Collection $collection
     */
    public function model(array $row)
    {
        try {
            $department = Department::where('department_id', $row[6])->get();

            $date = Carbon::now();
            if ($row[2] != null)
                $date = Carbon::parse($row[2]);

            $item = FGReceive::firstOrCreate([
                'receive_id' => $row[1],
            ], [
                'department_id' => $department->first()->id,
                'year' => $date->year, 'month'  => $date->month, 'day' => $date->day
            ]);
        } catch (\Exception $e) {
            dd($e, $row);
            return null;
        }
        //
    }
}
