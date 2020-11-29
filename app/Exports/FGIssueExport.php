<?php

namespace App\Exports;

use App\Company;
use App\FGIssue;
use App\FinishedGood;
use App\FGIssueDetail;
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

class FGIssueExport implements FromQuery, WithMapping, ShouldAutoSize, WithHeadings, WithEvents, WithDrawings
{
    public function __construct(int $shop_id = null, $q = null)
    {
        $gregorian = new DateTime();
        $ethipic = new \Andegna\DateTime($gregorian);

        $this->shop_id = $shop_id;
        $this->q = $q;
        $this->company = Company::first();
        $this->date = $ethipic->format(DATE_COOKIE);
        $this->f_g_issue_id = null;
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function query()
    {
        //
        $f_g_issue_detail = FGIssueDetail::query();

        if ($this->q != null) {
            $finished_goods = FinishedGood::where('name', 'like', '%' . $this->q . '%')
                ->orWhere('finished_good_id', 'like', '%' . $this->q . '%');
            $issued_tem = FGIssue::where('issue_id', 'like', '%' . $this->q . '%');
            $f_g_issue_detail->whereIn('finished_good_id', $finished_goods->pluck('id'))->orWhereIn('issue_id', $issued_tem->pluck('id'));
        }

        if ($this->shop_id != null) {
            $issued_tem = FGIssue::where('shop_id', $this->shop_id);

            $f_g_issue_detail->whereIn('f_g_issue_id', $issued_tem->pluck('id'))->get();
        }

        return $f_g_issue_detail->OrderByDesc('f_g_issue_id');
    }
    public function map($f_g_issue_detail): array
    {
        if ($this->f_g_issue_id != $f_g_issue_detail->f_g_issue_id) {
            $this->f_g_issue_id = $f_g_issue_detail->f_g_issue_id;

            $grn = $f_g_issue_detail->fGIssue->issue_id;
        } else {
            $grn = "";
        }

        return [
            $grn,
            $f_g_issue_detail->finishedGood->finished_good_id ?? "",
            $f_g_issue_detail->finishedGood->name ?? "",
            $f_g_issue_detail->fGIssue->shop->name ?? "",
            $f_g_issue_detail->quantity,
            number_format($f_g_issue_detail->avg_price, 2),
            $f_g_issue_detail->fGIssue->day . "/" . $f_g_issue_detail->fGIssue->month . "/" . $f_g_issue_detail->fGIssue->year,
        ];
    }
    public function headings(): array
    {
        return [
            'ISSUE ID',
            'Finished good id',
            'Name',
            'Shop',
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

                $event->sheet->setCellValue('D1', "ISSUED FINISHED GOODS REPORT");
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
                $event->sheet->getColumnDimension('D')->setWidth(20);
            },
        ];
    }
}
