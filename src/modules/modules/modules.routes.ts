import { Routes } from '@angular/router';
import { ModuleCreateComponent } from './components/module-create.component';

export const MODULE_ROUTES: Routes = [
  { path: '', redirectTo: 'create', pathMatch: 'full' },
  { path: 'create', component: ModuleCreateComponent },
];
