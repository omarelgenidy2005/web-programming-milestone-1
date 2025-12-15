<?php

namespace App\Http\Controllers;

use App\Models\StaffPayroll;
use Illuminate\Http\Request;

class StaffPayrollController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user->role === 'staff') {
            return StaffPayroll::where('staff_name', $user->name)
                             ->orWhere('staff_name', $user->username)
                             ->get();
        }

        return StaffPayroll::all();
    }

    public function store(Request $request)
    {
        $user = $request->user();

        if (!in_array($user->role, ['admin', 'accounting'])) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'staff_name' => 'required|string',
            'salary' => 'required|numeric',
            'allowances' => 'nullable|numeric',
            'deductions' => 'nullable|numeric',
        ]);

        return StaffPayroll::create($validated);
    }

    public function show(StaffPayroll $staffPayroll)
    {
        return $staffPayroll;
    }

    public function update(Request $request, StaffPayroll $staffPayroll)
    {
        $staffPayroll->update($request->all());
        return $staffPayroll;
    }

    public function destroy(Request $request, StaffPayroll $staffPayroll)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        $staffPayroll->delete();
        return response()->noContent();
    }
}
