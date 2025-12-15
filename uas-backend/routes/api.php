<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\StudentFeeController;

use App\Http\Controllers\SessionController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::post('/session/visit', [SessionController::class, 'store']);
    Route::get('/session/last-visited', [SessionController::class, 'get']);

    Route::apiResource('student-fees', StudentFeeController::class);
    Route::apiResource('staff-payrolls', \App\Http\Controllers\StaffPayrollController::class);
    Route::apiResource('department-budgets', \App\Http\Controllers\DepartmentBudgetController::class);
});
