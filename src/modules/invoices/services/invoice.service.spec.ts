import { TestBed } from '@angular/core/testing';
import { InvoiceService } from './invoice.service';
import { InvoiceFormData } from '../models/invoice.model';

describe('InvoiceService', () => {
  let service: InvoiceService;
  const valid: InvoiceFormData = {
    number: 'FV/2024/00001',
    customerName: 'Acme',
    issueDate: '2024-01-01',
    dueDate: '2024-01-15',
    amount: 100,
    currency: 'PLN',
    items: [],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoiceService);
  });

  it('starts with no invoices', () => {
    let count = -1;
    service.getAll().subscribe(list => (count = list.length));
    expect(count).toBe(0);
  });

  it('creates a draft invoice and finds it by id', () => {
    const created = service.create(valid);
    expect(created.status).toBe('draft');
    expect(service.getById(created.id)?.number).toBe('FV/2024/00001');
  });

  it('reports the four implemented validation rules', () => {
    const only = (data: InvoiceFormData) => {
      const errors = service.validate(data);
      expect(errors.length).toBe(1);
      return errors[0];
    };
    expect(only({ ...valid, customerName: ' ' })).toMatch(/customer/i);
    expect(only({ ...valid, issueDate: '' })).toMatch(/issue date/i);
    expect(only({ ...valid, dueDate: '2023-12-31' })).toMatch(/due date/i);
    expect(only({ ...valid, amount: 0 })).toMatch(/amount/i);
    expect(service.validate({ ...valid, customerName: ' ', issueDate: '', amount: 0 }).length).toBe(3);
  });

  it('throws on invalid data and does not store it', () => {
    expect(() => service.create({ ...valid, customerName: '' })).toThrowError();
    let count = -1;
    service.getAll().subscribe(list => (count = list.length));
    expect(count).toBe(0);
  });

  it('updates and deletes an invoice', () => {
    const created = service.create(valid);
    expect(service.update(created.id, { customerName: 'Globex' }).customerName).toBe('Globex');
    service.delete(created.id);
    expect(service.getById(created.id)).toBeUndefined();
  });
});
