import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { MonitoringService } from './monitoring.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient, private monitoringService: MonitoringService) { }

  register(data: any): Observable<any> {
    console.log('AuthService: Registering...', data);
    return this.http.post(`${this.apiUrl}/register`, data, { withCredentials: true }).pipe(
      tap({
        next: (response: any) => {
          console.log('AuthService: Register success', response);
          if (response.user) {
            localStorage.setItem('user', JSON.stringify(response.user));
            this.monitoringService.identifyUser(response.user);
          }
        },
        error: (err) => console.error('AuthService: Register error', err)
      })
    );
  }

  login(data: any): Observable<any> {
    console.log('AuthService: Logging in...', data);
    return this.http.post(`${this.apiUrl}/login`, data, { withCredentials: true }).pipe(
      tap({
        next: (response: any) => {
          console.log('AuthService: Login success', response);
          if (response.user) {
            localStorage.setItem('user', JSON.stringify(response.user));
            this.monitoringService.identifyUser(response.user);
          }
        },
        error: (err) => console.error('AuthService: Login error', err)
      })
    );
  }

  logout(): Observable<any> {
    localStorage.removeItem('user');
    return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true });
  }

  getUser(): any {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
}
