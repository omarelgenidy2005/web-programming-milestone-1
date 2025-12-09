import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffPayrollService } from '../../services/staff-payroll.service';

@Component({
  selector: 'app-staff-payroll',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './staff-payroll.html',
  styleUrl: './staff-payroll.css',
})
export class StaffPayroll implements OnInit {

  payrolls: any[] = [];

  constructor(private payrollService: StaffPayrollService) {}

  ngOnInit(): void {
    this.payrollService.getAll().subscribe(data => {
      this.payrolls = data;
    });
  }

  downloadPayroll(payroll: any) {
    const dataStr = "data:text/json;charset=utf-8," + 
      encodeURIComponent(JSON.stringify(payroll, null, 2));

    const a = document.createElement('a');
    a.href = dataStr;
    a.download = `payroll-${payroll.id}.json`;
    a.click();
  }

}
