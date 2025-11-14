import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  styleUrl: './profile.css',
  providers: [CookieService],
})
export class Profile implements OnInit {

  user: any = {};
  last4: string = '';
  username: string = '';

  constructor(private cookie: CookieService) {
    // load saved signup data from localStorage
    const savedData = localStorage.getItem('UAS_user');

    if (savedData) {
      this.user = JSON.parse(savedData);

      const cc: string = this.user.creditcard || '';
      if (cc.length >= 4) {
        this.last4 = cc.slice(-4);
      }
    }
  }

  ngOnInit(): void {
    // ✅ read username from cookie (set during login)
    this.username = this.cookie.get('loggedInUser');
  }
}
