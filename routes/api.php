<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::post('login', 'UserController@authenticate');

Route::resource('store', 'StoreController');
Route::resource('item', 'ItemController');
Route::resource('finished_good', 'FinishedGoodController');
Route::resource('shop', 'ShopController');
Route::resource('user', 'UserController');

//Balance
Route::post('updateItemBalance/{item}', 'ItemController@updateItemBalance');
Route::post('updateFinishedGoodBalance/{finishedGood}', 'FinishedGoodController@updateFinishedGoodBalance');

//Configuration
Route::resource('unit', 'UnitController');
Route::resource('itemCategory', 'ItemCategoryController');
Route::resource('supplier', 'SupplierController');
Route::resource('department', 'DepartmentController');
Route::resource('section', 'SectionController');
Route::resource('good_receive', 'GoodReceiveController');
Route::resource('item_receive', 'ItemReceivedController');
Route::resource('issue_item', 'IssueItemController');
Route::resource('item_issue', 'ItemIssuedController');

Route::resource('finished_good_category', 'FinishedGoodCategoryController');
Route::resource('finished_good_model', 'FinishedGoodModelController');
Route::resource('finished_good_receive', 'FGReceiveController');
Route::resource('finished_good_receive_detail', 'FGReceiveDetailController');
Route::resource('finished_good_issue', 'FGIssueController');
Route::resource('finished_good_issue_detail', 'FGIssueDetailController');
Route::resource('finished_good_sale', 'FGSaleController');
Route::resource('finished_good_sale_detail', 'FGSaleDetailController');

Route::resource('finished_good_return', 'FGReturnController');
Route::resource('finished_good_return_detail', 'FGReturnDetailController');

Route::resource('shop_finished_good', 'ShopFGController');

Route::resource('config', 'ConfigController');
Route::resource('company', 'CompanyController');

//Item helper
Route::get('item_received/{item}', 'ItemHelperController@itemReceived');
Route::get('item_issued/{item}', 'ItemHelperController@itemIssued');
Route::get('items', 'ItemController@items');
Route::get('itemOptions', 'ItemHelperController@itemOptions');
Route::get('goodReceiveOptions', 'ItemHelperController@goodReceiveOptions');
Route::get('itemIssueOptions', 'ItemHelperController@itemIssueOptions');

//Finished good helper
Route::get('finishedGoodOptions', 'FinishedGoodHelperController@finishedGoodOptions');
Route::get('finished_goods', 'FinishedGoodController@finishedGoods');
Route::get('finished_good_received/{finished_good}', 'FinishedGoodHelperController@finishedGoodReceived');
Route::get('finished_good_issued/{finished_good}', 'FinishedGoodHelperController@finishedGoodIssued');

//Shop helper
Route::get('shop_finished_goods/{shop}', 'ShopHelperController@shopFinishedGoods');
Route::get('shop_receives/{shop}', 'ShopHelperController@shopReceives');
Route::get('shop_sales/{shop}', 'ShopHelperController@shopSales');
Route::get('shop_sale_details/{shop}', 'ShopHelperController@shopSaleDetails');
Route::get('shop_returns/{shop}', 'ShopHelperController@shopReturns');
Route::get('shop_return_details/{shop}', 'ShopHelperController@shopReturnDetails');

Route::get('shop_finished_good_detail/{shop}/{finishedGood}', 'ShopHelperController@shopFinishedGoodDetail');
Route::get('shop_finished_good_received/{shop}/{finishedGood}', 'ShopHelperController@shopFinishedGoodReceived');
Route::get('shop_finished_good_sold/{shop}/{finishedGood}', 'ShopHelperController@shopFinishedGoodSold');
Route::get('shop_finished_good_returned/{shop}/{finishedGood}', 'ShopHelperController@shopFinishedGoodReturned');

Route::get('closeup', 'JunkController@closeup');
//Dashboard
Route::get('dashboard_statistics', 'DashboardController@statistics');
Route::get('setting', 'DashboardController@setting');

//IMPORT
Route::post('import', 'ImportController@import');
Route::post('prev_data_import', 'ImportController@Previmport');
Route::post('import_received', 'ImportController@import_received');
Route::post('import_issued', 'ImportController@import_issued');

//junk actions
Route::get('revalidate', 'JunkController@revalidate');
