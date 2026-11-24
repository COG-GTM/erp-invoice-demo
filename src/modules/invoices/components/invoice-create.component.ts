import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonComponent, FormFieldComponent } from '../../../components/ui';
import { InvoiceService } from '../services/invoice.service';
import { InvoiceFormData } from '../models/invoice.model';

@Component({
  selector: 'app-invoice-create',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, FormFieldComponent],
  template: `
    <div class="create-page">
      <div class="create-header">
        <h2 class="create-title">New Invoice</h2>
      </div>

      <form class="create-form" (ngSubmit)="onSubmit()">
        <div class="form-grid">
          <ui-form-field
            label="Invoice Number"
            fieldId="number"
            placeholder="e.g. FV/2024/00001"
            [error]="errors['number'] || ''"
            [(ngModel)]="form.number"
            name="number" />

          <ui-form-field
            label="Customer Name"
            fieldId="customerName"
            placeholder="Enter customer name"
            [error]="errors['customerName'] || ''"
            [(ngModel)]="form.customerName"
            name="customerName" />

          <ui-form-field
            label="Issue Date"
            fieldId="issueDate"
            type="date"
            [error]="errors['issueDate'] || ''"
            [(ngModel)]="form.issueDate"
            name="issueDate" />

          <ui-form-field
            label="Due Date"
            fieldId="dueDate"
            type="date"
            [error]="errors['dueDate'] || ''"
            [(ngModel)]="form.dueDate"
            name="dueDate" />

          <ui-form-field
            label="Amount"
            fieldId="amount"
            type="number"
            placeholder="0.00"
            [error]="errors['amount'] || ''"
            [(ngModel)]="form.amount"
            name="amount" />

          <ui-form-field
            label="Currency"
            fieldId="currency"
            placeholder="PLN"
            [(ngModel)]="form.currency"
            name="currency" />
        </div>

        <div class="form-actions">
          <ui-button variant="secondary" type="button" (click)="onCancel()">Cancel</ui-button>
          <ui-button variant="primary" type="submit">
            Submit <!-- DEFECT: should be "Create Invoice" -->
          </ui-button>
        </div>
      </form>

      <div class="error-banner" *ngIf="submitError">
        {{ submitError }}
      </div>
    </div>
  `,
  styles: [`
    .create-header { margin-bottom: var(--space-lg); }
    .create-title {
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-bold);
    }
    .create-form {
      background: var(--color-bg-surface);
      padding: var(--space-lg);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
    }
    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-md);
      margin-bottom: var(--space-lg);
    }
    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: var(--space-sm);
    }
    .error-banner {
      margin-top: var(--space-md);
      padding: var(--space-md);
      background: #fef2f2;
      color: var(--color-error);
      border: 1px solid var(--color-error);
      border-radius: var(--radius-md);
      font-size: var(--font-size-sm);
    }
  `]
})
export class InvoiceCreateComponent {
  form: InvoiceFormData = {
    number: '',
    customerName: '',
    issueDate: '',
    dueDate: '',
    amount: 0,
    currency: 'PLN',
    items: [],
    notes: '',
  };
  errors: Record<string, string> = {};
  submitError = '';

  constructor(
    private invoiceService: InvoiceService,
    private router: Router,
  ) {}

  onSubmit() {
    this.errors = {};
    this.submitError = '';
    try {
      this.invoiceService.create(this.form);
      this.router.navigate(['/invoices']);
    } catch (e: any) {
      this.submitError = e.message;
    }
  }

  onCancel() {
    this.router.navigate(['/invoices']);
  }
}
