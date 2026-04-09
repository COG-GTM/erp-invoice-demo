import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DataTableComponent, TableColumn, ButtonComponent, ModalComponent } from '../../../components/ui';
import { InvoiceService } from '../services/invoice.service';
import { Invoice } from '../models/invoice.model';

function formatCurrency(value: any, row: any): string {
  const num = Number(value);
  if (isNaN(num)) return String(value);
  return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ' + (row['currency'] || 'PLN');
}

function renderStatusBadge(value: any): string {
  const status = String(value).toLowerCase();
  const labelMap: Record<string, string> = {
    draft: 'Draft',
    sent: 'Sent',
    paid: 'Paid',
    overdue: 'Overdue',
    cancelled: 'Cancelled',
  };
  const classMap: Record<string, string> = {
    draft: 'badge badge--draft',
    sent: 'badge badge--sent',
    paid: 'badge badge--paid',
    overdue: 'badge badge--overdue',
    cancelled: 'badge badge--cancelled',
  };
  const label = labelMap[status] || String(value);
  const cls = classMap[status] || 'badge';
  return `<span class="${cls}">${label}</span>`;
}

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [CommonModule, DataTableComponent, ButtonComponent, ModalComponent],
  template: `
    <div class="page-header">
      <h2 class="page-title">Invoices</h2>
      <div class="toolbar">
        <ui-button variant="primary" (click)="onCreate()">Create Invoice</ui-button>
        <ui-button variant="secondary" (click)="onEdit()" [disabled]="!selectedInvoice">Edit</ui-button>
        <ui-button variant="secondary" (click)="onDeleteConfirm()" [disabled]="!selectedInvoice">Delete</ui-button>
        <ui-button variant="secondary" (click)="onPrint()">Print</ui-button>
        <ui-button variant="secondary" (click)="onExport()">Export</ui-button>
      </div>
    </div>

    <ui-data-table
      [columns]="columns"
      [rows]="invoices"
      [selectedRow]="selectedInvoice"
      (rowClick)="onRowClick($event)" />

    <div class="status-bar">
      Records: {{ invoices.length }} | Filter: None
    </div>

    <ui-modal
      [open]="deleteModalOpen"
      title="Delete Invoice"
      (close)="deleteModalOpen = false">
      <p>Are you sure you want to delete invoice <strong>{{ selectedInvoice?.number }}</strong>?</p>
      <div modal-footer>
        <ui-button variant="secondary" (click)="deleteModalOpen = false">Cancel</ui-button>
        <ui-button variant="danger" (click)="onDeleteConfirmed()">Confirm Delete</ui-button>
      </div>
    </ui-modal>
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
    .toolbar {
      display: flex;
      gap: var(--space-sm);
    }
    .status-bar {
      margin-top: var(--space-sm);
      padding: var(--space-sm) var(--space-md);
      background: var(--color-bg-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      font-size: var(--font-size-xs);
      color: var(--color-text-secondary);
    }
    :host ::ng-deep .badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: var(--radius-full, 9999px);
      font-size: var(--font-size-xs, 12px);
      font-weight: var(--font-weight-medium, 500);
      line-height: 1.5;
    }
    :host ::ng-deep .badge--draft {
      color: var(--color-text-secondary);
      background: var(--color-bg-disabled);
    }
    :host ::ng-deep .badge--sent {
      color: var(--color-primary);
      background: var(--color-primary-light);
    }
    :host ::ng-deep .badge--paid {
      color: var(--color-success);
      background: #dcfce7;
    }
    :host ::ng-deep .badge--overdue {
      color: var(--color-error);
      background: #fef2f2;
    }
    :host ::ng-deep .badge--cancelled {
      color: var(--color-text-disabled);
      background: var(--color-bg-disabled);
    }
  `]
})
export class InvoiceListComponent implements OnInit {
  columns: TableColumn[] = [
    { key: 'number', label: 'Invoice #', width: '140px' },
    { key: 'customerName', label: 'Customer' },
    { key: 'issueDate', label: 'Issue Date', width: '110px' },
    { key: 'dueDate', label: 'Due Date', width: '110px' },
    { key: 'amount', label: 'Net Amount', width: '130px', align: 'right', format: formatCurrency },
    { key: 'taxAmount', label: 'Tax', width: '120px', align: 'right', format: formatCurrency },
    { key: 'grossAmount', label: 'Gross Amount', width: '130px', align: 'right', format: formatCurrency },
    { key: 'status', label: 'Status', width: '110px', render: renderStatusBadge },
  ];
  invoices: Invoice[] = [];
  selectedInvoice: Invoice | null = null;
  deleteModalOpen = false;

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

  onEdit() {
    if (this.selectedInvoice) {
      this.router.navigate(['/invoices', this.selectedInvoice.id]);
    }
  }

  onDeleteConfirm() {
    if (this.selectedInvoice) {
      this.deleteModalOpen = true;
    }
  }

  onDeleteConfirmed() {
    if (this.selectedInvoice) {
      this.invoiceService.delete(this.selectedInvoice.id);
      this.selectedInvoice = null;
      this.deleteModalOpen = false;
    }
  }

  onPrint() {
    window.print();
  }

  onExport() {
    const headers = ['Invoice #', 'Customer', 'Issue Date', 'Due Date', 'Net Amount', 'Tax', 'Gross Amount', 'Status'];
    const rows = this.invoices.map(inv => [
      inv.number,
      inv.customerName,
      inv.issueDate,
      inv.dueDate,
      inv.amount,
      inv.taxAmount,
      inv.grossAmount,
      inv.status,
    ]);
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'invoices.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  onRowClick(row: Record<string, any>) {
    this.selectedInvoice = row as Invoice;
  }
}
