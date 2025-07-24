import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('token'));

  token$ = this.tokenSubject.asObservable();
  isAuthenticated$ = this.token$.pipe(tap((token) => !!token));

  login(data: LoginRequest) {
    return this.http.post<AuthResponse>('/auth/login', data).pipe(
      tap((res) => {
        localStorage.setItem('token', res.access_token);
        this.tokenSubject.next(res.access_token);
      })
    );
  }

  register(data: LoginRequest) {
    return this.http.post<AuthResponse>('/auth/register', data).pipe(
      tap((res) => {
        localStorage.setItem('token', res.access_token);
        this.tokenSubject.next(res.access_token);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
    this.router.navigate(['/login']);
  }

  getToken() {
    return this.tokenSubject.value;
  }
}
