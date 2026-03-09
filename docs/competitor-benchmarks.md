# Competitive ERP Invoice UI Benchmarks

> **Pre-cached comparison table.** This document provides a reference comparison of invoice list views across popular ERP systems. It was compiled from publicly available demos and documentation so that designers can reference it immediately without needing live browser research.
>
> To run a live competitive research session with Devin (browsing demos, capturing fresh screenshots), invoke: `@skills:research-benchmarking`

## Invoice List View Comparison

| Feature | SAP Business One | Oracle NetSuite | Microsoft Dynamics 365 | Zoho Invoice | XL Web (current) |
| --- | --- | --- | --- | --- | --- |
| **Layout pattern** | Data grid with frozen columns | Tabular list with card preview pane | Responsive grid with inline editing | Card-based with list toggle | Table only |
| **Column choices** | Invoice #, Customer, Date, Due Date, Amount, Status, Currency | Number, Entity, Date, Due, Amount Due, Status | Number, Account, Date, Due, Total, Status, Amount Remaining | Number, Customer, Date, Due Date, Balance, Status | Number, Customer, Date, Amount, Status |
| **Empty state** | Illustrated placeholder with "Create your first invoice" CTA | "No records to display" text with link to create | Illustrated empty state with guided setup | Illustrated character with "Create Invoice" button | None (blank table) |
| **Sorting** | Click column headers, multi-column sort | Click headers, saved sort preferences | Click headers, drag-to-reorder columns | Click headers, single column | Click headers |
| **Filtering** | Advanced filter panel, saved filter sets | Saved searches, inline filters per column | Quick filters bar + advanced filter pane | Dropdown filters + search bar | Search bar only |
| **Status indicators** | Color-coded text labels | Colored badges with icons | Colored chips with status text | Colored dots + text | Colored badges |
| **Bulk actions** | Select all, bulk print, bulk email | Bulk update, merge, delete | Bulk post, bulk print, bulk email | Bulk send, bulk print, bulk delete | None |
| **Pagination** | Server-side, configurable page size | Infinite scroll with lazy loading | Paginated with configurable size | Paginated with page size selector | Client-side pagination |
| **Quick actions** | Right-click context menu | Inline action icons on hover | Inline action bar on selection | Action dropdown per row | Click to navigate |
| **Search** | Global search + module search | Global + saved searches | Quick find + advanced search | Simple search + advanced filters | Simple search |

## Key Takeaways for XL Web

### Gaps to Address
1. **Empty state** — Every competitor provides an illustrated empty state with a clear call-to-action. XL Web shows a blank table.
2. **Bulk actions** — All competitors support multi-select with bulk operations. XL Web has no bulk action support.
3. **Advanced filtering** — Competitors offer saved filters, multi-column filtering, or filter panels. XL Web only has a search bar.
4. **Quick actions** — Competitors provide inline or contextual actions. XL Web requires navigation to detail view for any action.

### Patterns to Consider
- **Illustrated empty states** are universal — they reduce confusion and guide new users
- **Saved/preset filters** are common in enterprise tools where users work with the same data subsets daily
- **Inline actions** (edit, duplicate, send) reduce clicks for power users
- **Configurable columns** let users customize their workflow

### Design Inspiration
- **SAP Business One**: Best-in-class data density for power users
- **Zoho Invoice**: Friendliest onboarding and empty states for new users
- **Microsoft Dynamics 365**: Best balance of density and usability
- **Oracle NetSuite**: Most powerful search and saved views

---

*Last updated: 2025-06. Sources: publicly available demo sites and documentation.*
