import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/login-response/login-response.model';
import { RegisterResponse } from '../models/sing-up-response/Register-Response';
import { RegisterRequest } from '../models/sing-up-response/Register-Request';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://apiaire-lk31.onrender.com/api';

  constructor(private http: HttpClient, private router: Router) {}

  // Iniciar sesión
  login(email: string, password: string): Observable<LoginResponse> {
    const body = { email, password };
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, body);
  }
  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  // Registro de usuario
  register(data: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/register`, data);
  }

  // Almacenar token en localStorage
  storeToken(token: string): void {
    localStorage.setItem('authToken', token);
    console.log('token:', token);
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }
  checkAuthentication(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token; // Retorna true si el token existe
  }

  // Cerrar sesión
  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  // Obtener el token del usuario
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }


  requestCambiarPassword(email: string): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/requestCambiarPassword`, { email });
}

// dentro de AuthService
updatePassword(nuevaPassword: string, token: string): Observable<any> {
  const params = { token, nuevaPassword };
  return this.http.get<any>(`${this.apiUrl}/cambiarPassword`, { params });
}


}
