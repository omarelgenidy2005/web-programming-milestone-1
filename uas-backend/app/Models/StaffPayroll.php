<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StaffPayroll extends Model
{
    protected $fillable = [
        'staff_name',
        'salary',
        'allowances',
        'deductions',
    ];
}
