import { test, expect } from '@playwright/test';
import { createInvoice, invoice, route, snap } from './helpers';

test('row click opens the invoice detail', async ({ page }, testInfo) => {
  await createInvoice(page);
  await page.getByRole('cell', { name: invoice.customerName }).click();
  await expect(page).toHaveURL(/\/invoices\/[0-9a-f-]{36}$/);
  await expect(page.getByRole('heading', { level: 2 })).toHaveText(`Invoice ${invoice.number}`);
  await expect(page.getByText('draft', { exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { level: 3 })).toHaveText(['Customer', 'Issue Date', 'Due Date', 'Amount']);
  await expect(page.getByText(invoice.customerName)).toBeVisible();
  await expect(page.getByText('1,234.50 EUR')).toBeVisible();
  await expect(page.getByText('Line Items')).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Back' })).toBeEnabled();
  await snap(page, testInfo, '05-detail');
  await page.getByRole('button', { name: 'Back' }).click();
  await expect(page).toHaveURL(/\/invoices$/);
});

test('delete modal opens, cancels, and closes on backdrop click', async ({ page }, testInfo) => {
  await createInvoice(page);
  await page.getByRole('cell', { name: invoice.number }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByRole('heading', { name: 'Delete Invoice' })).toBeVisible();
  await expect(page.getByText(`Are you sure you want to delete invoice ${invoice.number}? This action cannot be undone.`)).toBeVisible();
  await snap(page, testInfo, '06-delete-modal');
  await page.getByRole('button', { name: 'Cancel' }).click();
  await expect(page.getByRole('heading', { name: 'Delete Invoice' })).toHaveCount(0);
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.mouse.click(10, 10);
  await expect(page.getByRole('heading', { name: 'Delete Invoice' })).toHaveCount(0);
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: '×' }).click();
  await expect(page.getByRole('heading', { name: 'Delete Invoice' })).toHaveCount(0);
  await expect(page.getByRole('heading', { level: 2 })).toHaveText(`Invoice ${invoice.number}`);
});

test('confirming delete removes the invoice', async ({ page }) => {
  await createInvoice(page);
  await page.getByRole('cell', { name: invoice.number }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'Submit' }).last().click();
  await expect(page).toHaveURL(/\/invoices$/);
  await expect(page.locator('tbody tr')).toHaveCount(0);
});

test('unknown invoice id shows not found', async ({ page }, testInfo) => {
  await page.goto(route('/invoices/does-not-exist'));
  await expect(page.getByText('Invoice not found.')).toBeVisible();
  await snap(page, testInfo, '07-not-found');
  await page.getByRole('button', { name: 'Back to list' }).click();
  await expect(page).toHaveURL(/\/invoices$/);
});

test('invoices are in memory only and do not survive a reload', async ({ page }) => {
  await createInvoice(page);
  await page.getByRole('cell', { name: invoice.number }).click();
  await page.reload();
  await expect(page.getByText('Invoice not found.')).toBeVisible();
});
