import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TableColumn {
  key: string;
  label: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  formatter?: (value: any, row: Record<string, any>) => string;
}

@Component({
  selector: 'ui-data-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="table-wrapper">
      <table class="data-table">
        <thead>
          <tr>
            <th *ngFor="let col of columns"
                [style.width]="col.width"
                [style.text-align]="col.align || 'left'">
              {{ col.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr *ngIf="rows.length === 0">
            <td [attr.colspan]="columns.length" class="empty-state">
              {{ emptyMessage }}
            </td>
          </tr>
          <tr *ngFor="let row of rows"
              (click)="rowClick.emit(row)"
              class="table-row"
              [class.selected]="selectedRow === row">
            <td *ngFor="let col of columns" [style.text-align]="col.align || 'left'">
              {{ col.formatter ? col.formatter(row[col.key], row) : row[col.key] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .table-wrapper {
      background: var(--color-bg-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      overflow: hidden;
    }
    .data-table {
      width: 100%;
      border-collapse: collapse;
    }
    th {
      padding: var(--space-sm) var(--space-md);
      font-size: var(--font-size-xs);
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      background: var(--color-bg-page);
      border-bottom: 1px solid var(--color-border);
    }
    td {
      padding: var(--space-sm) var(--space-md);
      font-size: var(--font-size-sm);
      border-bottom: 1px solid var(--color-border);
    }
    .empty-state {
      text-align: center;
      padding: var(--space-2xl) var(--space-md);
      color: var(--color-text-secondary);
      font-style: italic;
    }
    .table-row {
      cursor: pointer;
      transition: background 0.1s;
    }
    .table-row:hover { background: var(--color-bg-hover); }
    .table-row.selected { background: var(--color-primary-light); }
  `]
})
export class DataTableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() rows: Record<string, any>[] = [];
  @Input() emptyMessage = 'No records found';
  @Input() selectedRow: Record<string, any> | null = null;
  @Output() rowClick = new EventEmitter<Record<string, any>>();
}
