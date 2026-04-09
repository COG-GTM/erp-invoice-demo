export interface Invoice {
  id: string;
  number: string;
  customerName: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  taxAmount: number;
  grossAmount: number;
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
