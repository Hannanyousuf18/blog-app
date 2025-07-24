import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private tokenSubject = new BehaviorSubject<string | null>(
    localStorage.getItem('token')
  );

  private baseUrl = environment.apiUrl;

  token$ = this.tokenSubject.asObservable();
  isAuthenticated$ = this.token$.pipe(tap((token) => !!token));

  login(data: LoginRequest) {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/auth/login`, data)
      .pipe(
        tap((res) => {
          localStorage.setItem('token', res.access_token);
          this.tokenSubject.next(res.access_token);
        })
      );
  }

  register(data: RegisterRequest) {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/auth/register`, data)
      .pipe(
        tap((res) => {
          localStorage.setItem('token', res.access_token);
          this.tokenSubject.next(res.access_token);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  getToken() {
    return this.tokenSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
