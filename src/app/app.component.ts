import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, RouterLink],
    template: `
    <div class="app-shell">
      <header class="app-header">
        <h1 class="app-title">ERP Invoice Web</h1>
        <nav class="app-nav">
          <a routerLink="/invoices" class="nav-link active">Invoices</a>
        </nav>
      </header>
      <main class="app-content">
        <router-outlet />
      </main>
    </div>
  `,
    styles: [`
    .app-shell {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    .app-header {
      display: flex;
      align-items: center;
      gap: var(--space-xl);
      padding: var(--space-md) var(--space-lg);
      background: var(--color-bg-surface);
      border-bottom: 1px solid var(--color-border);
      box-shadow: var(--shadow-sm);
    }
    .app-title {
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-bold);
      color: var(--color-primary);
    }
    .nav-link {
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-medium);
      color: var(--color-text-secondary);
      padding: var(--space-xs) var(--space-sm);
      border-radius: var(--radius-sm);
    }
    .nav-link.active {
      color: var(--color-primary);
      background: var(--color-primary-light);
    }
    .app-content {
      flex: 1;
      padding: var(--space-lg);
    }
  `]
})
export class AppComponent {}
