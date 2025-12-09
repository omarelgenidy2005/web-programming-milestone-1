import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

// shape of the saved user in localStorage
interface UasUser {
  username: string;
  email: string;
  password: string;
  creditcard: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  user: any = null;
  last4: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();

    if (this.user) {
      // compute last 4 digits of the card for display
      if (this.user.credit_card && this.user.credit_card.length >= 4) {
        this.last4 = this.user.credit_card.slice(-4);
      }
    }
  }
}
