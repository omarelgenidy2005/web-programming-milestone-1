import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.css',
  imports: [CommonModule],
})
export class Login {
  loginError: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  handleLogin(event: Event) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const email = (form as any).email.value;
    const password = (form as any).password.value;

    console.log('Login: Submitting form', { email, password });
    this.authService.login({ email, password }).subscribe({
      next: (res) => {
        console.log('Login: Success', res);
        this.loginError = null;
        alert('Login successful!');
        this.router.navigate(['/department-budget']); // Redirect to a protected page
      },
      error: (err) => {
        console.error('Login: Error', err);
        this.loginError = 'Invalid email or password. Check console for details.';
        alert('Login failed: ' + (err.error?.message || err.message));
      }
    });
  }
}
