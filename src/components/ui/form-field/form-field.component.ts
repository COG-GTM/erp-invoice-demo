import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ui-form-field',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FormFieldComponent),
    multi: true,
  }],
  template: `
    <div class="form-field" [class.form-field--error]="error">
      <label class="form-label" [attr.for]="fieldId">{{ label }}</label>
      <input
        class="form-input"
        [id]="fieldId"
        [type]="type"
        [placeholder]="placeholder"
        [value]="value"
        (input)="onInput($event)"
        (blur)="onTouched()" />
      @if (error) {
        <span class="form-error">{{ error }}</span>
      }
    </div>
  `,
  styles: [`
    .form-field { display: flex; flex-direction: column; gap: var(--space-xs); }
    .form-label {
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-medium);
      color: var(--color-text-primary);
    }
    .form-input {
      padding: var(--space-sm) var(--space-md);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      font-size: var(--font-size-sm);
      font-family: var(--font-family);
      transition: border-color 0.15s;
    }
    .form-input:focus {
      outline: none;
      border-color: var(--color-border-focus);
      box-shadow: 0 0 0 3px var(--color-primary-light);
    }
    .form-field--error .form-input { border-color: var(--color-error); }
    .form-error {
      font-size: var(--font-size-xs);
      color: var(--color-error);
    }
  `]
})
export class FormFieldComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() error = '';
  @Input() fieldId = '';

  value = '';
  onChange: (val: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(val: string) { this.value = val || ''; }
  registerOnChange(fn: (val: string) => void) { this.onChange = fn; }
  registerOnTouched(fn: () => void) { this.onTouched = fn; }

  onInput(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.value = val;
    this.onChange(val);
  }
}
