import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-student-fees',
  imports: [NgFor],
  templateUrl: './student-fees.html',
  styleUrl: './student-fees.css',
})
export class StudentFees {


  invoices = [
    { id: 101, description: "Tuition Fees - Fall 2024", amount: 15000, status: "Paid" },
    { id: 102, description: "Library Fees", amount: 600, status: "Pending" },
    { id: 103, description: "Sports Activity Fees", amount: 400, status: "Paid" },
    { id: 104, description: "Lab Fees", amount: 800, status: "Pending" }
  ];

}
