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

  exportToCsv(invoices: Invoice[]): void {
    if (invoices.length === 0) return;

    const headers = ['Invoice #', 'Customer', 'Issue Date', 'Due Date', 'Amount', 'Currency', 'Status'];
    const rows = invoices.map(inv => [
      inv.number,
      inv.customerName,
      inv.issueDate,
      inv.dueDate,
      inv.amount.toString(),
      inv.currency,
      inv.status,
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `invoices-export-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  validate(data: InvoiceFormData): string[] {
    const errors: string[] = [];

    // Rule 1: Customer name required
    if (!data.customerName?.trim()) {
      errors.push('Invalid customer name'); // DEFECT: inconsistent format — should be "[What happened]. [What to do]."
    }

    // Rule 2: Issue date required
    if (!data.issueDate) {
      errors.push('Issue date is required. Please select a valid date.'); // correct format
    }

    // Rule 3: Due date must be after issue date
    if (data.issueDate && data.dueDate && data.dueDate <= data.issueDate) {
      errors.push('Invalid due date'); // DEFECT: inconsistent format
    }

    // Rule 4: Amount must be positive
    if (data.amount <= 0) {
      errors.push('Invoice amount must be greater than zero. Please check line items.'); // correct format
    }

    // DEFECT: Missing Rule 5 from desktop — invoice number must match pattern XX/YYYY/NNNNN
    // DEFECT: Missing Rule 6 from desktop — at least one line item required

    return errors;
  }
}
