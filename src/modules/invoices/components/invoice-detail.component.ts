import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonComponent, ModalComponent } from '../../../components/ui';
import { InvoiceService } from '../services/invoice.service';
import { Invoice } from '../models/invoice.model';

@Component({
  selector: 'app-invoice-detail',
  standalone: true,
  imports: [DecimalPipe, ButtonComponent, ModalComponent],
  template: `
    @if (invoice) {
      <div class="detail-page">
        <div class="detail-header">
          <div>
            <h2 class="detail-title">Invoice {{ invoice.number }}</h2>
            <span class="detail-status" [class]="'status--' + invoice.status">
              {{ invoice.status }}
            </span>
          </div>
          <div class="detail-actions">
            <ui-button variant="secondary" (click)="onBack()">Back</ui-button>
            <ui-button variant="danger" (click)="confirmDelete = true">
              Submit <!-- DEFECT: should be "Delete Invoice" (action verb) -->
            </ui-button>
          </div>
        </div>

        <div class="detail-grid">
          <div class="detail-card">
            <h3>Customer</h3>
            <p>{{ invoice.customerName }}</p>
          </div>
          <div class="detail-card">
            <h3>Issue Date</h3>
            <p>{{ invoice.issueDate }}</p>
          </div>
          <div class="detail-card">
            <h3>Due Date</h3>
            <p>{{ invoice.dueDate }}</p>
          </div>
          <div class="detail-card">
            <h3>Amount</h3>
            <p>{{ invoice.amount | number:'1.2-2' }} {{ invoice.currency }}</p>
          </div>
        </div>

        @if (invoice.items.length) {
          <div class="detail-section">
            <h3>Line Items</h3>
            <table class="items-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Qty</th>
                  <th>Unit Price</th>
                  <th>Tax</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                @for (item of invoice.items; track $index) {
                  <tr>
                    <td>{{ item.description }}</td>
                    <td>{{ item.quantity }}</td>
                    <td>{{ item.unitPrice | number:'1.2-2' }}</td>
                    <td>{{ item.taxRate }}%</td>
                    <td>{{ item.quantity * item.unitPrice * (1 + item.taxRate / 100) | number:'1.2-2' }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        }

        <ui-modal [open]="confirmDelete" title="Delete Invoice" (close)="confirmDelete = false">
          <p>Are you sure you want to delete invoice {{ invoice.number }}? This action cannot be undone.</p>
          <div modal-footer>
            <ui-button variant="secondary" (click)="confirmDelete = false">Cancel</ui-button>
            <ui-button variant="danger" (click)="onDelete()">
              Submit <!-- DEFECT: should be "Confirm Delete" (action verb) -->
            </ui-button>
          </div>
        </ui-modal>
      </div>
    } @else {
      <div class="not-found">
        <p>Invoice not found.</p>
        <ui-button variant="secondary" (click)="onBack()">Back to list</ui-button>
      </div>
    }
  `,
  styles: [`
    .detail-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: var(--space-lg);
    }
    .detail-title {
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-bold);
    }
    .detail-status {
      display: inline-block;
      padding: var(--space-xs) var(--space-sm);
      border-radius: var(--radius-full);
      font-size: var(--font-size-xs);
      font-weight: var(--font-weight-semibold);
      text-transform: uppercase;
    }
    .status--draft { background: var(--color-bg-disabled); color: var(--color-text-secondary); }
    .status--sent { background: var(--color-primary-light); color: var(--color-primary); }
    .status--paid { background: #dcfce7; color: var(--color-success); }
    .status--overdue { background: #fef2f2; color: var(--color-error); }
    .status--cancelled { background: var(--color-bg-disabled); color: var(--color-text-disabled); }
    .detail-actions { display: flex; gap: var(--space-sm); }
    .detail-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--space-md);
      margin-bottom: var(--space-lg);
    }
    .detail-card {
      background: var(--color-bg-surface);
      padding: var(--space-md);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
    }
    .detail-card h3 {
      font-size: var(--font-size-xs);
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-secondary);
      text-transform: uppercase;
      margin-bottom: var(--space-xs);
    }
    .detail-section {
      background: var(--color-bg-surface);
      padding: var(--space-md);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
    }
    .detail-section h3 {
      font-size: var(--font-size-md);
      font-weight: var(--font-weight-semibold);
      margin-bottom: var(--space-md);
    }
    .items-table {
      width: 100%;
      border-collapse: collapse;
    }
    .items-table th, .items-table td {
      padding: var(--space-sm);
      text-align: left;
      border-bottom: 1px solid var(--color-border);
      font-size: var(--font-size-sm);
    }
    .items-table th {
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-secondary);
    }
    .not-found {
      text-align: center;
      padding: var(--space-2xl);
      color: var(--color-text-secondary);
    }
  `]
})
export class InvoiceDetailComponent implements OnInit {
  invoice?: Invoice;
  confirmDelete = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private invoiceService: InvoiceService,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.invoice = this.invoiceService.getById(id);
  }

  onBack() { this.router.navigate(['/invoices']); }

  onDelete() {
    if (this.invoice) {
      this.invoiceService.delete(this.invoice.id);
      this.router.navigate(['/invoices']);
    }
  }
}
