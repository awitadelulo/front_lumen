import {
  Component,
  ElementRef,
  effect,
  input,
  viewChild,
  OnDestroy,
} from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

export interface TimeSeries {
  name: string;
  data: number[];
}

@Component({
  selector: 'app-time-series',
  standalone: true,
  templateUrl: './time-series.component.html',
  styleUrl: './time-series.component.css',
})
export class TimeSeriesComponent implements OnDestroy {
  readonly title = input<string>('');
  readonly months = input<string[]>([]);
  readonly series = input<TimeSeries[]>([]);
  readonly yAxisLabel = input<string>('');
  readonly currency = input<boolean>(false);
  readonly showLegend = input<boolean>(true);

  private readonly canvas =
    viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  private chart?: Chart;

  // Tonalidades coherentes con la identidad visual para hasta 3 series.
private readonly palette = [
  '#3A7D44', // Café muy oscuro
  '#C0392B', // Café rojizo
  '#B8651B', // Café caramelo intenso
];

  constructor() {
    effect(() => {
      const canvasEl = this.canvas().nativeElement;
      const months = this.months();
      const series = this.series().slice(0, 3);
      const currency = this.currency();
      const showLegend = this.showLegend();
      const yAxisLabel = this.yAxisLabel();
      this.render(canvasEl, months, series, currency, showLegend, yAxisLabel);
    });
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }

  private formatValue(value: number, currency: boolean): string {
    const formatted = new Intl.NumberFormat('es-CO', {
      maximumFractionDigits: 0,
    }).format(value);
    return currency ? `$${formatted}` : formatted;
  }

  private formatMillions(value: number): string {
    if (value >= 1000000) {
      return (value / 1000000).toFixed(0) + 'M';
    }
    return value.toString();
  }

  private render(
    canvas: HTMLCanvasElement,
    months: string[],
    series: TimeSeries[],
    currency: boolean,
    showLegend: boolean,
    yAxisLabel: string,
  ): void {
    const datasets = series.map((serie, index) => ({
      label: serie.name,
      data: serie.data,
      borderColor: this.palette[index],
      backgroundColor: this.palette[index],
      pointBackgroundColor: this.palette[index],
      pointRadius: 4,
      pointHoverRadius: 6,
      borderWidth: 2,
      tension: 0.3,
      fill: false,
    }));

    const config: ChartConfiguration<'line'> = {
      type: 'line',
      data: { labels: months, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: {
            display: showLegend && series.length > 1,
            position: 'top',
            labels: {
              color: '#0F172A',
              usePointStyle: true,
              font: { size: 13 },
            },
          },
          tooltip: {
            callbacks: {
              label: (ctx) =>
                `${ctx.dataset.label}: ${this.formatValue(ctx.parsed.y ?? 0, currency)}`,
            },
          },
        },
        scales: {
          x: {
            grid: { color: '#E2E8F0' },
            ticks: {
              color: '#64748B',
              font: { size: 14, weight: 'bold' },
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: !!yAxisLabel,
              text: yAxisLabel,
              color: '#64748B',
            },
            grid: { color: '#E2E8F0' },
            ticks: {
              color: '#64748B',
              callback: (value) => this.formatMillions(Number(value)),
            },
          },
        },
      },
    };

    if (this.chart) {
      this.chart.data = config.data;
      this.chart.options = config.options ?? {};
      this.chart.update();
    } else {
      this.chart = new Chart(canvas, config);
    }
  }
}
