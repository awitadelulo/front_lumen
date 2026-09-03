import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent {
  usuario: string = '';
  password: string = '';
  mostrarError: boolean = false;
  mensajeError: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  login() {
    if (this.authService.login(this.usuario, this.password)) {
      // Credenciales correctas - redirigir a Cierre Financiero
      this.mostrarError = false;
      this.router.navigate(['/cierre-financiero']);
    } else {
      // Credenciales incorrectas
      this.mostrarError = true;
      this.mensajeError = 'Usuario o contraseña incorrectos';
    }
  }

  limpiarFormulario() {
    this.usuario = '';
    this.password = '';
    this.mostrarError = false;
  }
}
