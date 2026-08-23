import { Component, computed, input, linkedSignal, output } from '@angular/core';

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterConfig {
  name: string;
  label: string;
  type: 'select' | 'text';
  options?: FilterOption[];
  value?: string;
  placeholder?: string;
}

@Component({
  selector: 'app-filters',
  standalone: true,
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css',
})
export class FiltersComponent {
  readonly filters = input<FilterConfig[]>([]);

  readonly apply = output<Record<string, string>>();
  readonly clear = output<Record<string, string>>();

  private readonly initialValues = computed<Record<string, string>>(() => {
    const values: Record<string, string> = {};
    for (const filter of this.filters()) {
      values[filter.name] = filter.value ?? '';
    }
    return values;
  });

  protected readonly values = linkedSignal(() => ({ ...this.initialValues() }));

  protected onChange(name: string, value: string): void {
    this.values.update((current) => ({ ...current, [name]: value }));
  }

  protected onApply(): void {
    this.apply.emit({ ...this.values() });
  }

  protected onClear(): void {
    const reset = { ...this.initialValues() };
    this.values.set(reset);
    this.clear.emit({ ...reset });
  }
}
