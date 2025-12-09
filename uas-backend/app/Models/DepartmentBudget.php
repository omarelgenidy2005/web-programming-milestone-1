<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DepartmentBudget extends Model
{
    protected $fillable = [
        'department_name',
        'amount',
        'fiscal_year',
        'description',
    ];
}
