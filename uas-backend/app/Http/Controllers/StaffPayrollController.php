<?php

namespace App\Http\Controllers;

use App\Models\StaffPayroll;
use Illuminate\Http\Request;

class StaffPayrollController extends Controller
{
    public function index()
    {
        return StaffPayroll::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'staff_name' => 'required|string',
            'position' => 'required|string',
            'salary' => 'required|numeric',
            'payment_date' => 'required|date',
            'status' => 'required|string',
        ]);

        return StaffPayroll::create($validated);
    }

    public function show($id)
    {
        return StaffPayroll::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $payroll = StaffPayroll::findOrFail($id);
        $payroll->update($request->all());
        return $payroll;
    }

    public function destroy($id)
    {
        return StaffPayroll::destroy($id);
    }
}
