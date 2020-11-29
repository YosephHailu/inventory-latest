<?php

namespace App\Imports;

use Maatwebsite\Excel\Concerns\WithMultipleSheets;
use App\Imports\StoreImport;
use App\Imports\SupplierImport;
use App\Imports\_PrevItemImport;
use Maatwebsite\Excel\Concerns\WithCalculatedFormulas;

class MultiplePrevImport implements WithMultipleSheets, WithCalculatedFormulas
{

    public function sheets(): array
    {
        return [
            new _PrevItemCategoryImport(),
            new _PrevSupplierImport(),
            new _PrevDepartmentImport(),
            new _PrevSectionImport(),
            new _PrevStoreImport(),
            new _PrevItemImport(),
            new _PrevReceiveImport(),
            new _PrevIssueImport(),

            //Finished good
            new _PrevFinishedGoodCategoryImport(),
            new _PrevFinishedGoodModelImport(),
            new _PrevFinishedGoodImport(),

            new _PrevFinishedGoodReceiveImport(),
            new _PrevFinishedGoodReceiveDetailImport(),
            new _PrevShopImport(),
            new _PrevFinishedGoodIssueImport(),
            new _PrevFinishedGoodIssueDetailImport(),

            //Shop
            new _PrevShopFGImport(),
            new _PrevFGSaleImport(),
            new _PrevFGSaleDetailImport(),

            // 'Section' => new SectionImport(),
        ];
    }
}
