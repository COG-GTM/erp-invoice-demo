import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'modules', pathMatch: 'full' },
  {
    path: 'modules',
    loadChildren: () =>
      import('../modules/modules/modules.routes').then(m => m.MODULE_ROUTES),
  },
  {
    path: 'invoices',
    loadChildren: () =>
      import('../modules/invoices/invoices.routes').then(m => m.INVOICE_ROUTES),
  },
];
