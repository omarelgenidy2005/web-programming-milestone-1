<?php

namespace App\Http\Controllers;

use App\Models\DepartmentBudget;
use Illuminate\Http\Request;

class DepartmentBudgetController extends Controller
{
    public function index()
    {
        return DepartmentBudget::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'department_name' => 'required|string',
            'amount' => 'required|numeric',
            'fiscal_year' => 'required|string',
            'description' => 'nullable|string',
        ]);

        return DepartmentBudget::create($validated);
    }

    public function show($id)
    {
        return DepartmentBudget::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $budget = DepartmentBudget::findOrFail($id);
        $budget->update($request->all());
        return $budget;
    }

    public function destroy($id)
    {
        return DepartmentBudget::destroy($id);
    }
}
