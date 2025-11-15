import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

// shape of the saved user in localStorage
interface UasUser {
  username: string;
  fullname: string;
  email: string;
  password: string;
  creditcard: string;
  prefs: string[];
  picture?: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  // this is what profile.html uses
  user: UasUser = {
    username: '',
    fullname: '',
    email: '',
    password: '',
    creditcard: '',
    prefs: [],
    picture: '',
  };

  // <<< this fixes your error >>>
  last4: string = '';

  constructor(private cookie: CookieService) {}

  ngOnInit(): void {
    // read the user saved by signup.ts
    const saved = localStorage.getItem('UAS_user');

    if (saved) {
      this.user = JSON.parse(saved) as UasUser;

      // compute last 4 digits of the card for display
      if (this.user.creditcard && this.user.creditcard.length >= 4) {
        this.last4 = this.user.creditcard.slice(-4);
      }
    }
  }
}
