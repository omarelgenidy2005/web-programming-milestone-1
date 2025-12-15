import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  lastVisitedPage: string | null = null;

  constructor(private sessionService: SessionService) {}

  ngOnInit() {
    this.sessionService.getLastVisited().subscribe({
      next: (res) => {
        if (res.last_visited_page && res.last_visited_page !== 'None') {
          this.lastVisitedPage = res.last_visited_page;
        }
      },
      error: () => console.log('No session data or not logged in')
    });
  }
}
