import { test, expect } from '@playwright/test';
import { RUN_ID, createInvoice, invoice, route, snap } from './helpers';

test('create form renders with defaults', async ({ page }, testInfo) => {
  await page.goto(route('/invoices'));
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page).toHaveURL(/\/invoices\/create$/);
  await expect(page.getByRole('heading', { level: 2 })).toHaveText('New Invoice');
  await expect(page.getByLabel('Invoice Number')).toHaveAttribute('placeholder', 'e.g. FV/2024/00001');
  await expect(page.getByLabel('Customer Name')).toHaveAttribute('placeholder', 'Enter customer name');
  await expect(page.getByLabel('Issue Date')).toHaveAttribute('type', 'date');
  await expect(page.getByLabel('Due Date')).toHaveAttribute('type', 'date');
  await expect(page.getByLabel('Amount')).toHaveAttribute('type', 'number');
  await expect(page.getByLabel('Currency')).toHaveValue('PLN');
  await expect(page.getByRole('button', { name: 'Cancel' })).toBeEnabled();
  await expect(page.getByRole('button', { name: 'Submit' })).toBeEnabled();
  await snap(page, testInfo, '02-create-form');
});

test('submitting an empty form shows the validation banner', async ({ page }, testInfo) => {
  await page.goto(route('/invoices/create'));
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page).toHaveURL(/\/invoices\/create$/);
  await expect(page.getByText('Invalid customer name; Issue date is required. Please select a valid date.; Invoice amount must be greater than zero. Please check line items.')).toBeVisible();
  await snap(page, testInfo, '03-create-errors');
});

test('due date before issue date is rejected', async ({ page }) => {
  await page.goto(route('/invoices/create'));
  await page.getByLabel('Customer Name').fill(invoice.customerName);
  await page.getByLabel('Issue Date').fill('2024-03-10');
  await page.getByLabel('Due Date').fill('2024-03-01');
  await page.getByLabel('Amount').fill('10');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Invalid due date', { exact: true })).toBeVisible();
  await expect(page).toHaveURL(/\/invoices\/create$/);
});

test('cancel returns to the list without creating', async ({ page }) => {
  await page.goto(route('/invoices/create'));
  await page.getByLabel('Customer Name').fill(invoice.customerName);
  await page.getByRole('button', { name: 'Cancel' }).click();
  await expect(page).toHaveURL(/\/invoices$/);
  await expect(page.locator('tbody tr')).toHaveCount(0);
});

test('valid invoice is created and listed as draft', async ({ page }, testInfo) => {
  await createInvoice(page);
  const rows = page.locator('tbody tr');
  await expect(rows).toHaveCount(1);
  await expect(rows.first().getByRole('cell')).toHaveText([
    invoice.number, invoice.customerName, invoice.issueDate, invoice.dueDate, invoice.amount, 'draft',
  ]);
  await snap(page, testInfo, '04-list-one-invoice');
});

test('two invoices are listed in creation order', async ({ page }) => {
  await createInvoice(page);
  const second = { ...invoice, number: `FV/2025/${RUN_ID}`, customerName: `Second ${invoice.customerName}` };
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByLabel('Invoice Number').fill(second.number);
  await page.getByLabel('Customer Name').fill(second.customerName);
  await page.getByLabel('Issue Date').fill(second.issueDate);
  await page.getByLabel('Due Date').fill(second.dueDate);
  await page.getByLabel('Amount').fill('5');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page).toHaveURL(/\/invoices$/);
  await expect(page.locator('tbody tr td:first-child')).toHaveText([invoice.number, second.number]);
});
