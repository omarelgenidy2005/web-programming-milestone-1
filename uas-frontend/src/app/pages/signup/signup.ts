import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {

  constructor(private authService: AuthService, private router: Router) {}

  handleSignup(event: any) {
    event.preventDefault();

    const form = event.target;

    const username = form.username.value;
    const email = form.email.value;
    const role = form.role.value;
    const password = form.password.value;
    
    // Use FormData for file uploads (still good to use FormData even without files for consistency, or switch back to JSON)
    const formData = new FormData();
    formData.append('name', username); // Mapping username to name for now as backend expects name
    formData.append('username', username);
    formData.append('email', email);
    formData.append('role', role);
    formData.append('password', password);
    formData.append('password_confirmation', password);

    console.log('Signup: Submitting form');
    this.authService.register(formData).subscribe({
      next: (res) => {
        console.log('Signup: Success', res);
        alert("Account created successfully!");
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Signup: Error', err);
        alert("Signup failed: " + (err.error?.message || err.message));
      }
    });
  }
}
