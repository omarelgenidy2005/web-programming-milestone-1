<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DepartmentBudgetController;
use App\Http\Controllers\StaffPayrollController;
use App\Http\Controllers\StudentFeeController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::apiResource('department-budgets', DepartmentBudgetController::class);
    Route::apiResource('staff-payrolls', StaffPayrollController::class);
    Route::apiResource('student-fees', StudentFeeController::class);
});
