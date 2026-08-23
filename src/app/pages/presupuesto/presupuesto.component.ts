import { Component } from '@angular/core';
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

@Component({
  selector: 'app-presupuesto',
  standalone: true,
  imports: [HeaderComponent, NavbarComponent, FiltersComponent, TimeSeriesComponent],
  templateUrl: './presupuesto.component.html',
  styleUrl: './presupuesto.component.css',
})
export class PresupuestoComponent {
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
  }

  protected onLimpiarFiltros(valores: Record<string, string>): void {
    console.log('Filtros limpiados:', valores);
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

  protected readonly gastoRealVsPresupuesto: TimeSeries[] = [
    {
      name: 'Gasto real',
      data: [
        45000, 52000, 66000, 58000, 72000, 82000, 78000, 92000, 84000, 94000,
        102000, 112000,
      ],
    },
    {
      name: 'Gasto esperado',
      data: [
        50000, 55000, 62000, 60000, 70000, 80000, 82000, 88000, 90000, 95000,
        100000, 108000,
      ],
    },
  ];

  protected readonly costosRealVsPresupuesto: TimeSeries[] = [
    {
      name: 'Costo real',
      data: [
        30000, 35000, 44000, 40000, 50000, 55000, 52000, 62000, 58000, 64000,
        70000, 75000,
      ],
    },
    {
      name: 'Costo esperado',
      data: [
        32000, 36000, 42000, 42000, 48000, 54000, 55000, 60000, 62000, 65000,
        68000, 72000,
      ],
    },
  ];

  protected readonly ingresosFijos: TimeSeries[] = [
    {
      name: 'Ingresos fijos reales',
      data: [
        50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000,
        50000, 50000,
      ],
    },
    {
      name: 'Ingresos fijos esperados',
      data: [
        50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000,
        50000, 50000,
      ],
    },
  ];

  protected readonly ingresosVariables: TimeSeries[] = [
    {
      name: 'Ingresos variables reales',
      data: [
        40000, 55000, 80000, 65000, 95000, 110000, 100000, 125000, 118000,
        135000, 145000, 170000,
      ],
    },
    {
      name: 'Ingresos variables esperados',
      data: [
        45000, 60000, 75000, 70000, 90000, 105000, 110000, 120000, 125000,
        130000, 150000, 160000,
      ],
    },
  ];
}
