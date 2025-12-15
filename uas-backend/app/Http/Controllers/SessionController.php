<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SessionController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'page' => 'required|string'
        ]);

        session(['last_visited_page' => $request->page]);

        return response()->json(['message' => 'Session updated']);
    }

    public function get()
    {
        $page = session('last_visited_page', 'None');
        return response()->json(['last_visited_page' => $page]);
    }
}
