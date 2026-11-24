import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TableColumn {
  key: string;
  label: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

@Component({
    selector: 'ui-data-table',
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
          <!-- DEFECT: no empty state — just renders nothing when rows is empty -->
          <tr *ngFor="let row of rows" (click)="rowClick.emit(row)" class="table-row">
            <td *ngFor="let col of columns" [style.text-align]="col.align || 'left'">
              {{ row[col.key] }}
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
    .table-row {
      cursor: pointer;
      transition: background 0.1s;
    }
    .table-row:hover { background: var(--color-bg-hover); }
  `]
})
export class DataTableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() rows: Record<string, any>[] = [];
  @Output() rowClick = new EventEmitter<Record<string, any>>();
}
