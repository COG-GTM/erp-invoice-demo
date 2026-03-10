export interface ErpModule {
  id: string;
  displayName: string;
  category: string;
  label: string;
  parentModule: string;
  code: string;
  dependencies: string;
  description: string;
}

export type ErpModuleFormData = Omit<ErpModule, 'id'>;
