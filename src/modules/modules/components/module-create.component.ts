import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CardComponent, FormFieldComponent, TextareaComponent, ButtonComponent } from '../../../components/ui';
import { ModuleService } from '../services/module.service';
import { ErpModuleFormData } from '../models/module.model';

interface ModuleForm {
  displayName: string;
  category: string;
  label: string;
  parentModule: string;
  code: string;
  dependencies: string;
  description: string;
}

@Component({
  selector: 'app-module-create',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, FormFieldComponent, TextareaComponent, ButtonComponent],
  template: `
    <div class="create-page">
      <ui-card title="Create new module"
               description="Define a new functional unit for your ERP instance">
        <form class="module-form" (ngSubmit)="onSubmit()">
          <div class="form-grid">
            <ui-form-field
              label="Display Name"
              fieldId="displayName"
              placeholder="e.g. Accounts Payable"
              [error]="errors.displayName || ''"
              [(ngModel)]="form.displayName"
              name="displayName" />

            <ui-form-field
              label="Category"
              fieldId="category"
              placeholder="e.g. Finance"
              [(ngModel)]="form.category"
              name="category" />

            <ui-form-field
              label="Label"
              fieldId="label"
              placeholder="e.g. AP"
              [(ngModel)]="form.label"
              name="label" />

            <ui-form-field
              label="Parent Module"
              fieldId="parentModule"
              placeholder="e.g. Financial Management"
              [(ngModel)]="form.parentModule"
              name="parentModule" />

            <ui-form-field
              label="Code"
              fieldId="code"
              placeholder="e.g. MOD-AP-001"
              [error]="errors.code || ''"
              [(ngModel)]="form.code"
              name="code" />

            <ui-form-field
              label="Dependencies"
              fieldId="dependencies"
              placeholder="e.g. General Ledger, Chart of Accounts"
              [(ngModel)]="form.dependencies"
              name="dependencies" />
          </div>

          <div class="form-full">
            <ui-textarea
              label="Description"
              fieldId="description"
              placeholder="Describe the purpose and scope of this module..."
              [rows]="3"
              [(ngModel)]="form.description"
              name="description" />
          </div>

          <div class="form-actions">
            <ui-button variant="secondary" type="button" (click)="onCancel()">Cancel</ui-button>
            <ui-button variant="primary" type="submit">Create Module</ui-button>
          </div>
        </form>
      </ui-card>

      <div class="error-banner" *ngIf="submitError">
        {{ submitError }}
      </div>
    </div>
  `,
  styles: [`
    .create-page {
      max-width: 800px;
    }
    .module-form {
      display: flex;
      flex-direction: column;
      gap: var(--space-lg);
    }
    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-md);
    }
    .form-full {
      width: 100%;
    }
    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: var(--space-sm);
      padding-top: var(--space-sm);
      border-top: 1px solid var(--color-border);
    }
    .error-banner {
      margin-top: var(--space-md);
      padding: var(--space-md);
      background: #fef2f2;
      color: var(--color-error);
      border: 1px solid var(--color-error);
      border-radius: var(--radius-md);
      font-size: var(--font-size-sm);
    }
  `]
})
export class ModuleCreateComponent {
  form: ModuleForm = {
    displayName: '',
    category: '',
    label: '',
    parentModule: '',
    code: '',
    dependencies: '',
    description: '',
  };
  errors: Partial<Record<keyof ModuleForm, string>> = {};
  submitError = '';

  constructor(
    private moduleService: ModuleService,
    private router: Router,
  ) {}

  onSubmit() {
    this.errors = {};
    this.submitError = '';
    try {
      this.moduleService.create(this.form);
      this.router.navigate(['/modules']);
    } catch (e: unknown) {
      if (e instanceof Error) {
        this.submitError = e.message;
      }
    }
  }

  onCancel() {
    this.router.navigate(['/modules']);
  }
}
