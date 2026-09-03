import { Component, OnInit, computed, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { HeaderComponent } from '../../components/header/header.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import {
  FilterConfig,
  FiltersComponent,
} from '../../components/filters/filters.component';
import {
  TimeSeries,
  TimeSeriesComponent,
} from '../../components/time-series/time-series.component';
import {
  RegistroMensualDto,
  VisualizacionesService,
} from '../../services/visualizaciones.service';
import { PrediccionesService } from '../../services/predicciones.service';

@Component({
  selector: 'app-presupuesto',
  standalone: true,
  imports: [HeaderComponent, NavbarComponent, FiltersComponent, TimeSeriesComponent],
  templateUrl: './presupuesto.component.html',
  styleUrl: './presupuesto.component.css',
})
export class PresupuestoComponent implements OnInit {
  protected readonly gastosRealApi = signal<RegistroMensualDto | null>(null);
  protected readonly costosRealApi = signal<RegistroMensualDto | null>(null);
  protected readonly ingresoFijoRealApi = signal<RegistroMensualDto | null>(null);
  protected readonly ingresoVarioRealApi = signal<RegistroMensualDto | null>(null);
  protected readonly gastosPrediccionApi = signal<Record<string, number> | null>(null);
  protected readonly costosPrediccionApi = signal<Record<string, number> | null>(null);
  protected readonly ingresoFijoPrediccionApi = signal<Record<string, number> | null>(null);
  protected readonly ingresoVarioPrediccionApi = signal<Record<string, number> | null>(null);
  protected readonly reentrenando = signal<boolean>(false);
  private anioSeleccionado = this.anioActualLabel();

  constructor(
    private readonly visualizacionesService: VisualizacionesService,
    private readonly prediccionesService: PrediccionesService
  ) {}

  ngOnInit(): void {
    this.cargarGastosReal(this.anioActualLabel());
    this.cargarCostosReal(this.anioActualLabel());
    this.cargarIngresoFijoReal(this.anioActualLabel());
    this.cargarIngresoVarioReal(this.anioActualLabel());
    this.cargarGastosPrediccion(this.anioActualLabel());
    this.cargarCostosPrediccion(this.anioActualLabel());
    this.cargarIngresoFijoPrediccion(this.anioActualLabel());
    this.cargarIngresoVarioPrediccion(this.anioActualLabel());
  }

  private anioActualLabel(): string {
    return new Date().getFullYear().toString();
  }

  private cargarGastosReal(anio: string): void {
    this.visualizacionesService
      .getTotalPorClasificacionAnual(anio, 'GASTOS')
      .subscribe((registro) => this.gastosRealApi.set(registro));
  }

  private cargarCostosReal(anio: string): void {
    this.visualizacionesService
      .getTotalPorClasificacionAnual(anio, 'COSTOS')
      .subscribe((registro) => this.costosRealApi.set(registro));
  }

  private cargarIngresoFijoReal(anio: string): void {
    this.visualizacionesService
      .getRegistroIngresosPorTipo(anio, 'Ingreso fijo')
      .subscribe((registro) => this.ingresoFijoRealApi.set(registro));
  }

  private cargarIngresoVarioReal(anio: string): void {
    this.visualizacionesService
      .getRegistroIngresosPorTipo(anio, 'Ingreso vario')
      .subscribe((registro) => this.ingresoVarioRealApi.set(registro));
  }

  private cargarGastosPrediccion(anio: string): void {
    this.prediccionesService
      .getPredicciones('GASTOS', anio)
      .subscribe((prediccion) => this.gastosPrediccionApi.set(prediccion));
  }

  private cargarCostosPrediccion(anio: string): void {
    this.prediccionesService
      .getPredicciones('COSTOS', anio)
      .subscribe((prediccion) => this.costosPrediccionApi.set(prediccion));
  }

  private cargarIngresoFijoPrediccion(anio: string): void {
    this.prediccionesService
      .getPredicciones('Ingreso fijo', anio)
      .subscribe((prediccion) => this.ingresoFijoPrediccionApi.set(prediccion));
  }

  private cargarIngresoVarioPrediccion(anio: string): void {
    this.prediccionesService
      .getPredicciones('Ingreso vario', anio)
      .subscribe((prediccion) => this.ingresoVarioPrediccionApi.set(prediccion));
  }

