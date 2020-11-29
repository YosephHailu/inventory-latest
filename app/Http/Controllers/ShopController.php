<?php

namespace App\Http\Controllers;

use App\Config;
use App\shop;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class shopController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
        $shops = shop::All();
        $config = Config::first();

        return response()->json([
            'status' => 'success',
            'shops' => $shops,
            'config' => $config,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * shop a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        if ($request->hasFile('picture')) {
            $fileNameWithExt = $request->file('picture')->getClientOriginalName();
            //Get only file name
            $fileName = pathinfo($fileNameWithExt, PATHINFO_FILENAME);
            //File extension
            $extension = $request->file('picture')->getClientOriginalExtension();
            //File name to shop
            $fileNameToshop = $fileName . '_' . time() . '.' . $extension;
            //Upload Image
            $path = $request->file('picture')->storeAs('public/shop', $fileNameToshop);
        } else {
            $fileNameToshop = 'nofile.jpg';
        }

        $request->request->add(['photo' => $fileNameToshop]);

        Shop::create($request->all());

        return response()->json([
            'status' => 'success',
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\shop  $shop
     * @return \Illuminate\Http\Response
     */
    public function show(shop $shop)
    {
        //
        return response()->json([
            'status' => 'success',
            'shop' => $shop,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\shop  $shop
     * @return \Illuminate\Http\Response
     */
    public function edit(shop $shop)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\shop  $shop
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, shop $shop)
    {
        //

        if ($request->hasFile('picture')) {
            $fileNameWithExt = $request->file('picture')->getClientOriginalName();
            //Get only file name
            $fileName = pathinfo($fileNameWithExt, PATHINFO_FILENAME);
            //File extension
            $extension = $request->file('picture')->getClientOriginalExtension();
            //File name to shop
            $fileNameToshop = $fileName . '_' . time() . '.' . $extension;
            //Upload Image
            $path = $request->file('picture')->storeAs('public/shop', $fileNameToshop);

            if (Storage::exists('public/shop/' . $shop->photo))
                Storage::delete('public/shop/' . $shop->photo);
        } else {
            $fileNameToshop = $shop->photo;
        }

        $request->request->add(['photo' => $fileNameToshop]);
        $shop->update($request->all());

        return response()->json([
            'status' => 'success',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\shop  $shop
     * @return \Illuminate\Http\Response
     */
    public function destroy(shop $shop)
    {
        //
        $shop->delete();
        return response()->json([
            'status' => 'success',
        ]);
    }
}
