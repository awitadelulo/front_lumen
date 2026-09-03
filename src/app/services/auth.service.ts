import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {
    // Verificar si hay una sesión guardada al iniciar
    this.checkSession();
  }

  private checkSession(): void {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    this.isAuthenticatedSubject.next(isAuthenticated);
  }

  login(usuario: string, password: string): boolean {
    // Credenciales válidas
    const usuarioValido = 'admin';
    const passwordValido = '1234';

    if (usuario === usuarioValido && password === passwordValido) {
      // Guardar sesión en localStorage
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('usuario', usuario);
      this.isAuthenticatedSubject.next(true);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('usuario');
    this.isAuthenticatedSubject.next(false);
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  getUsuario(): string | null {
    return localStorage.getItem('usuario');
  }
}
