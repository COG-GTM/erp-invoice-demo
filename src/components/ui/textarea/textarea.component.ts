import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ui-textarea',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextareaComponent),
    multi: true,
  }],
  template: `
    <div class="form-field" [class.form-field--error]="error">
      <label class="form-label" [attr.for]="fieldId">{{ label }}</label>
      <textarea
        class="form-textarea"
        [id]="fieldId"
        [placeholder]="placeholder"
        [rows]="rows"
        [value]="value"
        (input)="onInput($event)"
        (blur)="onTouched()"></textarea>
      <span class="form-error" *ngIf="error">{{ error }}</span>
    </div>
  `,
  styles: [`
    .form-field { display: flex; flex-direction: column; gap: var(--space-xs); }
    .form-label {
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-medium);
      color: var(--color-text-primary);
    }
    .form-textarea {
      padding: var(--space-sm) var(--space-md);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      font-size: var(--font-size-sm);
      font-family: var(--font-family);
      resize: vertical;
      min-height: 80px;
      transition: border-color 0.15s;
    }
    .form-textarea:focus {
      outline: none;
      border-color: var(--color-border-focus);
      box-shadow: 0 0 0 3px var(--color-primary-light);
    }
    .form-field--error .form-textarea { border-color: var(--color-error); }
    .form-error {
      font-size: var(--font-size-xs);
      color: var(--color-error);
    }
  `]
})
export class TextareaComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() error = '';
  @Input() fieldId = '';
  @Input() rows = 3;

  value = '';
  onChange: (val: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(val: string) { this.value = val || ''; }
  registerOnChange(fn: (val: string) => void) { this.onChange = fn; }
  registerOnTouched(fn: () => void) { this.onTouched = fn; }

  onInput(event: Event) {
    const val = (event.target as HTMLTextAreaElement).value;
    this.value = val;
    this.onChange(val);
  }
}
