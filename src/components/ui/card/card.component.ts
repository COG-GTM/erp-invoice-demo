import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <div class="card-header" *ngIf="title">
        <h3 class="card-title">{{ title }}</h3>
        <p class="card-description" *ngIf="description">{{ description }}</p>
      </div>
      <div class="card-content">
        <ng-content />
      </div>
    </div>
  `,
  styles: [`
    .card {
      background: var(--color-bg-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-sm);
    }
    .card-header {
      padding: var(--space-lg) var(--space-lg) 0;
    }
    .card-title {
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-primary);
      line-height: var(--line-height-tight);
    }
    .card-description {
      margin-top: var(--space-xs);
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
      line-height: var(--line-height-normal);
    }
    .card-content {
      padding: var(--space-lg);
    }
  `]
})
export class CardComponent {
  @Input() title = '';
  @Input() description = '';
}
