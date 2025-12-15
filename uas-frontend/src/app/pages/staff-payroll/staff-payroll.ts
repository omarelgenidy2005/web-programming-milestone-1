import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StaffPayrollService } from '../../services/staff-payroll.service';
import { AuthService } from '../../services/auth.service';
import { SoundService } from '../../services/sound.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-staff-payroll',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './staff-payroll.html',
  styleUrl: './staff-payroll.css',
})
export class StaffPayroll implements OnInit {

  payrolls: any[] = [];

  newPayroll = {
    staff_name: '',
    salary: 0,
    allowances: 0,
    deductions: 0
  };

  constructor(
    private payrollService: StaffPayrollService, 
    private authService: AuthService,
    private soundService: SoundService,
    private sessionService: SessionService
  ) {}

  get canCreatePayroll(): boolean {
    const user = this.authService.getUser();
    return user && (user.role === 'admin' || user.role === 'accounting');
  }

  ngOnInit(): void {
    this.loadPayrolls();
    this.sessionService.trackVisit('Staff Payroll').subscribe();
  }

  loadPayrolls() {
    this.payrollService.getAll().subscribe(data => {
      this.payrolls = data;
    });
  }

  addPayroll() {
    this.payrollService.create(this.newPayroll).subscribe({
      next: () => {
        this.soundService.playSuccessSound();
        alert('Payroll entry added successfully');
        this.loadPayrolls();
        this.newPayroll = { staff_name: '', salary: 0, allowances: 0, deductions: 0 };
      },
      error: (err) => {
        console.error('Error adding payroll:', err);
        alert('Failed to add payroll');
      }
    });
  }

  downloadPayroll(payroll: any) {
    const report = {
      ...payroll,
      net_salary: (parseFloat(payroll.salary) + parseFloat(payroll.allowances || 0) - parseFloat(payroll.deductions || 0)).toFixed(2),
      generated_at: new Date().toISOString()
    };

    const dataStr = "data:text/json;charset=utf-8," + 
      encodeURIComponent(JSON.stringify(report, null, 2));

    const a = document.createElement('a');
    a.href = dataStr;
    a.download = `payroll-${payroll.staff_name}-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  }

  get isAdmin(): boolean {
    const user = this.authService.getUser();
    return user && user.role === 'admin';
  }

  deletePayroll(payroll: any) {
    if (confirm(`Are you sure you want to delete the payroll for ${payroll.staff_name}?`)) {
      this.payrollService.delete(payroll.id).subscribe({
        next: () => {
          alert('Payroll deleted successfully');
          this.loadPayrolls();
        },
        error: (err) => {
          console.error('Delete error:', err);
          alert('Failed to delete payroll');
        }
      });
    }
  }

}
