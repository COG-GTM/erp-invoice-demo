import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ErpModule, ErpModuleFormData } from '../models/module.model';

@Injectable({ providedIn: 'root' })
export class ModuleService {
  private modules$ = new BehaviorSubject<ErpModule[]>([]);

  getAll(): Observable<ErpModule[]> {
    return this.modules$.asObservable();
  }

  getById(id: string): ErpModule | undefined {
    return this.modules$.value.find(m => m.id === id);
  }

  create(data: ErpModuleFormData): ErpModule {
    const errors = this.validate(data);
    if (errors.length > 0) {
      throw new Error(errors.join('; '));
    }
    const erpModule: ErpModule = {
      ...data,
      id: crypto.randomUUID(),
    };
    this.modules$.next([...this.modules$.value, erpModule]);
    return erpModule;
  }

  validate(data: ErpModuleFormData): string[] {
    const errors: string[] = [];

    if (!data.displayName?.trim()) {
      errors.push('Display name is required. Please provide a name for the module.');
    }

    if (!data.code?.trim()) {
      errors.push('Module code is required. Please enter a unique code identifier.');
    }

    return errors;
  }
}
