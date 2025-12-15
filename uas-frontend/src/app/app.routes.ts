import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Signup } from './pages/signup/signup';
import { Profile } from './pages/profile/profile';
import { StudentFees } from './pages/student-fees/student-fees';
import { StaffPayroll } from './pages/staff-payroll/staff-payroll';
import { DepartmentBudget } from './pages/department-budget/department-budget';
import { NotFound } from './pages/not-found/not-found';

import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { path: 'profile', component: Profile, canActivate: [authGuard] }, // Any logged in user
  
  // Student Fees: Students, Admin, Accounting (NOT Staff)
  { 
    path: 'student-fees', 
    component: StudentFees, 
    canActivate: [authGuard], 
    data: { roles: ['student', 'admin', 'accounting'] } 
  },
  
  // Staff Payroll: Admin, Accounting, Staff
  { 
    path: 'staff-payroll', 
    component: StaffPayroll, 
    canActivate: [authGuard], 
    data: { roles: ['admin', 'accounting', 'staff'] } 
  },
  
  // Department Budget: Admin, Accounting (NOT Student)
  { 
    path: 'department-budget', 
    component: DepartmentBudget, 
    canActivate: [authGuard], 
    data: { roles: ['admin', 'accounting'] } 
  },
  { path: '**', component: NotFound }
];
