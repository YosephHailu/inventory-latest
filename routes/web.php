<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('take_backup', 'junkController@takeBackup');
Route::get('item_export', 'ExportController@exportItem');
Route::get('good_receive_export', 'ExportController@exportGoodReceive');
Route::get('item_issue_export', 'ExportController@exportItemIssue');
Route::get('finished_good_export', 'ExportController@exportFinishedGood');
Route::get('f_g_receive_export', 'ExportController@exportFinishedGoodReceive');
Route::get('f_g_issue_export', 'ExportController@exportFinishedGoodIssue');
Route::get('sales_export/{shop}', 'ExportController@exportSales');

Route::get('/clear-cache', function () {
    $exitCode = Artisan::call('cache:clear');
    $exitCode = Artisan::call('config:clear');
    return "Catch Cleared";
});
Route::get('/{any}', 'RouteController@index')->where('any', '.*');
