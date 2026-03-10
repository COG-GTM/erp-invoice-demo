import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent, SidebarItem } from '../components/ui';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  template: `
    <div class="app-shell">
      <ui-sidebar [brand]="'ERP System'" [items]="sidebarItems" />
      <main class="app-content">
        <router-outlet />
      </main>
    </div>
  `,
  styles: [`
    .app-shell {
      min-height: 100vh;
      display: flex;
    }
    .app-content {
      flex: 1;
      padding: var(--space-xl);
      background: var(--color-bg-page);
      overflow-y: auto;
    }
  `]
})
export class AppComponent {
  sidebarItems: SidebarItem[] = [
    { label: 'Dashboard', icon: '\u2302', route: '/dashboard' },
    { label: 'Modules', icon: '\u2B22', route: '/modules' },
    { label: 'Invoices', icon: '\u2B1A', route: '/invoices' },
    { label: 'Settings', icon: '\u2699', route: '/settings' },
  ];
}
