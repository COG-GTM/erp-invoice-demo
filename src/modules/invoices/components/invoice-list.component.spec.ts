import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { InvoiceListComponent } from './invoice-list.component';

describe('InvoiceListComponent', () => {
  let component: InvoiceListComponent;
  let fixture: ComponentFixture<InvoiceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceListComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(InvoiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the page title "Invoices"', () => {
    const title = fixture.nativeElement.querySelector('.page-title');
    expect(title).toBeTruthy();
    expect(title.textContent.trim()).toBe('Invoices');
  });

  it('should render a ui-data-table element', () => {
    const dataTable = fixture.nativeElement.querySelector('ui-data-table');
    expect(dataTable).toBeTruthy();
  });
});
