import { Component, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-department-budget',
  templateUrl: './department-budget.html',
  styleUrl: './department-budget.css',
})
export class DepartmentBudget implements AfterViewInit {

  budget = {
    totalIncome: 45000,
    totalExpenses: 32000,
    categories: [
      { name: "Salaries", amount: 20000 },
      { name: "Maintenance", amount: 5000 },
      { name: "Equipment", amount: 7000 },
      { name: "Events", amount: 3000 },
      { name: "Other", amount: 2000 }
    ]
  };

  ngAfterViewInit(): void {
    this.loadChart();
  }

  loadChart() {
    new Chart("budgetChart", {
      type: 'bar',
      data: {
        labels: this.budget.categories.map(c => c.name),
        datasets: [
          {
            label: "Expenses by Category",
            data: this.budget.categories.map(c => c.amount),
            backgroundColor: '#4f46e5'
          }
        ]
      }
    });
  }

}
