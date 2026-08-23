import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { CierreFinancieroComponent } from './pages/cierre-financiero/cierre-financiero.component';
import { PresupuestoComponent } from './pages/presupuesto/presupuesto.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { IngresaInformacionComponent } from './pages/ingresa-informacion/ingresa-informacion.component';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'cierre-financiero', component: CierreFinancieroComponent },
  { path: 'presupuesto', component: PresupuestoComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'ingresar-informacion', component: IngresaInformacionComponent },
];
