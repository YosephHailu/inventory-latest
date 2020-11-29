<?php

namespace App\Http\Controllers;

use App\Imports\IssueImport;
use App\Imports\MultipleImport;
use App\Imports\MultiplePrevImport;
use App\Imports\ReceiveImport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;

class ImportController extends Controller
{
    //
    public function import(Request $request)
    {
        if ($request->hasFile('file')) {
            $fileNameWithExt = $request->file('file')->getClientOriginalName();
            //Get only file name
            $fileName = pathinfo($fileNameWithExt, PATHINFO_FILENAME);
            //File extension
            $extension = $request->file('file')->getClientOriginalExtension();
            //File name to store
            $fileNameToStore = 'import.' . $extension;
            
            if (Storage::exists($fileNameToStore))
                Storage::delete($fileNameToStore);
            //Upload Image
            $path = $request->file('file')->storeAs('', $fileNameToStore);
            Excel::import(new MultipleImport, $path);
        }

        return response()->json([
            'status' => 'success'
        ]);
    }
    
    public function import_received(Request $request)
    {
        if ($request->hasFile('file')) {
            $fileNameWithExt = $request->file('file')->getClientOriginalName();
            //Get only file name
            $fileName = pathinfo($fileNameWithExt, PATHINFO_FILENAME);
            //File extension
            $extension = $request->file('file')->getClientOriginalExtension();
            //File name to store
            $fileNameToStore = 'import.' . $extension;
            
            if (Storage::exists($fileNameToStore))
                Storage::delete($fileNameToStore);
            //Upload Image
            $path = $request->file('file')->storeAs('', $fileNameToStore);
            Excel::import(new ReceiveImport, $path);
        }

        return response()->json([
            'status' => 'success'
        ]);
    }
    
    
    public function import_issued(Request $request)
    {
        if ($request->hasFile('file')) {
            $fileNameWithExt = $request->file('file')->getClientOriginalName();
            //Get only file name
            $fileName = pathinfo($fileNameWithExt, PATHINFO_FILENAME);
            //File extension
            $extension = $request->file('file')->getClientOriginalExtension();
            //File name to store
            $fileNameToStore = 'import.' . $extension;
            
            if (Storage::exists($fileNameToStore))
                Storage::delete($fileNameToStore);
            //Upload Image
            $path = $request->file('file')->storeAs('', $fileNameToStore);
            Excel::import(new IssueImport, $path);
        }

        return response()->json([
            'status' => 'success'
        ]);
    }
    
    public function Previmport(Request $request)
    {
        if ($request->hasFile('file')) {
            $fileNameWithExt = $request->file('file')->getClientOriginalName();
            //Get only file name
            $fileName = pathinfo($fileNameWithExt, PATHINFO_FILENAME);
            //File extension
            $extension = $request->file('file')->getClientOriginalExtension();
            //File name to store
            $fileNameToStore = 'import.' . $extension;
            
            if (Storage::exists($fileNameToStore))
                Storage::delete($fileNameToStore);
            //Upload Image
            $path = $request->file('file')->storeAs('', $fileNameToStore);
            Excel::import(new MultiplePrevImport, $path);
        }

        return response()->json([
            'status' => 'success'
        ]);
    }
}
