import { Component, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { DepartmentBudgetService } from '../../services/department-budget.service';

@Component({
  selector: 'app-department-budget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './department-budget.html',
  styleUrl: './department-budget.css',
})
export class DepartmentBudget implements AfterViewInit, OnInit {

  budget = {
    totalIncome: 100000, // Example fixed income for now
    totalExpenses: 0,
    categories: [] as any[]
  };

  constructor(private budgetService: DepartmentBudgetService) {}

  ngOnInit(): void {
    this.fetchBudgets();
  }

  fetchBudgets() {
    this.budgetService.getAll().subscribe(data => {
      this.budget.categories = data.map((item: any) => ({
        name: item.department_name,
        amount: parseFloat(item.amount)
      }));
      this.calculateTotalExpenses();
      this.loadChart();
    });
  }

  calculateTotalExpenses() {
    this.budget.totalExpenses = this.budget.categories.reduce((sum, cat) => sum + cat.amount, 0);
  }

  ngAfterViewInit(): void {
    // Chart loading is moved to fetchBudgets to wait for data
  }

  loadChart() {
    const existingChart = Chart.getChart("budgetChart");
    if (existingChart) {
      existingChart.destroy();
    }

    new Chart("budgetChart", {
      type: 'bar',
      data: {
        labels: this.budget.categories.map(c => c.name),
        datasets: [
          {
            label: "Expenses by Department",
            data: this.budget.categories.map(c => c.amount),
            backgroundColor: '#4f46e5'
          }
        ]
      }
    });
  }

}
