import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Signup } from './pages/signup/signup';
import { Profile } from './pages/profile/profile';
import { StudentFees } from './pages/student-fees/student-fees';
import { StaffPayroll } from './pages/staff-payroll/staff-payroll';
import { DepartmentBudget } from './pages/department-budget/department-budget';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { path: 'profile', component: Profile },
  { path: 'student-fees', component: StudentFees },
  { path: 'staff-payroll', component: StaffPayroll },
  { path: 'department-budget', component: DepartmentBudget },
];
