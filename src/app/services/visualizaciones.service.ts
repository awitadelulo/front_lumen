import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

// incremento_*_ano_anterior y porcentaje_incremento_ano_anterior devuelven "Sin registro" cuando no hay dato histórico
export interface ResumenIngresosDto {
  ano: string;
  mes: string;
  ingresos_mes: number;
  incremento_ingresos_mes_anterior: number;
  porcentaje_incremento_mes_anterior: number;
  incremento_ingresos_ano_anterior: number | string;
  porcentaje_incremento_ano_anterior: number | string;
  ingreso_mes_acumulado: number;
  incremento_acumulado_ano_anterior: number | string;
  porcentaje_incremento_acumulado_ano_anterior: number | string;
}

export interface ResumenEgresosDto {
  ano: string;
  mes: string;
  egresos_mes: number;
  incremento_egresos_mes_anterior: number;
  porcentaje_incremento_mes_anterior: number;
  incremento_egresos_ano_anterior: number | string;
  porcentaje_incremento_ano_anterior: number | string;
  egreso_mes_acumulado: number;
  incremento_acumulado_ano_anterior: number | string;
  porcentaje_incremento_acumulado_ano_anterior: number | string;
}

// Diccionario { "Enero": 22812152.26, "Febrero": ..., ... }
export type RegistroMensualDto = Record<string, number>;

export interface ComposicionEgresoItemDto {
  tipo_egreso: string;
  monto: number;
  porcentaje: number;
}

export interface ComposicionEgresosDto {
  ano: string;
  mes: string;
  total_egresos: number;
  composicion: ComposicionEgresoItemDto[];
}

export interface ComposicionEgresoFijoItemDto {
  nombre_cuenta: string;
  monto: number;
  porcentaje: number;
}

export interface ComposicionEgresosFijosDto {
  ano: string;
  mes: string;
  total_egresos_fijos: number;
  composicion: ComposicionEgresoFijoItemDto[];
}

// Mismo shape que ComposicionEgresoFijoItemDto (nombre_cuenta, monto, porcentaje)
export interface ComposicionEgresosVariosDto {
  ano: string;
  mes: string;
  total_egresos_varios: number;
  composicion: ComposicionEgresoFijoItemDto[];
}

export interface ClienteItemDto {
  cliente: string;
  total_cliente: number;
  peso_porcentual: number;
}

export interface PesoClientesDto {
  ano: string;
  mes: string;
  total_general: number;
  clientes: ClienteItemDto[];
}

export interface ImportanciaClientesAnualDto {
  ano: string;
  total_general: number;
  clientes: ClienteItemDto[];
}

export interface RegistroPeriodoDto {
  cliente: string | null;
  nit: string | null;
  documento: string | null;
  mes: string;
  ano: string;
  total: number;
}

@Injectable({ providedIn: 'root' })
export class VisualizacionesService {
  private readonly baseUrl = `${environment.apiUrl}/visualizaciones`;

  constructor(private http: HttpClient) {}

  getResumenIngresos(ano: string, mes: string): Observable<ResumenIngresosDto> {
    const params = new HttpParams().set('ano', ano).set('mes', mes);
    return this.http.get<ResumenIngresosDto>(`${this.baseUrl}/resumen-ingresos`, { params });
  }

  getResumenEgresos(ano: string, mes: string): Observable<ResumenEgresosDto> {
    const params = new HttpParams().set('ano', ano).set('mes', mes);
    return this.http.get<ResumenEgresosDto>(`${this.baseUrl}/resumen-egresos`, { params });
  }

  getRegistroIngresos(ano: string): Observable<RegistroMensualDto> {
    const params = new HttpParams().set('ano', ano);
    return this.http.get<RegistroMensualDto>(`${this.baseUrl}/registro-ingresos`, { params });
  }

  getRegistroEgresos(ano: string): Observable<RegistroMensualDto> {
    const params = new HttpParams().set('ano', ano);
    return this.http.get<RegistroMensualDto>(`${this.baseUrl}/registro-egresos`, { params });
  }

