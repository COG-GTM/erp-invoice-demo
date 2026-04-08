import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Invoice, InvoiceFormData } from '../models/invoice.model';

@Injectable({ providedIn: 'root' })
export class InvoiceService {
  private invoices$ = new BehaviorSubject<Invoice[]>([]);

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
      errors.push('Customer name is missing. Please enter a valid customer name.');
    }

    // Rule 2: Issue date required
    if (!data.issueDate) {
      errors.push('Issue date is required. Please select a valid date.'); // correct format
    }

    // Rule 3: Due date must be after issue date
    if (data.issueDate && data.dueDate && data.dueDate <= data.issueDate) {
      errors.push('Due date must be after the issue date. Please select a later date.');
    }

    // Rule 4: Amount must be positive
    if (data.amount <= 0) {
      errors.push('Invoice amount must be greater than zero. Please check line items.'); // correct format
    }

    // Rule 5: Invoice number must match pattern XX/YYYY/NNNNN
    const invoiceNumberPattern = /^[A-Z]{2}\/\d{4}\/\d{5}$/;
    if (!data.number || !invoiceNumberPattern.test(data.number)) {
      errors.push('Invoice number format is invalid. Please use the pattern XX/YYYY/NNNNN (e.g. FV/2024/00001).');
    }

    // Rule 6: At least one line item required (skip when amount is provided directly without items)
    if ((!data.items || data.items.length === 0) && !(data.amount > 0)) {
      errors.push('At least one line item is required. Please add an item to the invoice.');
    }

    return errors;
  }
}
