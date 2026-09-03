import { Component, OnInit, computed, signal } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import {
  ArchivoCatalogo,
  FileListComponent,
  SeleccionArchivo,
} from '../../components/file-list/file-list.component';
import { CatalogosService } from '../../services/catalogos.service';
import { MovimientosService } from '../../services/movimientos.service';
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
export class IngresaInformacionComponent implements OnInit {
  constructor(
    private readonly catalogosService: CatalogosService,
    private readonly movimientosService: MovimientosService
  ) {}

  protected archivos = signal<ArchivoCatalogo[]>([]);

  protected selectedFile = signal<string>('');

  // los meses funcionan como filtro: aquí queda el año/mes/archivo exactos que el usuario eligió
  protected seleccion = signal<SeleccionArchivo | null>(null);

  protected readonly tituloTabla = computed(() => {
    const s = this.seleccion();
    return s ? `${s.nombreArchivo} — ${s.mes} ${s.anio}` : this.selectedFile();
  });

  ngOnInit(): void {
    this.catalogosService.getArchivos().subscribe((archivos) => this.archivos.set(archivos));
  }

  protected readonly tablaColumns: TableColumn[] = [
    { key: 'ano', label: 'Año', type: 'text' },
    { key: 'mes', label: 'Mes', type: 'text' },
    { key: 'nit', label: 'Nit', type: 'text' },
    { key: 'nombreTercero', label: 'Nombre tercero', type: 'text' },
    { key: 'detalle', label: 'Detalle', type: 'text' },
    { key: 'nombreCuenta', label: 'Nombre cuenta', type: 'text' },
    { key: 'codigo', label: 'Codigo', type: 'text' },
    { key: 'documento', label: 'Documento', type: 'text' },
    { key: 'debitos', label: 'debitos', type: 'currency' },
    { key: 'creditos', label: 'creditos', type: 'currency' },
    { key: 'total', label: 'total', type: 'currency' },
  ];

  protected tablaData = signal<TableRow[]>([]);

  protected onArchivoSeleccionado(seleccion: SeleccionArchivo): void {
    this.selectedFile.set(seleccion.nombreArchivo);
    this.seleccion.set(seleccion);
    // nombre_documento filtra por n° de comprobante, NO por el archivo de origen; no se envía aquí
    this.movimientosService
      .getDetalle(seleccion.anio, seleccion.mes)
      .subscribe((detalle) => {
        this.tablaData.set(
          detalle.map((d) => ({
            ano: d.ano ?? '',
            mes: d.mes ?? '',
            nit: d.nit ?? '',
            nombreTercero: d.nombre_tercero ?? '',
            detalle: d.detalle ?? '',
            nombreCuenta: d.nombre_cuenta ?? '',
            codigo: d.codigo ?? '',
            documento: d.documento ?? '',
            debitos: d.debitos ?? 0,
            creditos: d.creditos ?? 0,
            total: d.total ?? 0,
          }))
        );
      });
  }

  protected onEliminarDocumento(): void {
    const currentSelected = this.selectedFile();
    if (currentSelected) {
      const nuevosArchivos = this.archivos().filter(
        (archivo) => archivo.nombreArchivo !== currentSelected
      );
      this.archivos.set(nuevosArchivos);
      this.selectedFile.set('');
      this.seleccion.set(null);
      this.tablaData.set([]);
    }
  }

  protected onAgregarDocumento(): void {
    const nombreNuevo = prompt(
      'Ingresa el nombre del nuevo documento:'
    );
    if (nombreNuevo && nombreNuevo.trim()) {
      const nombre = nombreNuevo.trim();
      const nuevoArchivo: ArchivoCatalogo = {
        nombreArchivo: nombre,
        anio: new Date().getFullYear().toString(),
        meses: [],
      };
      this.archivos.set([...this.archivos(), nuevoArchivo]);
      this.selectedFile.set(nombre);
    }
  }
}
