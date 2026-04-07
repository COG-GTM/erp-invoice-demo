import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableComponent, TableColumn, ButtonComponent } from '../../../components/ui';
import { InvoiceService } from '../services/invoice.service';
import { Invoice } from '../models/invoice.model';

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [DataTableComponent, ButtonComponent],
  template: `
    <div class="page-header">
      <h2 class="page-title">Invoices</h2>
      <ui-button variant="primary" (click)="onCreate()">
        Submit <!-- DEFECT: should be "Create Invoice" (action verb) -->
      </ui-button>
    </div>

    <!-- DEFECT: no empty state handling — table just renders with no rows -->
    <ui-data-table
      [columns]="columns"
      [rows]="invoices"
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

  onRowClick(row: Record<string, any>) {
    this.router.navigate(['/invoices', row['id']]);
  }
}
