import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DataTableComponent, TableColumn, ButtonComponent, ModalComponent } from '../../../components/ui';
import { InvoiceService } from '../services/invoice.service';
import {
  Invoice,
  computeNetAmount,
  computeTaxAmount,
  computeGrossAmount,
  formatCurrency,
} from '../models/invoice.model';

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [CommonModule, DataTableComponent, ButtonComponent, ModalComponent],
  template: `
    <div class="page-header">
      <h2 class="page-title">Invoices</h2>
      <div class="toolbar">
        <ui-button variant="primary" (click)="onCreate()">Create Invoice</ui-button>
        <ui-button variant="secondary" [disabled]="!selectedInvoice" (click)="onEdit()">Edit</ui-button>
        <ui-button variant="danger" [disabled]="!selectedInvoice" (click)="confirmDeleteOpen = true">Delete Invoice</ui-button>
        <ui-button variant="secondary" [disabled]="!selectedInvoice" (click)="onPrint()">Print</ui-button>
        <ui-button variant="secondary" (click)="onExport()">Export to CSV</ui-button>
      </div>
    </div>

    <ui-data-table
      [columns]="columns"
      [rows]="tableRows"
      [emptyMessage]="'No invoices found'"
      [selectedRow]="selectedRow"
      (rowClick)="onRowSelect($event)"
      (rowDblClick)="onRowNavigate($event)" />

    <div class="status-bar">
      Records: {{ invoices.length }} | Filter: {{ activeFilter || 'None' }}
    </div>

    <ui-modal [open]="confirmDeleteOpen" title="Delete Invoice" (close)="confirmDeleteOpen = false">
      <p>Are you sure you want to delete invoice {{ selectedInvoice?.number }}? This action cannot be undone.</p>
      <div modal-footer>
        <ui-button variant="secondary" (click)="confirmDeleteOpen = false">Cancel</ui-button>
        <ui-button variant="danger" (click)="onDeleteConfirm()">Confirm Delete</ui-button>
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
      margin-top: var(--space-md);
      padding: var(--space-sm) var(--space-md);
      background: var(--color-bg-page);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-sm);
      font-size: var(--font-size-xs);
      color: var(--color-text-secondary);
    }
  `]
})
export class InvoiceListComponent implements OnInit {
  private currencyFormatter = (value: any, row: Record<string, any>): string => {
    return typeof value === 'string' ? value : formatCurrency(Number(value), row['currency'] || 'PLN');
  };

  columns: TableColumn[] = [
    { key: 'number', label: 'Invoice #', width: '140px' },
    { key: 'customerName', label: 'Customer' },
    { key: 'issueDate', label: 'Issue Date', width: '120px' },
    { key: 'dueDate', label: 'Due Date', width: '120px' },
    { key: 'netAmount', label: 'Net Amount', width: '140px', align: 'right', formatter: this.currencyFormatter },
    { key: 'tax', label: 'Tax', width: '120px', align: 'right', formatter: this.currencyFormatter },
    { key: 'grossAmount', label: 'Gross Amount', width: '140px', align: 'right', formatter: this.currencyFormatter },
    { key: 'status', label: 'Status', width: '100px' },
  ];
  invoices: Invoice[] = [];
  tableRows: Record<string, any>[] = [];
  selectedInvoice: Invoice | null = null;
  selectedRow: Record<string, any> | null = null;
  confirmDeleteOpen = false;
  activeFilter = '';

  constructor(
    private invoiceService: InvoiceService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.invoiceService.getAll().subscribe(data => {
      this.invoices = data;
      this.tableRows = data.map(inv => ({
        ...inv,
        netAmount: formatCurrency(computeNetAmount(inv), inv.currency),
        tax: formatCurrency(computeTaxAmount(inv), inv.currency),
        grossAmount: formatCurrency(computeGrossAmount(inv), inv.currency),
      }));
      if (this.selectedInvoice) {
        const still = data.find(i => i.id === this.selectedInvoice!.id);
        if (!still) {
          this.selectedInvoice = null;
          this.selectedRow = null;
        }
      }
    });
  }

  onCreate() {
    this.router.navigate(['/invoices/create']);
  }

  onEdit() {
    if (this.selectedInvoice) {
      this.router.navigate(['/invoices', this.selectedInvoice.id]);
    }
  }

  onRowSelect(row: Record<string, any>) {
    if (this.selectedRow === row) {
      this.selectedRow = null;
      this.selectedInvoice = null;
    } else {
      this.selectedRow = row;
      this.selectedInvoice = this.invoices.find(i => i.id === row['id']) || null;
    }
  }

  onRowNavigate(row: Record<string, any>) {
    this.router.navigate(['/invoices', row['id']]);
  }

  onDeleteConfirm() {
    if (this.selectedInvoice) {
      this.invoiceService.delete(this.selectedInvoice.id);
      this.selectedInvoice = null;
      this.selectedRow = null;
      this.confirmDeleteOpen = false;
    }
  }

  onPrint() {
    window.print();
  }

  onExport() {
    const dataToExport = this.selectedInvoice
      ? [this.selectedInvoice]
      : this.invoices;

    if (dataToExport.length === 0) return;

    const headers = ['Invoice #', 'Customer', 'Issue Date', 'Due Date', 'Net Amount', 'Tax', 'Gross Amount', 'Status'];
    const csvRows = [headers.join(',')];

    for (const inv of dataToExport) {
      const net = computeNetAmount(inv);
      const tax = computeTaxAmount(inv);
      const gross = computeGrossAmount(inv);
      csvRows.push([
        `"${inv.number.replace(/"/g, '""')}"`,
        `"${inv.customerName.replace(/"/g, '""')}"`,
        inv.issueDate,
        inv.dueDate,
        net.toFixed(2),
        tax.toFixed(2),
        gross.toFixed(2),
        inv.status,
      ].join(','));
    }

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'invoices.csv';
    a.click();
    URL.revokeObjectURL(url);
  }
}
