import { Component, signal } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FileListComponent } from '../../components/file-list/file-list.component';
import {
  TableColumn,
  TableComponent,
  TableRow,
} from '../../components/table/table.component';

@Component({
  selector: 'app-ingresa-informacion',
  standalone: true,
  imports: [HeaderComponent, NavbarComponent, FileListComponent, TableComponent],
  templateUrl: './ingresa-informacion.component.html',
  styleUrl: './ingresa-informacion.component.css',
})
export class IngresaInformacionComponent {
  protected archivos = signal<string[]>([
    'movimiento-2023',
    'movimiento-2024',
    'movimiento-2025',
  ]);

  protected selectedFile = signal<string>('');

  protected readonly tablaColumns: TableColumn[] = [
    { key: 'ano', label: 'Año', type: 'text' },
    { key: 'mes', label: 'Mes', type: 'text' },
    { key: 'clasificacion', label: 'Clasificacion', type: 'text' },
    { key: 'documento', label: 'Documento', type: 'text' },
    { key: 'nit', label: 'Nit', type: 'text' },
    { key: 'nombreCuenta', label: 'Nombre cuenta', type: 'text' },
    { key: 'detalle', label: 'Detalle', type: 'text' },
    { key: 'debitos', label: 'debitos', type: 'currency' },
    { key: 'creditos', label: 'creditos', type: 'currency' },
    { key: 'total', label: 'total', type: 'currency' },
    { key: 'mesNum', label: 'mes_num', type: 'text' },
    { key: 'tipoIngresoEgreso', label: 'Tipo_ingreso y egreso', type: 'text' },
  ];

  protected tablaData: TableRow[] = [
    {
      ano: '2024',
      mes: 'Enero',
      clasificacion: 'Ingresos',
      documento: '123456789',
      nit: '800123456-7',
      nombreCuenta: 'Servicios Profesionales',
      detalle: 'Asesoría Legal',
      debitos: 5000000,
      creditos: 0,
      total: 5000000,
      mesNum: '01',
      tipoIngresoEgreso: 'Ingreso',
    },
    {
      ano: '2024',
      mes: 'Enero',
      clasificacion: 'Gastos',
      documento: '123456790',
      nit: '800234567-8',
      nombreCuenta: 'Arriendo Oficina',
      detalle: 'Pago Arriendo',
      debitos: 0,
      creditos: 2000000,
      total: -2000000,
      mesNum: '01',
      tipoIngresoEgreso: 'Egreso',
    },
  ];

  protected onArchivoSeleccionado(archivo: string): void {
    this.selectedFile.set(archivo);
  }

  protected onEliminarDocumento(): void {
    const currentSelected = this.selectedFile();
    if (currentSelected) {
      const nuevosArchivos = this.archivos().filter(
        (archivo) => archivo !== currentSelected
      );
      this.archivos.set(nuevosArchivos);
      this.selectedFile.set('');
    }
  }

  protected onAgregarDocumento(): void {
    const nombreNuevo = prompt(
      'Ingresa el nombre del nuevo documento:'
    );
    if (nombreNuevo && nombreNuevo.trim()) {
      const nuevosArchivos = [...this.archivos(), nombreNuevo.trim()];
      this.archivos.set(nuevosArchivos);
      this.selectedFile.set(nombreNuevo.trim());
    }
  }
}
