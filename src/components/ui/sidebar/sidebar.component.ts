import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface SidebarItem {
  label: string;
  icon?: string;
  route: string;
}

@Component({
  selector: 'ui-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <aside class="sidebar">
      <div class="sidebar-header">
        <span class="sidebar-brand">{{ brand }}</span>
      </div>
      <nav class="sidebar-nav">
        <a *ngFor="let item of items"
           class="sidebar-link"
           [routerLink]="item.route"
           routerLinkActive="sidebar-link--active">
          <span class="sidebar-icon" *ngIf="item.icon">{{ item.icon }}</span>
          <span class="sidebar-label">{{ item.label }}</span>
        </a>
      </nav>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: 240px;
      min-height: 100vh;
      background: var(--color-bg-surface);
      border-right: 1px solid var(--color-border);
      display: flex;
      flex-direction: column;
    }
    .sidebar-header {
      padding: var(--space-lg) var(--space-md);
      border-bottom: 1px solid var(--color-border);
    }
    .sidebar-brand {
      font-size: var(--font-size-md);
      font-weight: var(--font-weight-bold);
      color: var(--color-primary);
    }
    .sidebar-nav {
      padding: var(--space-sm);
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);
    }
    .sidebar-link {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      padding: var(--space-sm) var(--space-md);
      border-radius: var(--radius-md);
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-medium);
      color: var(--color-text-secondary);
      text-decoration: none;
      transition: background 0.15s, color 0.15s;
    }
    .sidebar-link:hover {
      background: var(--color-bg-hover);
      color: var(--color-text-primary);
      text-decoration: none;
    }
    .sidebar-link--active {
      background: var(--color-primary-light);
      color: var(--color-primary);
      font-weight: var(--font-weight-semibold);
    }
    .sidebar-icon {
      font-size: var(--font-size-md);
      width: 20px;
      text-align: center;
    }
    .sidebar-label {
      flex: 1;
    }
  `]
})
export class SidebarComponent {
  @Input() brand = '';
  @Input() items: SidebarItem[] = [];
}
