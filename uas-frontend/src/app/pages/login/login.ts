import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  providers: [CookieService],
})
export class Login {
  username: string = '';
  password: string = '';
  loginError: string = '';   // ✅ added

  constructor(
    private router: Router,
    private cookie: CookieService
  ) {}

  login() {
    // clear previous error
    this.loginError = '';

    const savedData = localStorage.getItem('UAS_user');

    if (!savedData) {
      // show error if no user is stored
      this.loginError = 'No user found. Please sign up first.';
      return;
    }

    const user = JSON.parse(savedData);

    if (user.username === this.username && user.password === this.password) {
      alert('Login successful!');

      // ✅ set cookie
      this.cookie.set('loggedInUser', this.username);

      // go to profile page
      this.router.navigate(['/profile']);
    } else {
      // show wrong-credentials error
      this.loginError = 'Invalid username or password.';
    }
  }
}
