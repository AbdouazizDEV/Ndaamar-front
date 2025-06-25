import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'user' | 'admin';
  createdAt: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadStoredUser();
  }

  private loadStoredUser(): void {
    const token = localStorage.getItem('auth_token');
    const user = localStorage.getItem('current_user');
    
    if (token && user) {
      try {
        const userData = JSON.parse(user);
        this.currentUserSubject.next(userData);
        this.isAuthenticatedSubject.next(true);
      } catch (error) {
        this.clearAuth();
      }
    }
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    // Simulation d'une API - remplacez par votre vraie API
    return of({
      user: {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: credentials.email,
        phone: '+221701234567',
        role: 'user' as const,
        createdAt: new Date()
      },
      token: 'fake-jwt-token-' + Date.now()
    }).pipe(
      tap(response => {
        this.setAuth(response);
      })
    );
  }

  register(userData: RegisterRequest): Observable<AuthResponse> {
    // Simulation d'une API - remplacez par votre vraie API
    return of({
      user: {
        id: 1,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone,
        role: 'user' as const,
        createdAt: new Date()
      },
      token: 'fake-jwt-token-' + Date.now()
    }).pipe(
      tap(response => {
        this.setAuth(response);
      })
    );
  }

  forgotPassword(email: string): Observable<any> {
    // Simulation d'une API - remplacez par votre vraie API
    return of({ message: 'Email envoyé avec succès' });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    // Simulation d'une API - remplacez par votre vraie API
    return of({ message: 'Mot de passe réinitialisé avec succès' });
  }

  logout(): void {
    this.clearAuth();
  }

  private setAuth(response: AuthResponse): void {
    localStorage.setItem('auth_token', response.token);
    localStorage.setItem('current_user', JSON.stringify(response.user));
    this.currentUserSubject.next(response.user);
    this.isAuthenticatedSubject.next(true);
  }

  private clearAuth(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('current_user');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }
} 