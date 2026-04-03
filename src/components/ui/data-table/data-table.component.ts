import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TableColumn {
  key: string;
  label: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
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
            <th *ngIf="selectable" class="checkbox-cell" style="width: 40px">
              <input type="checkbox"
                [checked]="allSelected"
                [indeterminate]="someSelected && !allSelected"
                (change)="toggleAll()" />
            </th>
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
            <td *ngIf="selectable" class="checkbox-cell" (click)="$event.stopPropagation()">
              <input type="checkbox"
                [checked]="isSelected(row)"
                (change)="toggleRow(row)" />
            </td>
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
    .checkbox-cell {
      width: 40px;
      text-align: center;
    }
    .checkbox-cell input[type="checkbox"] {
      cursor: pointer;
      width: 16px;
      height: 16px;
    }
  `]
})
export class DataTableComponent implements OnChanges {
  @Input() columns: TableColumn[] = [];
  @Input() rows: Record<string, any>[] = [];
  @Input() selectable = false;
  @Input() rowIdKey = 'id';
  @Output() rowClick = new EventEmitter<Record<string, any>>();
  @Output() selectionChange = new EventEmitter<Record<string, any>[]>();

  selectedIds = new Set<string>();

  get allSelected(): boolean {
    return this.rows.length > 0 && this.selectedIds.size === this.rows.length;
  }

  get someSelected(): boolean {
    return this.selectedIds.size > 0;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rows']) {
      const currentIds = new Set(this.rows.map(r => r[this.rowIdKey] as string));
      for (const id of this.selectedIds) {
        if (!currentIds.has(id)) {
          this.selectedIds.delete(id);
        }
      }
      this.emitSelection();
    }
  }

  isSelected(row: Record<string, any>): boolean {
    return this.selectedIds.has(row[this.rowIdKey] as string);
  }

  toggleRow(row: Record<string, any>): void {
    const id = row[this.rowIdKey] as string;
    if (this.selectedIds.has(id)) {
      this.selectedIds.delete(id);
    } else {
      this.selectedIds.add(id);
    }
    this.emitSelection();
  }

  toggleAll(): void {
    if (this.allSelected) {
      this.selectedIds.clear();
    } else {
      for (const row of this.rows) {
        this.selectedIds.add(row[this.rowIdKey] as string);
      }
    }
    this.emitSelection();
  }

  private emitSelection(): void {
    const selected = this.rows.filter(r => this.selectedIds.has(r[this.rowIdKey] as string));
    this.selectionChange.emit(selected);
  }
}
