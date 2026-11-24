import { Component, input } from '@angular/core';

@Component({
    selector: 'ui-button',
    imports: [],
    template: `
    <button
      [class]="'btn btn--' + variant() + ' btn--' + size()"
      [disabled]="disabled()"
      [type]="type()">
      <ng-content />
    </button>
  `,
    styles: [`
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-xs);
      font-family: var(--font-family);
      font-weight: var(--font-weight-medium);
      border: 1px solid transparent;
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: background 0.15s, border-color 0.15s;
    }
    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .btn--sm { padding: var(--space-xs) var(--space-sm); font-size: var(--font-size-xs); }
    .btn--md { padding: var(--space-sm) var(--space-md); font-size: var(--font-size-sm); }
    .btn--lg { padding: var(--space-md) var(--space-lg); font-size: var(--font-size-md); }

    .btn--primary {
      background: var(--color-primary);
      color: #fff;
    }
    .btn--primary:hover:not(:disabled) { background: var(--color-primary-hover); }

    .btn--secondary {
      background: var(--color-bg-surface);
      color: var(--color-text-primary);
      border-color: var(--color-border);
    }
    .btn--secondary:hover:not(:disabled) { background: var(--color-bg-hover); }

    .btn--danger {
      background: var(--color-error);
      color: #fff;
    }
    .btn--danger:hover:not(:disabled) { opacity: 0.9; }
  `]
})
export class ButtonComponent {
  readonly variant = input<'primary' | 'secondary' | 'danger'>('primary');
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly disabled = input(false);
  readonly type = input<'button' | 'submit'>('button');
}
