import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private apiUrl = 'http://localhost:8000/api/session';

  constructor(private http: HttpClient) { }

  trackVisit(pageName: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/visit`, { page: pageName }, { withCredentials: true });
  }

  getLastVisited(): Observable<any> {
    return this.http.get(`${this.apiUrl}/last-visited`, { withCredentials: true });
  }
}
