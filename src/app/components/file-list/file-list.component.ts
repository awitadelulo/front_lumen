import { Component, input, model, output, signal } from '@angular/core';

export interface ArchivoCatalogo {
  nombreArchivo: string;
  anio: string;
  meses: string[];
}

export interface SeleccionArchivo {
  nombreArchivo: string;
  anio: string;
  mes: string;
}

@Component({
  selector: 'app-file-list',
  standalone: true,
  templateUrl: './file-list.component.html',
  styleUrl: './file-list.component.css',
})
export class FileListComponent {
  readonly title = input<string>('Lista Archivos');
  readonly archivos = input<ArchivoCatalogo[]>([]);
  readonly selectedFile = model<string | null>(null);

  // mes puntual seleccionado, para distinguirlo de otros meses del mismo archivo
  protected readonly selectedMes = signal<string | null>(null);

  readonly fileSelected = output<SeleccionArchivo>();

  // año expandido actualmente en el acordeón (null = todos colapsados)
  protected readonly expandido = signal<string | null>(null);

  protected toggle(nombreArchivo: string): void {
    this.expandido.update((actual) => (actual === nombreArchivo ? null : nombreArchivo));
  }

  protected isActivo(archivo: ArchivoCatalogo, mes: string): boolean {
    return archivo.nombreArchivo === this.selectedFile() && mes === this.selectedMes();
  }

  protected select(archivo: ArchivoCatalogo, mes: string): void {
    this.selectedFile.set(archivo.nombreArchivo);
    this.selectedMes.set(mes);
    this.fileSelected.emit({ nombreArchivo: archivo.nombreArchivo, anio: archivo.anio, mes });
  }
}
