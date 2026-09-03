import { Component, computed, input, linkedSignal, output, signal } from '@angular/core';

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
  // muestra un combobox con lista desplegable filtrable en vez de un <select> plano
  searchable?: boolean;
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

  // texto que el usuario va escribiendo en los filtros searchable (separado del value ya seleccionado)
  protected readonly searchText = signal<Record<string, string>>({});
  protected readonly openDropdown = signal<string | null>(null);

  protected onChange(name: string, value: string): void {
    this.values.update((current) => ({ ...current, [name]: value }));
  }

  protected filteredOptions(filter: FilterConfig): FilterOption[] {
    const query = (this.searchText()[filter.name] ?? '').trim().toLowerCase();
    const options = filter.options ?? [];
    if (!query) {
      return options;
    }
    return options.filter((option) => option.label.toLowerCase().includes(query));
  }

  protected onSearchInput(name: string, text: string): void {
    this.searchText.update((current) => ({ ...current, [name]: text }));
    this.onChange(name, text);
    this.openDropdown.set(name);
  }

  protected onSearchFocus(name: string): void {
    this.openDropdown.set(name);
  }

  protected onSearchBlur(): void {
    this.openDropdown.set(null);
  }

  protected onSelectOption(name: string, option: FilterOption): void {
    this.searchText.update((current) => ({ ...current, [name]: option.label }));
    this.onChange(name, option.value);
    this.openDropdown.set(null);
  }

  protected onApply(): void {
    this.apply.emit({ ...this.values() });
  }

  protected onClear(): void {
    const reset = { ...this.initialValues() };
    this.values.set(reset);
    this.searchText.set({});
    this.clear.emit({ ...reset });
  }
}
