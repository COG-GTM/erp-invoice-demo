import { TestBed } from '@angular/core/testing';
import { InvoiceService } from './invoice.service';
import { InvoiceFormData } from '../models/invoice.model';
import { firstValueFrom } from 'rxjs';

// Polyfill crypto.randomUUID for JSDOM test environment
if (typeof globalThis.crypto?.randomUUID !== 'function') {
  let counter = 0;
  Object.defineProperty(globalThis.crypto, 'randomUUID', {
    value: () => `00000000-0000-0000-0000-${String(++counter).padStart(12, '0')}`,
  });
}

describe('InvoiceService', () => {
  let service: InvoiceService;

  const validFormData: InvoiceFormData = {
    number: 'INV-001',
    customerName: 'Acme Corp',
    issueDate: '2024-01-15',
    dueDate: '2024-02-15',
    amount: 1500,
    currency: 'USD',
    items: [{ description: 'Consulting', quantity: 10, unitPrice: 150, taxRate: 0 }],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoiceService);
  });

  describe('validate()', () => {
    it('should return no errors for valid data', () => {
      const errors = service.validate(validFormData);
      expect(errors).toEqual([]);
    });

    it('should return error for missing customer name', () => {
      const data: InvoiceFormData = { ...validFormData, customerName: '' };
      const errors = service.validate(data);
      expect(errors).toContain('Invalid customer name');
    });

    it('should return error for whitespace-only customer name', () => {
      const data: InvoiceFormData = { ...validFormData, customerName: '   ' };
      const errors = service.validate(data);
      expect(errors).toContain('Invalid customer name');
    });

    it('should return error for missing issue date', () => {
      const data: InvoiceFormData = { ...validFormData, issueDate: '' };
      const errors = service.validate(data);
      expect(errors).toContain('Issue date is required. Please select a valid date.');
    });

    it('should return error when due date is before issue date', () => {
      const data: InvoiceFormData = { ...validFormData, issueDate: '2024-02-15', dueDate: '2024-01-15' };
      const errors = service.validate(data);
      expect(errors).toContain('Invalid due date');
    });

    it('should return error when due date equals issue date', () => {
      const data: InvoiceFormData = { ...validFormData, issueDate: '2024-01-15', dueDate: '2024-01-15' };
      const errors = service.validate(data);
      expect(errors).toContain('Invalid due date');
    });

    it('should return error for zero amount', () => {
      const data: InvoiceFormData = { ...validFormData, amount: 0 };
      const errors = service.validate(data);
      expect(errors).toContain('Invoice amount must be greater than zero. Please check line items.');
    });

    it('should return error for negative amount', () => {
      const data: InvoiceFormData = { ...validFormData, amount: -100 };
      const errors = service.validate(data);
      expect(errors).toContain('Invoice amount must be greater than zero. Please check line items.');
    });

    it('should return multiple errors for multiple invalid fields', () => {
      const data: InvoiceFormData = { ...validFormData, customerName: '', issueDate: '', amount: 0 };
      const errors = service.validate(data);
      expect(errors.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('create()', () => {
    it('should create an invoice with valid data', () => {
      const invoice = service.create(validFormData);
      expect(invoice.id).toBeDefined();
      expect(invoice.status).toBe('draft');
      expect(invoice.customerName).toBe('Acme Corp');
      expect(invoice.amount).toBe(1500);
    });

    it('should throw when validation fails', () => {
      const data: InvoiceFormData = { ...validFormData, customerName: '' };
      expect(() => service.create(data)).toThrow();
    });

    it('should include all validation errors in thrown message', () => {
      const data: InvoiceFormData = { ...validFormData, customerName: '', amount: 0 };
      expect(() => service.create(data)).toThrow(/Invalid customer name/);
    });
  });

  describe('getAll()', () => {
    it('should return an observable of invoices', async () => {
      const invoices = await firstValueFrom(service.getAll());
      expect(Array.isArray(invoices)).toBe(true);
    });

    it('should include created invoices', async () => {
      service.create(validFormData);
      const invoices = await firstValueFrom(service.getAll());
      expect(invoices.length).toBe(1);
      expect(invoices[0].customerName).toBe('Acme Corp');
    });
  });

  describe('getById()', () => {
    it('should return the invoice by id', () => {
      const created = service.create(validFormData);
      const found = service.getById(created.id);
      expect(found).toBeDefined();
      expect(found!.id).toBe(created.id);
    });

    it('should return undefined for non-existent id', () => {
      expect(service.getById('non-existent')).toBeUndefined();
    });
  });

  describe('delete()', () => {
    it('should remove an invoice', async () => {
      const created = service.create(validFormData);
      service.delete(created.id);
      const invoices = await firstValueFrom(service.getAll());
      expect(invoices.length).toBe(0);
    });

    it('should not affect other invoices', async () => {
      const inv1 = service.create(validFormData);
      const inv2 = service.create({ ...validFormData, customerName: 'Other Corp' });
      service.delete(inv1.id);
      const invoices = await firstValueFrom(service.getAll());
      expect(invoices.length).toBe(1);
      expect(invoices[0].id).toBe(inv2.id);
    });
  });
});
