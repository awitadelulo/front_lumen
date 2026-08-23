import { Component, signal } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import {
  FilterConfig,
  FiltersComponent,
} from '../../components/filters/filters.component';
import { KpiCardComponent } from '../../components/kpi-card/kpi-card.component';
import {
  TimeSeries,
  TimeSeriesComponent,
} from '../../components/time-series/time-series.component';
import {
  PieDatum,
  PieChartComponent,
} from '../../components/pie-chart/pie-chart.component';
import {
  TableColumn,
  TableComponent,
  TableRow,
} from '../../components/table/table.component';

@Component({
  selector: 'app-cierre-financiero',
  standalone: true,
  imports: [
    HeaderComponent,
    NavbarComponent,
    FiltersComponent,
    KpiCardComponent,
    TimeSeriesComponent,
    PieChartComponent,
    TableComponent,
  ],
  templateUrl: './cierre-financiero.component.html',
  styleUrl: './cierre-financiero.component.css',
})
export class CierreFinancieroComponent {
  private readonly mesesLabels = [
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

  protected readonly mesSeleccionado = signal<string>('Agosto');

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
    {
      name: 'mes',
      label: 'Mes',
      type: 'select',
      options: [
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
      ],
    },
  ];

  protected onAplicarFiltros(valores: Record<string, string>): void {
    console.log('Filtros aplicados:', valores);
    const mesIndex = valores['mes'] ? parseInt(valores['mes']) - 1 : 7;
    this.mesSeleccionado.set(this.mesesLabels[mesIndex]);
  }

  protected onLimpiarFiltros(valores: Record<string, string>): void {
    console.log('Filtros limpiados:', valores);
    this.mesSeleccionado.set('Agosto');
  }

  protected readonly secciones = [
    {
      title: 'Ventas',
      full: { title: 'Ventas del mes', value: 100000, currency: '$', suffix: '' },
      kpis: [
        {
          title: 'Incremento ventas mes anterior',
          value: 20000,
          currency: '$',
          suffix: '',
        },
        {
          title: '% incremento ventas mes anterior',
          value: 25,
          currency: '',
          suffix: '%',
        },
        {
          title: 'Incremento ventas mes con respecto al año anterior',
          value: 35000,
          currency: '$',
          suffix: '',
        },
        {
          title: '% incremento ventas mes con respecto al año anterior',
          value: 54,
          currency: '',
          suffix: '%',
        },
        {
          title: 'Venta mes acumulado',
          value: 480000,
          currency: '$',
          suffix: '',
        },
        {
          title: '% venta mes acumulado',
          value: 72,
          currency: '',
          suffix: '%',
        },
      ],
    },
    {
      title: 'Gastos',
      full: { title: 'Gastos del mes', value: 50000, currency: '$', suffix: '' },
      kpis: [
        {
          title: 'Incremento gastos mes anterior',
          value: 8000,
          currency: '$',
          suffix: '',
        },
        {
          title: '% incremento gastos mes anterior',
          value: 16,
          currency: '',
          suffix: '%',
        },
        {
          title: 'Incremento gastos mes con respecto al año anterior',
          value: 15000,
          currency: '$',
          suffix: '',
        },
        {
          title: '% incremento gastos mes con respecto al año anterior',
          value: 30,
          currency: '',
          suffix: '%',
        },
        {
          title: 'Gasto mes acumulado',
          value: 240000,
          currency: '$',
          suffix: '',
        },
        {
          title: '% gasto mes acumulado',
          value: 48,
          currency: '',
          suffix: '%',
        },
      ],
    },
  ];

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

  protected readonly ventasMensuales: TimeSeries[] = [
    {
      name: 'Ventas',
      data: [
        80000, 95000, 120000, 110000, 140000, 160000, 155000, 170000, 165000,
        180000, 190000, 210000,
      ],
    },
  ];

  protected readonly gastosMensuales: TimeSeries[] = [
    {
      name: 'Gastos',
      data: [
        40000, 48000, 62000, 55000, 70000, 80000, 75000, 90000, 80000, 90000,
        100000, 110000,
      ],
    },
  ];

  protected readonly acumuladoMensual: TimeSeries[] = [
    {
      name: 'Ventas acumuladas',
      data: [
        80000, 175000, 295000, 405000, 545000, 705000, 860000, 1030000,
        1195000, 1375000, 1565000, 1775000,
      ],
    },
    {
      name: 'Gastos acumulados',
      data: [
        40000, 88000, 150000, 205000, 275000, 355000, 430000, 520000, 600000,
        690000, 790000, 900000,
      ],
    },
  ];

  protected readonly composicionGastos: PieDatum[] = [
    { name: 'Gastos fijos', value: 60 },
    { name: 'Gastos variables', value: 40 },
  ];

  protected readonly composicionGastosFijos: PieDatum[] = [
    { name: 'Arriendo', value: 40 },
    { name: 'Nómina', value: 35 },
    { name: 'Servicios', value: 25 },
  ];

  protected readonly composicionGastosVariables: PieDatum[] = [
    { name: 'Publicidad', value: 45 },
    { name: 'Comisiones', value: 30 },
    { name: 'Transporte', value: 25 },
  ];

  protected readonly topClientesColumns: TableColumn[] = [
    { key: 'nombre', label: 'Nombre', type: 'text' },
    { key: 'peso', label: 'Peso', type: 'percentage' },
    { key: 'plata', label: 'Plata', type: 'currency' },
  ];

  protected readonly topClientesMes: TableRow[] = [
    { nombre: 'Cliente A', peso: 35, plata: 3500000 },
    { nombre: 'Cliente B', peso: 28, plata: 2800000 },
    { nombre: 'Cliente C', peso: 22, plata: 2200000 },
    { nombre: 'Cliente D', peso: 15, plata: 1500000 },
  ];

  protected readonly topClientesAnio: TableRow[] = [
    { nombre: 'Cliente A', peso: 40, plata: 42000000 },
    { nombre: 'Cliente B', peso: 25, plata: 26000000 },
    { nombre: 'Cliente C', peso: 20, plata: 21000000 },
    { nombre: 'Cliente D', peso: 15, plata: 15500000 },
  ];
}
