<?php

namespace App\Http\Controllers;

use App\Models\StudentFee;
use Illuminate\Http\Request;

class StudentFeeController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user->role === 'student') {
            // Filter by student name matching the user's name or username
            return StudentFee::where('student_name', $user->name)
                           ->orWhere('student_name', $user->username)
                           ->get();
        }

        if ($user->role === 'staff') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Admin, Accounting see all
        return StudentFee::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'student_name' => 'required|string',
            'amount' => 'required|numeric',
            'due_date' => 'required|date',
            'status' => 'required|string',
        ]);

        return StudentFee::create($validated);
    }

    public function update(Request $request, $id)
    {
        $fee = StudentFee::findOrFail($id);
        $fee->update($request->all());
        return $fee;
    }

    public function destroy(Request $request, $id)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        return StudentFee::destroy($id);
    }
}
