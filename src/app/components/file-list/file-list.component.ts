import { Component, input, model, output } from '@angular/core';

@Component({
  selector: 'app-file-list',
  standalone: true,
  templateUrl: './file-list.component.html',
  styleUrl: './file-list.component.css',
})
export class FileListComponent {
  readonly title = input<string>('Lista Archivos');
  readonly files = input<string[]>([]);
  readonly selectedFile = model<string | null>(null);

  readonly fileSelected = output<string>();

  protected select(file: string): void {
    this.selectedFile.set(file);
    this.fileSelected.emit(file);
  }
}
