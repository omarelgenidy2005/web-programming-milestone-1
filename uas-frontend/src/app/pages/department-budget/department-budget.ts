import { Component, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Chart from 'chart.js/auto';
import { DepartmentBudgetService } from '../../services/department-budget.service';
import { SoundService } from '../../services/sound.service';
import { SessionService } from '../../services/session.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-department-budget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './department-budget.html',
  styleUrl: './department-budget.css',
})
export class DepartmentBudget implements AfterViewInit, OnInit {

  budget = {
    totalIncome: 0,
    totalExpenses: 0,
    categories: [] as any[]
  };

  newBudget = {
    department_name: '',
    amount: 0,
    type: 'expense' // Default to expense
  };

  constructor(
    private budgetService: DepartmentBudgetService,
    private soundService: SoundService,
    private sessionService: SessionService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchBudgets();
    this.sessionService.trackVisit('Department Budget').subscribe();
  }

  fetchBudgets() {
    this.budgetService.getAll().subscribe(data => {
      this.budget.categories = data.map((item: any) => ({
        id: item.id,
        name: item.department_name,
        amount: parseFloat(item.amount),
        type: item.type
      }));
      this.calculateTotals();
      this.loadChart();
    });
  }

  calculateTotals() {
    this.budget.totalIncome = this.budget.categories
      .filter(c => c.type === 'income')
      .reduce((sum, c) => sum + c.amount, 0);

    this.budget.totalExpenses = this.budget.categories
      .filter(c => c.type === 'expense')
      .reduce((sum, c) => sum + c.amount, 0);
  }

  addBudget() {
    this.budgetService.create(this.newBudget).subscribe({
      next: () => {
        this.soundService.playSuccessSound();
        alert('Budget entry added successfully');
        this.fetchBudgets();
        this.newBudget = { department_name: '', amount: 0, type: 'expense' };
      },
      error: (err) => {
        console.error('Error adding budget:', err);
        alert('Failed to add budget');
      }
    });
  }

  ngAfterViewInit(): void {
    // Chart loading is moved to fetchBudgets to wait for data
  }

  loadChart() {
    const existingChart = Chart.getChart("budgetChart");
    if (existingChart) {
      existingChart.destroy();
    }

    // Filter only expenses for the chart
    const expenses = this.budget.categories.filter(c => c.type === 'expense');

    new Chart("budgetChart", {
      type: 'bar',
      data: {
        labels: expenses.map(c => c.name),
        datasets: [
          {
            label: "Expenses by Department",
            data: expenses.map(c => c.amount),
            backgroundColor: '#4f46e5'
          }
        ]
      }
    });
  }

  get isAdmin(): boolean {
    const user = this.authService.getUser();
    return user && user.role === 'admin';
  }

  deleteBudget(item: any) {
    if (confirm(`Are you sure you want to delete the budget for ${item.name}?`)) {
      this.budgetService.delete(item.id).subscribe({
        next: () => {
          alert('Budget deleted successfully');
          this.fetchBudgets();
        },
        error: (err) => {
          console.error('Delete error:', err);
          alert('Failed to delete budget');
        }
      });
    }
  }

}
