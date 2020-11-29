<?php

namespace App\Exports;

use App\Company;
use App\IssueItem;
use App\Item;
use App\ItemIssued;
use DateTime;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithDrawings;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Events\BeforeSheet;
use Maatwebsite\Excel\Sheet;

class ItemIssueExport implements FromQuery, WithMapping, ShouldAutoSize, WithHeadings, WithEvents, WithDrawings
{
    public function __construct(int $section_id = null, $q = null)
    {
        $gregorian = new DateTime();
        $ethipic = new \Andegna\DateTime($gregorian);

        $this->section_id = $section_id;
        $this->q = $q;
        $this->company = Company::first();
        $this->date = $ethipic->format(DATE_COOKIE);
        $this->issue_item_id = null;
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function query()
    {
        //
        $item_issued = ItemIssued::query();

        if ($this->q != null) {
            $items = Item::where('name', 'like', '%' . $this->q . '%')
                ->orWhere('item_id', 'like', '%' . $this->q . '%');
            $issued_tem = IssueItem::where('issue_id', 'like', '%' . $this->q . '%');
            $item_issued->whereIn('item_id', $items->pluck('id'))->orWhereIn('issue_id', $issued_tem->pluck('id'));
        }

        if ($this->section_id != null) {
            $issued_tem = IssueItem::where('section_id', $this->section_id);

            $item_issued->whereIn('issue_item_id', $issued_tem->pluck('id'))->get();
        }

        return $item_issued->OrderByDesc('issue_item_id');
    }
    public function map($item_issued): array
    {
        if ($this->issue_item_id != $item_issued->issue_item_id) {
            $this->issue_item_id = $item_issued->issue_item_id;

            $grn = $item_issued->issueItem->issue_id;
        } else {
            $grn = "";
        }

        return [
            $grn,
            $item_issued->item->item_id ?? "",
            $item_issued->item->name ?? "",
            $item_issued->issueItem->section->name ?? "",
            $item_issued->quantity,
            $item_issued->avg_price,
            $item_issued->issueItem->day . "/" . $item_issued->issueItem->month . "/" . $item_issued->issueItem->year,
        ];
    }
    public function headings(): array
    {
        return [
            'ISSUE ID',
            'Item id',
            'Name',
            'Supplier',
            'Quantity',
            'AVG Price',
            'Date',
        ];
    }

    public function drawings()
    {
        $drawing = new \PhpOffice\PhpSpreadsheet\Worksheet\Drawing();
        $drawing->setName('Logo');
        $drawing->setDescription('Logo');
        $drawing->setPath(public_path('/storage/company/' . $this->company->logo));
        $drawing->setCoordinates('C1');
        $drawing->setHeight(70);
        return $drawing;
    }

    /**
     * @return array
     */
    public function registerEvents(): array
    {
        $styleArray = [
            'font' => [
                'name'      =>  'Calibri',
                'size'      =>  13,
                'bold'      =>  true,
            ],
            'fill' => [
                'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                'startColor' => [
                    'rgb' => 'ffff',
                ]
            ],
        ];

        $sub_header_style = [
            'font' => [
                'name'      =>  'Calibri',
                'size'      =>  12,
                'color'      =>  ['argb' => '929292'],
            ],
            'fill' => [
                'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                'startColor' => [
                    'rgb' => 'ffffff',
                ]
            ],
            'alignment' => [
                'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                'vertical' => \PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER,
                'wrap'         => TRUE
            ],
        ];

        return [
            // Handle by a closure.
            BeforeSheet::class => function (BeforeSheet $event) use ($styleArray, $sub_header_style) {
                $event->sheet->mergeCells('A1:B1');
                $event->sheet->mergeCells('A2:B2');
                $event->sheet->mergeCells('A3:B3');

                $event->sheet->setCellValue('A1', $this->company->name);
                $event->sheet->setCellValue('A2', $this->company->phone);
                $event->sheet->setCellValue('A3', $this->company->email);

                $event->sheet->setCellValue('D1', "ISSUED ITEMS REPORT");
                $event->sheet->setCellValue('D2', $this->company->address);
                $event->sheet->setCellValue('D3', $this->date);
            },

            // Handle by a closure.
            AfterSheet::class => function (AfterSheet $event) use ($styleArray, $sub_header_style) {
                $event->sheet->insertNewRowBefore(4, 1);

                $event->sheet->getStyle('a1:G1')->applyFromArray($styleArray);
                $event->sheet->getStyle('a2:G2')->applyFromArray($sub_header_style);
                $event->sheet->getStyle('a3:G3')->applyFromArray($sub_header_style);
                $event->sheet->getStyle('a4:G4')->applyFromArray($sub_header_style);
                $event->sheet->getStyle('a5:G5')->applyFromArray($styleArray);

                $event->sheet->getStyle('A1:G1000')->applyFromArray([
                    'alignment' => [
                        'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                        'vertical' => \PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER,
                    ],
                ]);

                $event->sheet->getStyle('A5:G5')->applyFromArray([
                    'fill' => [
                        'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                        'startColor' => [
                            'rgb' => 'DFF0D8',
                        ]
                    ],
                ]);

                $event->sheet->getStyle('D1:D3')->applyFromArray([
                    'alignment' => [
                        'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_LEFT,
                    ],
                ]);

                $event->sheet->getColumnDimension('A')->setAutoSize(false);
                $event->sheet->getColumnDimension('B')->setAutoSize(false);
                $event->sheet->getColumnDimension('C')->setAutoSize(false);
                $event->sheet->getColumnDimension('D')->setAutoSize(false);
                $event->sheet->getColumnDimension('A')->setWidth(20);
                $event->sheet->getColumnDimension('B')->setWidth(30);
                $event->sheet->getColumnDimension('C')->setWidth(30);
            },
        ];
    }
}
