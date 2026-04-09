import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Invoice, InvoiceFormData } from '../models/invoice.model';

const SEED_INVOICES: Invoice[] = [
  {
    id: '1',
    number: 'FV/2024/00001',
    customerName: 'Acme Sp. z o.o.',
    issueDate: '2024-01-15',
    dueDate: '2024-02-14',
    amount: 10000,
    taxAmount: 2300,
    grossAmount: 12300,
    currency: 'PLN',
    status: 'paid',
    items: [
      { description: 'Consulting services', quantity: 1, unitPrice: 10000, taxRate: 0.23 },
    ],
  },
  {
    id: '2',
    number: 'FV/2024/00002',
    customerName: 'Globex Corporation',
    issueDate: '2024-01-20',
    dueDate: '2024-02-19',
    amount: 5500,
    taxAmount: 1265,
    grossAmount: 6765,
    currency: 'PLN',
    status: 'sent',
    items: [
      { description: 'Software license', quantity: 1, unitPrice: 5500, taxRate: 0.23 },
    ],
  },
];

@Injectable({ providedIn: 'root' })
export class InvoiceService {
  private invoices$ = new BehaviorSubject<Invoice[]>(SEED_INVOICES);

  getAll(): Observable<Invoice[]> {
    return this.invoices$.asObservable();
  }

  getById(id: string): Invoice | undefined {
    return this.invoices$.value.find(inv => inv.id === id);
  }

  create(data: InvoiceFormData): Invoice {
    const errors = this.validate(data);
    if (errors.length > 0) {
      throw new Error(errors.join('; '));
    }
    const invoice: Invoice = {
      ...data,
      id: crypto.randomUUID(),
      status: 'draft',
    };
    this.invoices$.next([...this.invoices$.value, invoice]);
    return invoice;
  }

  update(id: string, data: Partial<InvoiceFormData>): Invoice {
    const invoices = this.invoices$.value;
    const idx = invoices.findIndex(inv => inv.id === id);
    if (idx === -1) throw new Error('Invoice not found');
    const updated = { ...invoices[idx], ...data };
    invoices[idx] = updated;
    this.invoices$.next([...invoices]);
    return updated;
  }

  delete(id: string): void {
    this.invoices$.next(this.invoices$.value.filter(inv => inv.id !== id));
  }

  validate(data: InvoiceFormData): string[] {
    const errors: string[] = [];

    // Rule 1: Customer name required
    if (!data.customerName?.trim()) {
      errors.push('Customer name is required. Please select a customer from the registry.');
    }

    // Rule 2: Issue date required
    if (!data.issueDate) {
      errors.push('Issue date is required. Please select a valid date.');
    }

    // Rule 3: Due date must be after issue date
    if (data.issueDate && data.dueDate && data.dueDate <= data.issueDate) {
      errors.push('Due date must be after the issue date. Please correct the payment terms.');
    }

    // Rule 4: Amount must be positive
    if (data.amount <= 0) {
      errors.push('Invoice amount must be greater than zero. Please check line items.');
    }

    // Rule 5: Invoice number must match pattern XX/YYYY/NNNNN
    const invoiceNumberPattern = /^[A-Z]{2}\/\d{4}\/\d{5}$/;
    if (!invoiceNumberPattern.test(data.number)) {
      errors.push('Invoice number format is invalid. Expected format: XX/YYYY/NNNNN (e.g., FV/2024/00001).');
    }

    // Rule 6: At least one line item required
    // NOTE: Only enforce when items array is explicitly provided (the create form
    // does not yet have a line-item editor, so we skip this check when items is
    // undefined to avoid blocking invoice creation entirely).
    if (data.items && data.items.length === 0) {
      errors.push('At least one line item is required. Please add items to the invoice.');
    }

    return errors;
  }
}
