<?php

namespace App\Imports;

use Maatwebsite\Excel\Concerns\WithMultipleSheets;
use App\Imports\StoreImport;
use App\Imports\SupplierImport;
use App\Imports\DepartmentImport;
use App\Imports\SectionImport;
use Maatwebsite\Excel\Concerns\WithCalculatedFormulas;

class MultipleImport implements WithMultipleSheets, WithCalculatedFormulas
{

    public function sheets(): array
    {
        return [
            'Store' => new StoreImport(),
            'ItemCategory' => new ItemCategoryImport(),
            // 'Item' => new ItemImport(),
            'Supplier' => new SupplierImport(),
            'Department' => new DepartmentImport(),
            'Section' => new SectionImport(),
        ];
    }
}
