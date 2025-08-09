import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

interface LoginResponse {
  accessToken: string;
  expiresIn: number; // seconds
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = 'http://localhost:3000/auth';

  constructor(private router: Router, private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http
      .post<LoginResponse>(`${this.api}/login`, { email, password })
      .pipe(
        tap((res) => {
          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('expiresAt', String(Date.now() + res.expiresIn * 1000));
        })
      );
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('expiresAt');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('accessToken');
    const exp = Number(localStorage.getItem('expiresAt'));
    return Boolean(token && exp && Date.now() < exp);
  }
}
