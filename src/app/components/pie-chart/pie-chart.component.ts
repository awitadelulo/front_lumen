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

export interface PieDatum {
  name: string;
  value: number;
}

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css',
})
export class PieChartComponent implements OnDestroy {
  readonly title = input<string>('');
  readonly data = input<PieDatum[]>([]);
  readonly showLegend = input<boolean>(true);
  readonly showPercentages = input<boolean>(true);

  private readonly canvas =
    viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  private chart?: Chart;

  // Tonalidades corporativas diferenciables para las categorías.
  private readonly palette = [
    '#6F4E37',
    '#4E3524',
    '#A9825F',
    '#C9A876',
    '#0F172A',
    '#64748B',
  ];

  constructor() {
    effect(() => {
      const canvasEl = this.canvas().nativeElement;
      const data = this.data();
      const showLegend = this.showLegend();
      const showPercentages = this.showPercentages();
      this.render(canvasEl, data, showLegend, showPercentages);
    });
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }

  private formatPercent(value: number, total: number): string {
    if (total === 0) {
      return '0%';
    }
    const percent = (value / total) * 100;
    const rounded = Math.round(percent * 10) / 10;
    return `${rounded}%`;
  }

  private render(
    canvas: HTMLCanvasElement,
    data: PieDatum[],
    showLegend: boolean,
    showPercentages: boolean,
  ): void {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    const colors = data.map((_, index) => this.palette[index % this.palette.length]);

    const config: ChartConfiguration<'pie'> = {
      type: 'pie',
      data: {
        labels: data.map((item) => item.name),
        datasets: [
          {
            data: data.map((item) => item.value),
            backgroundColor: colors,
            borderColor: '#ffffff',
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: showLegend,
            position: 'bottom',
            labels: {
              color: '#0F172A',
              usePointStyle: true,
              font: { size: 13 },
              generateLabels: (chart) => {
                const labels = chart.data.labels ?? [];
                return labels.map((label, index) => {
                  const value = data[index]?.value ?? 0;
                  const text = showPercentages
                    ? `${label} — ${this.formatPercent(value, total)}`
                    : `${label}`;
                  return {
                    text,
                    fillStyle: colors[index],
                    strokeStyle: colors[index],
                    pointStyle: 'circle',
                    index,
                  };
                });
              },
            },
          },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const value = ctx.parsed ?? 0;
                const formatted = new Intl.NumberFormat('es-CO', {
                  maximumFractionDigits: 0,
                }).format(value);
                return `${ctx.label}: ${formatted} (${this.formatPercent(value, total)})`;
              },
            },
          },
        },
      },
    };

    if (this.chart) {
      this.chart.data = config.data;
      this.chart.options = config.options ?? {};
      this.chart.update();
      return;
    }

    this.chart = new Chart(canvas, config);
  }
}
