import { Component } from '@angular/core';

@Component({
  selector: 'app-staff-payroll',
  templateUrl: './staff-payroll.html',
  styleUrl: './staff-payroll.css',
})
export class StaffPayroll {

  payroll = {
    basicSalary: 12000,
    housingAllowance: 3000,
    transportationAllowance: 1500,
    deductions: 800
  };

  get netSalary() {
    return (
      this.payroll.basicSalary +
      this.payroll.housingAllowance +
      this.payroll.transportationAllowance -
      this.payroll.deductions
    );
  }

  downloadPayroll() {
    const dataStr = "data:text/json;charset=utf-8," + 
      encodeURIComponent(JSON.stringify(this.payroll, null, 2));

    const a = document.createElement('a');
    a.href = dataStr;
    a.download = "payroll-data.json";
    a.click();
  }

}
