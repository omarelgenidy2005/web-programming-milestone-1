<?php

namespace App\Http\Controllers;

use App\Models\DepartmentBudget;
use Illuminate\Http\Request;

class DepartmentBudgetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return DepartmentBudget::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'department_name' => 'required|string',
            'amount' => 'required|numeric',
            'type' => 'required|string|in:income,expense',
        ]);

        return DepartmentBudget::create($validated);
    }

    public function show(DepartmentBudget $departmentBudget)
    {
        return $departmentBudget;
    }

    public function update(Request $request, DepartmentBudget $departmentBudget)
    {
        $departmentBudget->update($request->all());
        return $departmentBudget;
    }

    public function destroy(Request $request, DepartmentBudget $departmentBudget)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        $departmentBudget->delete();
        return response()->noContent();
    }
}
