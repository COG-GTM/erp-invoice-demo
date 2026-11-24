import { test, expect } from '@playwright/test';
import { route, snap } from './helpers';

test('root redirects to the empty invoice list', async ({ page }, testInfo) => {
  await page.goto(route('/'));
  await expect(page).toHaveURL(/\/invoices$/);
  await expect(page).toHaveTitle('ERP Invoice Web');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('ERP Invoice Web');
  await expect(page.getByRole('link', { name: 'Invoices' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2 })).toHaveText('Invoices');
  await expect(page.getByRole('button', { name: 'Submit' })).toBeEnabled();
  await expect(page.locator('thead th')).toHaveText(['Invoice #', 'Customer', 'Issue Date', 'Due Date', 'Amount', 'Status']);
  // Planted defect kept on purpose: no empty state, zero body rows.
  await expect(page.locator('tbody tr')).toHaveCount(0);
  await snap(page, testInfo, '01-list-empty');
});

test('nav link returns to the list from the create page', async ({ page }) => {
  await page.goto(route('/invoices/create'));
  await page.getByRole('link', { name: 'Invoices' }).click();
  await expect(page).toHaveURL(/\/invoices$/);
  await expect(page.getByRole('heading', { level: 2 })).toHaveText('Invoices');
});
