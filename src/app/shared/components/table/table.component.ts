// table.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/buttton.component';

export interface TableColumn<T = any> {
  key: keyof T;      // property of object
  label: string;     // column header
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent<T = any> {
  @Input() data: T[] = [];                 // Generic data array
  @Input() columns: TableColumn<T>[] = []; // Column definitions
  @Input() loading = false;

  @Output() edit = new EventEmitter<T>();
  @Output() delete = new EventEmitter<T>();
}
