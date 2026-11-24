import { Page, TestInfo, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

export const RUN_ID = process.env['PARITY_RUN_ID'] ?? '00000';

/** Both apps use path routing today; map a logical route to each app's URL here if that ever changes. */
export function route(logical: string): string {
  return logical;
}

export async function snap(page: Page, testInfo: TestInfo, name: string) {
  const dir = path.join(__dirname, '..', 'report', 'screens', testInfo.project.name);
  fs.mkdirSync(dir, { recursive: true });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(dir, `${name}.png`), fullPage: true });
}

export const invoice = {
  number: `FV/2024/${RUN_ID}`,
  customerName: `Parity Customer ${RUN_ID}`,
  issueDate: '2024-03-01',
  dueDate: '2024-03-31',
  amount: '1234.5',
  currency: 'EUR',
};

export async function createInvoice(page: Page, data = invoice) {
  await page.goto(route('/invoices'));
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page).toHaveURL(/\/invoices\/create$/);
  await page.getByLabel('Invoice Number').fill(data.number);
  await page.getByLabel('Customer Name').fill(data.customerName);
  await page.getByLabel('Issue Date').fill(data.issueDate);
  await page.getByLabel('Due Date').fill(data.dueDate);
  await page.getByLabel('Amount').fill(data.amount);
  await page.getByLabel('Currency').fill(data.currency);
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page).toHaveURL(/\/invoices$/);
}
