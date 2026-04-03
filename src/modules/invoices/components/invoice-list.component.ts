import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DataTableComponent, TableColumn, ButtonComponent } from '../../../components/ui';
import { InvoiceService } from '../services/invoice.service';
import { Invoice } from '../models/invoice.model';

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [CommonModule, DataTableComponent, ButtonComponent],
  template: `
    <div class="page-header">
      <h2 class="page-title">Invoices</h2>
      <div class="page-actions">
        <ui-button
          variant="secondary"
          [disabled]="selectedInvoices.length === 0"
          (click)="onExport()">
          Export ({{ selectedInvoices.length }})
        </ui-button>
        <ui-button variant="primary" (click)="onCreate()">
          Submit <!-- DEFECT: should be "Create Invoice" (action verb) -->
        </ui-button>
      </div>
    </div>

    <!-- DEFECT: no empty state handling — table just renders with no rows -->
    <ui-data-table
      [columns]="columns"
      [rows]="invoices"
      [selectable]="true"
      (selectionChange)="onSelectionChange($event)"
      (rowClick)="onRowClick($event)" />
  `,
  styles: [`
    .page-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--space-lg);
    }
    .page-title {
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-bold);
    }
    .page-actions {
      display: flex;
      gap: var(--space-sm);
    }
  `]
})
export class InvoiceListComponent implements OnInit {
  columns: TableColumn[] = [
    { key: 'number', label: 'Invoice #', width: '140px' },
    { key: 'customerName', label: 'Customer' },
    { key: 'issueDate', label: 'Issue Date', width: '120px' },
    { key: 'dueDate', label: 'Due Date', width: '120px' },
    { key: 'amount', label: 'Amount', width: '120px', align: 'right' },
    { key: 'status', label: 'Status', width: '100px' },
  ];
  invoices: Invoice[] = [];
  selectedInvoices: Invoice[] = [];

  constructor(
    private invoiceService: InvoiceService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.invoiceService.getAll().subscribe(data => this.invoices = data);
  }

  onCreate() {
    this.router.navigate(['/invoices/create']);
  }

  onSelectionChange(selected: Record<string, any>[]) {
    this.selectedInvoices = selected as Invoice[];
  }

  onExport() {
    this.invoiceService.exportToCsv(this.selectedInvoices);
  }

  onRowClick(row: Record<string, any>) {
    this.router.navigate(['/invoices', row['id']]);
  }
}
