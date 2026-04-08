export interface Invoice {
  id: string;
  number: string;
  customerName: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  currency: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  items: InvoiceItem[];
  notes?: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
}

export type InvoiceFormData = Omit<Invoice, 'id' | 'status'>;

/** Compute the net amount (sum of quantity * unitPrice) for all line items. */
export function computeNetAmount(invoice: Invoice): number {
  if (!invoice.items || invoice.items.length === 0) {
    return Number(invoice.amount);
  }
  return invoice.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
}

/** Compute the tax amount for all line items. */
export function computeTaxAmount(invoice: Invoice): number {
  if (!invoice.items || invoice.items.length === 0) {
    return 0;
  }
  return invoice.items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice * (item.taxRate / 100),
    0,
  );
}

/** Compute the gross amount (net + tax) for all line items. */
export function computeGrossAmount(invoice: Invoice): number {
  return computeNetAmount(invoice) + computeTaxAmount(invoice);
}

/** Format a number as currency with PLN suffix (e.g. "10,000.00 PLN"). */
export function formatCurrency(value: number, currency: string = 'PLN'): string {
  const num = Number(value);
  const formatted = num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${formatted} ${currency}`;
}
