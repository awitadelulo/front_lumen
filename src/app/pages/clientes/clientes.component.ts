import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import {
  FilterConfig,
  FiltersComponent,
} from '../../components/filters/filters.component';
import {
  TableColumn,
  TableComponent,
  TableRow,
} from '../../components/table/table.component';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    HeaderComponent,
    NavbarComponent,
    FiltersComponent,
    TableComponent,
  ],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css',
})
export class ClientesComponent {
  private readonly anios: FilterConfig['options'] = [
    { value: '2024', label: '2024' },
    { value: '2025', label: '2025' },
    { value: '2026', label: '2026' },
  ];

  private readonly meses: FilterConfig['options'] = [
    { value: '1', label: 'Enero' },
    { value: '2', label: 'Febrero' },
    { value: '3', label: 'Marzo' },
    { value: '4', label: 'Abril' },
    { value: '5', label: 'Mayo' },
    { value: '6', label: 'Junio' },
    { value: '7', label: 'Julio' },
    { value: '8', label: 'Agosto' },
    { value: '9', label: 'Septiembre' },
    { value: '10', label: 'Octubre' },
    { value: '11', label: 'Noviembre' },
    { value: '12', label: 'Diciembre' },
  ];

  protected readonly filtros: FilterConfig[] = [
    { name: 'mesInicial', label: 'Mes inicial', type: 'select', options: this.meses },
    { name: 'anioInicial', label: 'Año inicial', type: 'select', options: this.anios },
    { name: 'mesFinal', label: 'Mes final', type: 'select', options: this.meses },
    { name: 'anioFinal', label: 'Año final', type: 'select', options: this.anios },
    {
      name: 'cliente',
      label: 'Cliente',
      type: 'select',
      options: [
        { value: 'cliente-a', label: 'Cliente A' },
        { value: 'cliente-b', label: 'Cliente B' },
        { value: 'cliente-c', label: 'Cliente C' },
        { value: 'cliente-d', label: 'Cliente D' },
      ],
    },
    { name: 'nit', label: 'NIT', type: 'text', placeholder: 'Buscar por NIT' },
    {
      name: 'documento',
      label: 'Documento',
      type: 'text',
      placeholder: 'Buscar por documento',
    },
  ];

  protected readonly clientesColumns: TableColumn[] = [
    { key: 'cliente', label: 'Cliente', type: 'text' },
    { key: 'nit', label: 'NIT', type: 'text' },
    { key: 'documento', label: 'Documento', type: 'text' },
    { key: 'mes', label: 'Mes', type: 'text' },
    { key: 'anio', label: 'Año', type: 'text' },
    { key: 'valor', label: 'Valor', type: 'currency' },
  ];

  protected readonly clientesData: TableRow[] = [
    {
      cliente: 'Cliente A',
      nit: '900123456-1',
      documento: '1020304050',
      mes: 'Enero',
      anio: '2026',
      valor: 3500000,
    },
    {
      cliente: 'Cliente B',
      nit: '901654321-2',
      documento: '1030405060',
      mes: 'Enero',
      anio: '2026',
      valor: 2800000,
    },
    {
      cliente: 'Cliente C',
      nit: '902987654-3',
      documento: '1040506070',
      mes: 'Febrero',
      anio: '2026',
      valor: 2200000,
    },
    {
      cliente: 'Cliente D',
      nit: '903456789-4',
      documento: '1050607080',
      mes: 'Febrero',
      anio: '2026',
      valor: 1500000,
    },
  ];

  protected onAplicarFiltros(valores: Record<string, string>): void {
    console.log('Filtros aplicados:', valores);
  }

  protected onLimpiarFiltros(valores: Record<string, string>): void {
    console.log('Filtros limpiados:', valores);
  }

  protected readonly archivos = [
    'movimiento-2023',
    'movimiento-2024',
    'movimiento-2025',
  ];

  protected onArchivoSeleccionado(archivo: string): void {
    console.log('Archivo seleccionado:', archivo);
  }
}
