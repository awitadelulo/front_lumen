import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface MovimientoDto {
  ano: string;
  mes: string;
  clasificacion: string;
  documento: string;
  nit: string;
  nombreCuenta: string;
  detalle: string;
  debitos: number;
  creditos: number;
  total: number;
  mesNum: string;
  tipoIngresoEgreso: string;
}

@Injectable({ providedIn: 'root' })
export class ArchivosService {
  private readonly baseUrl = `${environment.apiUrl}/archivos`;

  constructor(private http: HttpClient) {}

  listar(): Observable<string[]> {
    return this.http.get<string[]>(this.baseUrl);
  }

  obtenerMovimientos(nombreArchivo: string): Observable<MovimientoDto[]> {
    return this.http.get<MovimientoDto[]>(`${this.baseUrl}/${nombreArchivo}/movimientos`);
  }

  subir(archivo: File): Observable<{ nombre: string }> {
    const formData = new FormData();
    formData.append('file', archivo);
    return this.http.post<{ nombre: string }>(this.baseUrl, formData);
  }

  eliminar(nombreArchivo: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${nombreArchivo}`);
  }
}
