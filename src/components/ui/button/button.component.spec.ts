import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render a button element', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button).toBeTruthy();
  });

  it('should apply default primary variant and md size classes', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button.className).toContain('btn--primary');
    expect(button.className).toContain('btn--md');
  });

  it('should apply secondary variant class when set', () => {
    component.variant = 'secondary';
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.className).toContain('btn--secondary');
  });

  it('should apply danger variant class when set', () => {
    component.variant = 'danger';
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.className).toContain('btn--danger');
  });

  it('should apply sm size class when set', () => {
    component.size = 'sm';
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.className).toContain('btn--sm');
  });

  it('should apply lg size class when set', () => {
    component.size = 'lg';
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.className).toContain('btn--lg');
  });

  it('should set disabled attribute when disabled is true', () => {
    component.disabled = true;
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBe(true);
  });

  it('should default to type="button"', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button.type).toBe('button');
  });
});
