import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ui-modal',
  standalone: true,
  template: `
    @if (open) {
      <div class="modal-backdrop" (click)="close.emit()">
        <div class="modal-panel" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2 class="modal-title">{{ title }}</h2>
            <button class="modal-close" (click)="close.emit()">&times;</button>
          </div>
          <div class="modal-body">
            <ng-content />
          </div>
          <div class="modal-footer">
            <ng-content select="[modal-footer]" />
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: var(--z-modal-backdrop);
    }
    .modal-panel {
      background: var(--color-bg-surface);
      border-radius: var(--modal-radius);
      box-shadow: var(--modal-shadow);
      padding: var(--modal-padding); /* Uses 24px — Figma says 32px */
      min-width: 480px;
      max-width: 640px;
      max-height: 80vh;
      overflow-y: auto;
      z-index: var(--z-modal);
    }
    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--space-md);
    }
    .modal-title {
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-semibold);
    }
    .modal-close {
      background: none;
      border: none;
      font-size: var(--font-size-xl);
      color: var(--color-text-secondary);
      cursor: pointer;
      padding: var(--space-xs);
    }
    .modal-body { margin-bottom: var(--space-md); }
    .modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: var(--space-sm);
    }
  `]
})
export class ModalComponent {
  @Input() open = false;
  @Input() title = '';
  @Output() close = new EventEmitter<void>();
}
