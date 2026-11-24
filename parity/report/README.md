# Parity report: baseline (Angular 17, :4000) vs upgraded (Angular 21, :4200)

Same Playwright specs run against both apps (`parity/specs`). Regenerate with `npm run parity` (runs both projects, writes this report, exits non-zero if any test failed) in `parity/`.

Totals: baseline 13 passed / 0 failed; upgraded 13 passed / 0 failed.

| Page / flow | Baseline | Upgraded |
|---|---|---|
| 01-list.spec.ts › root redirects to the empty invoice list | pass | pass |
| 01-list.spec.ts › nav link returns to the list from the create page | pass | pass |
| 02-create.spec.ts › create form renders with defaults | pass | pass |
| 02-create.spec.ts › submitting an empty form shows the validation banner | pass | pass |
| 02-create.spec.ts › due date before issue date is rejected | pass | pass |
| 02-create.spec.ts › cancel returns to the list without creating | pass | pass |
| 02-create.spec.ts › valid invoice is created and listed as draft | pass | pass |
| 02-create.spec.ts › two invoices are listed in creation order | pass | pass |
| 03-detail.spec.ts › row click opens the invoice detail | pass | pass |
| 03-detail.spec.ts › delete modal opens, cancels, and closes on backdrop click | pass | pass |
| 03-detail.spec.ts › confirming delete removes the invoice | pass | pass |
| 03-detail.spec.ts › unknown invoice id shows not found | pass | pass |
| 03-detail.spec.ts › invoices are in memory only and do not survive a reload | pass | pass |

## Screenshots (baseline left, upgraded right)

| Page | Pixel diff (pixelmatch, threshold 0.1) | Raw differing pixels (exact RGB) | Size (baseline / upgraded) |
|---|---|---|---|
| [01-list-empty.png](side-by-side/01-list-empty.png) | 0.00% | 0 | 1280x800 / 1280x800 |
| [02-create-form.png](side-by-side/02-create-form.png) | 0.00% | 0 | 1280x800 / 1280x800 |
| [03-create-errors.png](side-by-side/03-create-errors.png) | 0.00% | 2732 | 1280x800 / 1280x800 |
| [04-list-one-invoice.png](side-by-side/04-list-one-invoice.png) | 0.00% | 19 | 1280x800 / 1280x800 |
| [05-detail.png](side-by-side/05-detail.png) | 0.00% | 0 | 1280x800 / 1280x800 |
| [06-delete-modal.png](side-by-side/06-delete-modal.png) | 0.00% | 0 | 1280x800 / 1280x800 |
| [07-not-found.png](side-by-side/07-not-found.png) | 0.00% | 0 | 1280x800 / 1280x800 |

The app keeps invoices in memory only and has no backend, so no retries are configured.
