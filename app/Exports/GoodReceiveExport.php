<?php

namespace App\Exports;

use App\Company;
use App\GoodReceive;
use App\Item;
use App\ItemReceived;
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

class GoodReceiveExport implements FromQuery, WithMapping, ShouldAutoSize, WithHeadings, WithEvents, WithDrawings
{
    public function __construct(int $supplier_id = null, $q = null)
    {
        $gregorian = new DateTime();
        $ethipic = new \Andegna\DateTime($gregorian);

        $this->supplier_id = $supplier_id;
        $this->q = $q;
        $this->company = Company::first();
        $this->date = $ethipic->format(DATE_COOKIE);
        $this->good_receive_id = null;
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function query()
    {
        //
        $item_received = ItemReceived::query();

        if ($this->q != null) {
            $items = Item::where('name', 'like', '%' . $this->q . '%')
                ->orWhere('item_id', 'like', '%' . $this->q . '%');
            $good_received = GoodReceive::where('good_receive_id', 'like', '%' . $this->q . '%');
            $item_received->whereIn('item_id', $items->pluck('id'))->orWhereIn('good_receive_id', $good_received->pluck('id'));
        }

        if ($this->supplier_id != null) {
            $good_received = GoodReceive::where('supplier_id', $this->supplier_id);

            $item_received->whereIn('good_receive_id', $good_received->pluck('id'))->get();
        }

        return $item_received->OrderByDesc('good_receive_id');
    }
    public function map($item_received): array
    {
        if ($this->good_receive_id != $item_received->good_receive_id) {
            $this->good_receive_id = $item_received->good_receive_id;

            $grn = $item_received->goodReceive->good_receive_id;
        } else {
            $grn = "";
        }

        return [
            $grn,
            $item_received->item->item_id ?? "",
            $item_received->item->name ?? "",
            $item_received->goodReceive->supplier->name ?? "",
            $item_received->quantity,
            $item_received->item_price,
            $item_received->goodReceive->day . "/" . $item_received->goodReceive->month . "/" . $item_received->goodReceive->year,
        ];
    }
    public function headings(): array
    {
        return [
            'GRN',
            'Item id',
            'Name',
            'Supplier',
            'Quantity',
            'Price',
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

                $event->sheet->setCellValue('D1', "RECEIVED GOOD REPORT");
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
