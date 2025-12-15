import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="not-found-container fade-in">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <a routerLink="/" class="btn">Go Home</a>
    </div>
  `,
  styles: [`
    .not-found-container {
      text-align: center;
      padding: 60px 20px;
      color: var(--text-primary);
    }
    h1 {
      font-size: 6rem;
      margin: 0;
      color: var(--primary-color);
    }
    h2 {
      margin-top: 0;
      margin-bottom: 20px;
    }
    p {
      color: var(--text-secondary);
      margin-bottom: 30px;
    }
  `]
})
export class NotFound {}