  getRegistroIngresosAcumulado(ano: string): Observable<RegistroMensualDto> {
    const params = new HttpParams().set('ano', ano);
    return this.http.get<RegistroMensualDto>(`${this.baseUrl}/registro-ingresos-acumulado`, { params });
  }

  getRegistroEgresosAcumulado(ano: string): Observable<RegistroMensualDto> {
    const params = new HttpParams().set('ano', ano);
    return this.http.get<RegistroMensualDto>(`${this.baseUrl}/registro-egresos-acumulado`, { params });
  }

  getRegistroIngresosPorTipo(ano: string, tipoIngreso: string): Observable<RegistroMensualDto> {
    const params = new HttpParams().set('ano', ano).set('tipo_ingreso', tipoIngreso);
    return this.http.get<RegistroMensualDto>(`${this.baseUrl}/registro-ingresos-por-tipo`, { params });
  }

  getRegistroEgresosPorTipo(ano: string, tipoEgreso: string): Observable<RegistroMensualDto> {
    const params = new HttpParams().set('ano', ano).set('tipo_egreso', tipoEgreso);
    return this.http.get<RegistroMensualDto>(`${this.baseUrl}/registro-egresos-por-tipo`, { params });
  }

  getComposicionEgresos(ano: string, mes: string): Observable<ComposicionEgresosDto> {
    const params = new HttpParams().set('ano', ano).set('mes', mes);
    return this.http.get<ComposicionEgresosDto>(`${this.baseUrl}/composicion-egresos`, { params });
  }

  getComposicionEgresosFijos(ano: string, mes: string): Observable<ComposicionEgresosFijosDto> {
    const params = new HttpParams().set('ano', ano).set('mes', mes);
    return this.http.get<ComposicionEgresosFijosDto>(`${this.baseUrl}/composicion-egresos-fijos`, { params });
  }

  getComposicionEgresosVarios(ano: string, mes: string): Observable<ComposicionEgresosVariosDto> {
    const params = new HttpParams().set('ano', ano).set('mes', mes);
    return this.http.get<ComposicionEgresosVariosDto>(`${this.baseUrl}/composicion-egresos-varios`, { params });
  }

  getPesoClientes(ano: string, mes: string): Observable<PesoClientesDto> {
    const params = new HttpParams().set('ano', ano).set('mes', mes);
    return this.http.get<PesoClientesDto>(`${this.baseUrl}/peso-clientes`, { params });
  }

  getImportanciaClientesAnual(ano: string): Observable<ImportanciaClientesAnualDto> {
    const params = new HttpParams().set('ano', ano);
    return this.http.get<ImportanciaClientesAnualDto>(`${this.baseUrl}/importancia-clientes-anual`, { params });
  }

  getTotalPorClasificacionAnual(ano: string, clasificacion: string): Observable<RegistroMensualDto> {
    const params = new HttpParams().set('ano', ano).set('clasificacion', clasificacion);
    return this.http.get<RegistroMensualDto>(`${this.baseUrl}/total-por-clasificacion-anual`, { params });
  }

  getRegistrosPorPeriodo(
    anoInicial: string,
    mesInicial: string,
    anoFinal: string,
    mesFinal: string,
    cliente?: string,
    nit?: string,
    documento?: string
  ): Observable<RegistroPeriodoDto[]> {
    let params = new HttpParams()
      .set('ano_inicial', anoInicial)
      .set('mes_inicial', mesInicial)
      .set('ano_final', anoFinal)
      .set('mes_final', mesFinal);
    if (cliente) {
      params = params.set('cliente', cliente);
    }
    if (nit) {
      params = params.set('nit', nit);
    }
    if (documento) {
      params = params.set('documento', documento);
    }
    return this.http.get<RegistroPeriodoDto[]>(`${this.baseUrl}/registros-por-periodo`, { params });
  }
}