  protected onReentrenarModelos(): void {
    if (this.reentrenando()) {
      return;
    }
    this.reentrenando.set(true);
    forkJoin([
      this.prediccionesService.recalcular('GASTOS'),
      this.prediccionesService.recalcular('COSTOS'),
      this.prediccionesService.recalcular('Ingreso fijo'),
      this.prediccionesService.recalcular('Ingreso vario'),
    ]).subscribe({
      next: () => {
        this.cargarGastosPrediccion(this.anioSeleccionado);
        this.cargarCostosPrediccion(this.anioSeleccionado);
        this.cargarIngresoFijoPrediccion(this.anioSeleccionado);
        this.cargarIngresoVarioPrediccion(this.anioSeleccionado);
        this.reentrenando.set(false);
      },
      error: () => this.reentrenando.set(false),
    });
  }

  protected readonly filtros: FilterConfig[] = [
    {
      name: 'anio',
      label: 'Año',
      type: 'select',
      options: [
        { value: '2024', label: '2024' },
        { value: '2025', label: '2025' },
        { value: '2026', label: '2026' },
      ],
    },
  ];

  protected onAplicarFiltros(valores: Record<string, string>): void {
    console.log('Filtros aplicados:', valores);
    if (valores['anio']) {
      this.anioSeleccionado = valores['anio'];
      this.cargarGastosReal(valores['anio']);
      this.cargarCostosReal(valores['anio']);
      this.cargarIngresoFijoReal(valores['anio']);
      this.cargarIngresoVarioReal(valores['anio']);
      this.cargarGastosPrediccion(valores['anio']);
      this.cargarCostosPrediccion(valores['anio']);
      this.cargarIngresoFijoPrediccion(valores['anio']);
      this.cargarIngresoVarioPrediccion(valores['anio']);
    }
  }

  protected onLimpiarFiltros(): void {
    this.anioSeleccionado = this.anioActualLabel();
    this.cargarGastosReal(this.anioActualLabel());
    this.cargarCostosReal(this.anioActualLabel());
    this.cargarIngresoFijoReal(this.anioActualLabel());
    this.cargarIngresoVarioReal(this.anioActualLabel());
    this.cargarGastosPrediccion(this.anioActualLabel());
    this.cargarCostosPrediccion(this.anioActualLabel());
    this.cargarIngresoFijoPrediccion(this.anioActualLabel());
    this.cargarIngresoVarioPrediccion(this.anioActualLabel());
  }

  protected readonly meses = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  protected readonly ingresoRealVsPresupuesto: TimeSeries[] = [
    {
      name: 'Ingreso real',
      data: [
        90000, 105000, 130000, 115000, 145000, 160000, 150000, 175000, 168000,
        185000, 195000, 220000,
      ],
    },
    {
      name: 'Ingreso esperado',
      data: [
        100000, 110000, 125000, 120000, 140000, 155000, 160000, 170000, 175000,
        180000, 200000, 210000,
      ],
    },
  ];

  protected readonly gastoRealVsPresupuesto = computed<TimeSeries[]>(() => {
    const real = this.gastosRealApi();
    const prediccion = this.gastosPrediccionApi();
    return [
      { name: 'Gasto real', data: this.meses.map((mes) => real?.[mes] ?? 0) },
      { name: 'Gasto esperado', data: this.meses.map((mes) => prediccion?.[mes] ?? 0) },
    ];
  });

  protected readonly costosRealVsPresupuesto = computed<TimeSeries[]>(() => {
    const real = this.costosRealApi();
    const prediccion = this.costosPrediccionApi();
    return [
      { name: 'Costo real', data: this.meses.map((mes) => real?.[mes] ?? 0) },
      { name: 'Costo esperado', data: this.meses.map((mes) => prediccion?.[mes] ?? 0) },
    ];
  });

  protected readonly ingresosFijos = computed<TimeSeries[]>(() => {
    const real = this.ingresoFijoRealApi();
    const prediccion = this.ingresoFijoPrediccionApi();
    return [
      { name: 'Ingresos fijos reales', data: this.meses.map((mes) => real?.[mes] ?? 0) },
      { name: 'Ingresos fijos esperados', data: this.meses.map((mes) => prediccion?.[mes] ?? 0) },
    ];
  });

  protected readonly ingresosVariables = computed<TimeSeries[]>(() => {
    const real = this.ingresoVarioRealApi();
    const prediccion = this.ingresoVarioPrediccionApi();
    return [
      { name: 'Ingresos variables reales', data: this.meses.map((mes) => real?.[mes] ?? 0) },
      { name: 'Ingresos variables esperados', data: this.meses.map((mes) => prediccion?.[mes] ?? 0) },
    ];
  });
}
