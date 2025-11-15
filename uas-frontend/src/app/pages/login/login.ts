import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.css',
  imports: [CommonModule],
})
export class Login {
  loginError: string | null = null;

  constructor(private cookie: CookieService) {}

  handleLogin(event: Event) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const username = (form as any).username.value;
    const password = (form as any).password.value;

    // ✅ use the SAME key as in signup.ts
    const storedUserJson = localStorage.getItem('UAS_user');

    if (!storedUserJson) {
      this.loginError = 'No account found. Please sign up first.';
      return;
    }

    const storedUser = JSON.parse(storedUserJson);

    if (username === storedUser.username && password === storedUser.password) {
      this.loginError = null;

      // Save cookie for profile / navbar
      this.cookie.set('loggedInUser', username);

      alert('Login successful!');
    } else {
      this.loginError = 'Invalid username or password.';
    }
  }
}
