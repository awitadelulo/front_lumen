import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  templateUrl: './kpi-card.component.html',
  styleUrl: './kpi-card.component.css',
})
export class KpiCardComponent {
  readonly title = input.required<string>();
  readonly value = input.required<number>();
  readonly currency = input<string>('$');
  readonly suffix = input<string>('');
  readonly monthName = input<string>('');
  // true para KPIs de egresos/gastos: invierte la lógica de color (aumento = rojo, disminución = verde)
  readonly esEgreso = input<boolean>(false);

  protected readonly formattedValue = computed(() => {
    const amount = this.value();
    const esPorcentaje = this.suffix() === '%';
    const hasDecimals = esPorcentaje && !Number.isInteger(amount);
    const formatted = new Intl.NumberFormat('es-CO', {
      minimumFractionDigits: 0,
      maximumFractionDigits: hasDecimals ? 2 : 0,
    }).format(amount);
    return `${this.currency()}${formatted}${this.suffix()}`;
  });

  protected readonly displayTitle = computed(() => {
    const baseTitle = this.title();
    const month = this.monthName();
    if (month && baseTitle.toLowerCase().includes('del mes')) {
      return baseTitle.replace('del mes', `de ${month}`);
    }
    return baseTitle;
  });

  protected readonly isPositive = computed(() => this.value() >= 0);
  protected readonly isNegative = computed(() => this.value() < 0);

  protected readonly isExpense = computed(() => this.esEgreso());

  protected readonly shouldBeRed = computed(() => {
    const isExp = this.isExpense();
    return isExp ? this.isPositive() : this.isNegative();
  });

  protected readonly shouldBeGreen = computed(() => {
    const isExp = this.isExpense();
    return isExp ? this.isNegative() : this.isPositive();
  });
}
