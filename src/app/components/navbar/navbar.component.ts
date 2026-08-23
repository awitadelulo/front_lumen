import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  protected readonly links = [
    { label: 'Inicio', path: '/inicio' },
    { label: 'Cierre Financiero', path: '/cierre-financiero' },
    { label: 'Presupuesto', path: '/presupuesto' },
    { label: 'Clientes', path: '/clientes' },
    { label: 'Ingresar Información', path: '/ingresar-informacion' },
  ];
}
