import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { FilterOption } from '../components/filters/filters.component';
import { ArchivoCatalogo } from '../components/file-list/file-list.component';

// El backend reutiliza el mismo shape { id, mes|ano|anio|nombre } para ambos catálogos
interface CatalogoItemDto {
  id: number;
  mes?: string;
  ano?: string;
  anio?: string;
  nombre?: string;
}

interface ArchivoCatalogoDto {
  nombre_archivo: string;
  ano_archivo: string;
  meses: string[];
}

function toFilterOption(item: CatalogoItemDto): FilterOption {
  const label = item.mes ?? item.ano ?? item.anio ?? item.nombre ?? String(item.id);
  return { value: String(item.id), label };
}

@Injectable({ providedIn: 'root' })
export class CatalogosService {
  private readonly baseUrl = `${environment.apiUrl}/catalogos`;

  constructor(private http: HttpClient) {}

  getMeses(): Observable<FilterOption[]> {
    return this.http
      .get<CatalogoItemDto[]>(`${this.baseUrl}/meses`)
      .pipe(map((items) => items.map(toFilterOption)));
  }

  getAnios(): Observable<FilterOption[]> {
    return this.http
      .get<CatalogoItemDto[]>(`${this.baseUrl}/anos`)
      .pipe(map((items) => items.map(toFilterOption)));
  }

  // /catalogos/clientes devuelve un array plano de nombres, sin id
  getClientes(): Observable<FilterOption[]> {
    return this.http
      .get<string[]>(`${this.baseUrl}/clientes`)
      .pipe(map((nombres) => nombres.map((nombre) => ({ value: nombre, label: nombre }))));
  }

  // /catalogos/nits y /catalogos/documentos también devuelven arrays planos de strings
  getNits(): Observable<FilterOption[]> {
    return this.http
      .get<string[]>(`${this.baseUrl}/nits`)
      .pipe(map((nits) => nits.map((nit) => ({ value: nit, label: nit }))));
  }

  getDocumentos(): Observable<FilterOption[]> {
    return this.http
      .get<string[]>(`${this.baseUrl}/documentos`)
      .pipe(map((documentos) => documentos.map((doc) => ({ value: doc, label: doc }))));
  }

  getArchivos(): Observable<ArchivoCatalogo[]> {
    return this.http.get<ArchivoCatalogoDto[]>(`${this.baseUrl}/archivos`).pipe(
      map((items) =>
        items.map((item) => ({
          nombreArchivo: item.nombre_archivo,
          anio: item.ano_archivo,
          meses: item.meses,
        }))
      )
    );
  }
}
