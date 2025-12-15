import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentFeeService } from '../../services/student-fee.service';
import { AuthService } from '../../services/auth.service';
import { SoundService } from '../../services/sound.service';
import { MonitoringService } from '../../services/monitoring.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-student-fees',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-fees.html',
  styleUrl: './student-fees.css',
})
export class StudentFees implements OnInit {

  invoices: any[] = [];

  showCreateForm = false;
  newInvoice = {
    student_name: '',
    amount: 0,
    due_date: '',
    status: 'Pending'
  };

  constructor(
    private feeService: StudentFeeService, 
    private authService: AuthService,
    private soundService: SoundService,
    private monitoringService: MonitoringService,
    private sessionService: SessionService
  ) {}

  get canCreateInvoice(): boolean {
    const user = this.authService.getUser();
    return user && (user.role === 'admin' || user.role === 'accounting');
  }

  get isStudent(): boolean {
    const user = this.authService.getUser();
    return user && user.role === 'student';
  }

  ngOnInit(): void {
    this.loadFees();
    this.monitoringService.logEvent('Viewed Student Fees');
    // Track session visit
    this.sessionService.trackVisit('Student Fees').subscribe();
  }

  loadFees() {
    this.feeService.getAll().subscribe(data => {
      this.invoices = data.map((item: any) => ({
        id: item.id,
        description: `Student Fee - ${item.student_name}`,
        amount: item.amount,
        status: item.status,
        dueDate: item.due_date,
        original: item // Keep original for updates
      }));
    });
  }

  toggleCreateForm() {
    this.showCreateForm = !this.showCreateForm;
  }

  createInvoice() {
    this.feeService.create(this.newInvoice).subscribe({
      next: () => {
        this.soundService.playSuccessSound();
        alert('Invoice created successfully');
        this.showCreateForm = false;
        this.loadFees();
        // Reset form
        this.newInvoice = { student_name: '', amount: 0, due_date: '', status: 'Pending' };
      },
      error: (err) => {
        console.error('Create Invoice Error:', err);
        alert('Failed to create invoice: ' + (err.error?.message || err.message));
      }
    });
  }

  get isAdmin(): boolean {
    const user = this.authService.getUser();
    return user && user.role === 'admin';
  }

  markAsPaid(invoice: any) {
    if (confirm('Are you sure you want to mark this invoice as Paid?')) {
      const startTime = performance.now();
      const updatedData = { ...invoice.original, status: 'Paid' };
      
      this.feeService.update(invoice.id, updatedData).subscribe(() => {
        const duration = performance.now() - startTime;
        this.monitoringService.logMetric('Transaction: Pay Fee', Math.round(duration));
        
        this.soundService.playSuccessSound();
        alert('Invoice marked as Paid');
        this.loadFees();
      });
    }
  }

  deleteInvoice(invoice: any) {
    if (confirm(`Are you sure you want to delete the invoice for ${invoice.description}?`)) {
      this.feeService.delete(invoice.id).subscribe({
        next: () => {
          alert('Invoice deleted successfully');
          this.loadFees();
        },
        error: (err) => {
          console.error('Delete error:', err);
          alert('Failed to delete invoice');
        }
      });
    }
  }

}
