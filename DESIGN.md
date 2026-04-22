# ReconcileAI — Design System

> Version 1.0 · April 2026  
> A design language for financial reconciliation tools. Built for clarity, trust, and precision.

---

## Table of Contents

1. [Brand](#brand)
2. [Colors](#colors)
3. [Typography](#typography)
4. [Spacing & Radius](#spacing--radius)
5. [Shadows](#shadows)
6. [CSS Tokens](#css-tokens)
7. [Components](#components)
   - [Buttons](#buttons)
   - [Status Badges](#status-badges)
   - [Inputs & Forms](#inputs--forms)
   - [Cards](#cards)
   - [Drop Zones](#drop-zones)
   - [Tables](#tables)
   - [Navigation](#navigation)
8. [Icons](#icons)
9. [Animations](#animations)
10. [Do's & Don'ts](#dos--donts)

---

## Brand

### Voice & Tone

| Pillar | Description |
|--------|-------------|
| **Precise** | Data is never rounded. Every cent matters. |
| **Trustworthy** | We handle your money data with care and transparency. |
| **Efficient** | Reduce reconciliation from hours to seconds. |
| **Clear** | No jargon. Plain language for every status and state. |

### Fonts

| Role | Font | Import |
|------|------|--------|
| UI / Body | **Manrope** | `https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700` |
| Numbers / Code | **DM Mono** | `https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500` |

---

## Colors

All colors are defined in **OKLCH** — perceptually uniform, accessible, and consistent.

### Primary (Accent — Indigo)

| Token | Value | Usage |
|-------|-------|-------|
| `--accent` | `oklch(55% 0.22 270)` | Buttons, links, active states |
| `--accent-light` | `oklch(94% 0.06 270)` | Backgrounds, chips, highlights |
| `--accent-dim` | `oklch(55% 0.22 270 / 0.12)` | Shadows, overlays |

### Semantic — Success

| Token | Value | Usage |
|-------|-------|-------|
| `--green` | `oklch(56% 0.18 155)` | Matched status, positive amounts |
| `--green-light` | `oklch(94% 0.06 155)` | Matched badge background |

### Semantic — Danger

| Token | Value | Usage |
|-------|-------|-------|
| `--red` | `oklch(54% 0.2 25)` | Unmatched, errors, delete |
| `--red-light` | `oklch(95% 0.05 25)` | Danger badge background |

### Semantic — Warning

| Token | Value | Usage |
|-------|-------|-------|
| `--amber` | `oklch(68% 0.18 75)` | Discrepancies, warnings |
| `--amber-light` | `oklch(95% 0.06 75)` | Warning badge background |

### Neutrals

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `oklch(97.5% 0.006 260)` | Page background |
| `--surface` | `#ffffff` | Cards, panels, table rows |
| `--surface2` | `oklch(96% 0.008 260)` | Table header, input backgrounds |
| `--border` | `oklch(88% 0.01 260)` | Default borders |
| `--border-strong` | `oklch(78% 0.015 260)` | Drop zone dashed borders |
| `--sidebar` | `oklch(16% 0.025 260)` | Sidebar background |
| `--sidebar-hover` | `oklch(22% 0.025 260)` | Sidebar nav hover |
| `--sidebar-active` | `oklch(28% 0.03 260)` | Sidebar active item |

### Text

| Token | Value | Usage |
|-------|-------|-------|
| `--text-1` | `oklch(18% 0.015 260)` | Primary text, headings |
| `--text-2` | `oklch(42% 0.018 260)` | Secondary text, labels |
| `--text-3` | `oklch(62% 0.012 260)` | Tertiary, placeholders, meta |

---

## Typography

### Type Scale — DM Sans

| Name | Size | Weight | Usage |
|------|------|--------|-------|
| Display | `36px` | `700` | Page hero titles |
| Heading 1 | `28px` | `700` | Section headings |
| Heading 2 | `22px` | `700` | Card headings |
| Heading 3 | `18px` | `600` | Sub-headings |
| Body Lg | `15px` | `400` | Lead / intro paragraphs |
| Body | `14px` | `400` | General body text |
| Body Sm | `13px` | `400` | Table cells, descriptions |
| Label | `12px` | `600` | Uppercase labels (letter-spacing: 0.04em) |
| Caption | `11px` | `600` | Tiny labels, file type tags |

### Monospace Scale — DM Mono

| Name | Size | Weight | Usage |
|------|------|--------|-------|
| Amount Lg | `26px` | `700` | Summary card values |
| Amount | `13px` | `500` | Table amount cells |
| Date | `13px` | `400` | Date column in tables |
| Reference | `11px` | `400` | Transaction ref IDs |
| Code | `12px` | `400` | CSS tokens, code snippets |

### Rules

- Use `text-wrap: pretty` on body paragraphs
- Amounts always use `DM Mono` — never `DM Sans`
- Positive amounts: `var(--green)`, Negative: `var(--red)`, Null: `var(--text-3)` with `—`
- Label text: always `uppercase`, `letter-spacing: 0.06–0.08em`, `font-weight: 600`

---

## Spacing & Radius

### Spacing Scale (4px base unit)

```
4px · 8px · 12px · 16px · 20px · 24px · 28px · 32px · 40px · 48px · 56px
```

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | `8px` | Buttons (sm), chips, row actions |
| `--radius` | `12px` | Buttons, inputs, process steps |
| `--radius-lg` | `16px` | Cards, panels, modals |
| pill | `9999px` | Status badges, tags |

---

## Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 3px oklch(0% 0 0 / 0.06), 0 1px 2px oklch(0% 0 0 / 0.04)` | Cards, rows, inputs |
| `--shadow` | `0 4px 16px oklch(0% 0 0 / 0.08), 0 2px 4px oklch(0% 0 0 / 0.04)` | Modals, file cards |
| `--shadow-lg` | `0 16px 48px oklch(0% 0 0 / 0.14), 0 4px 12px oklch(0% 0 0 / 0.06)` | Drawers, popovers, tweaks panel |

---

## CSS Tokens

Paste this into your global stylesheet:

```css
:root {
  /* Backgrounds */
  --bg:              oklch(97.5% 0.006 260);
  --surface:         #ffffff;
  --surface2:        oklch(96% 0.008 260);

  /* Borders */
  --border:          oklch(88% 0.01 260);
  --border-strong:   oklch(78% 0.015 260);

  /* Sidebar */
  --sidebar:         oklch(16% 0.025 260);
  --sidebar-hover:   oklch(22% 0.025 260);
  --sidebar-active:  oklch(28% 0.03 260);

  /* Text */
  --text-1:          oklch(18% 0.015 260);
  --text-2:          oklch(42% 0.018 260);
  --text-3:          oklch(62% 0.012 260);

  /* Accent — Indigo (default) */
  --accent:          oklch(55% 0.22 270);
  --accent-light:    oklch(94% 0.06 270);
  --accent-dim:      oklch(55% 0.22 270 / 0.12);

  /* Semantic — Success */
  --green:           oklch(56% 0.18 155);
  --green-light:     oklch(94% 0.06 155);

  /* Semantic — Danger */
  --red:             oklch(54% 0.2 25);
  --red-light:       oklch(95% 0.05 25);

  /* Semantic — Warning */
  --amber:           oklch(68% 0.18 75);
  --amber-light:     oklch(95% 0.06 75);

  /* Typography */
  --sans:            'DM Sans', sans-serif;
  --mono:            'DM Mono', monospace;

  /* Radius */
  --radius-sm:       8px;
  --radius:          12px;
  --radius-lg:       16px;

  /* Shadows */
  --shadow-sm:       0 1px 3px oklch(0% 0 0 / 0.06), 0 1px 2px oklch(0% 0 0 / 0.04);
  --shadow:          0 4px 16px oklch(0% 0 0 / 0.08), 0 2px 4px oklch(0% 0 0 / 0.04);
  --shadow-lg:       0 16px 48px oklch(0% 0 0 / 0.14), 0 4px 12px oklch(0% 0 0 / 0.06);
}
```

---

## Components

### Buttons

Five variants, three sizes.

```css
/* Base */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-family: var(--sans);
  font-weight: 600;
  border-radius: var(--radius);
  cursor: pointer;
  transition: all 0.15s;
}

/* Sizes */
.btn-sm  { padding: 6px 14px;  font-size: 12px; }
.btn-md  { padding: 10px 20px; font-size: 14px; }
.btn-lg  { padding: 14px 32px; font-size: 15px; }

/* Variants */
.btn-primary   { background: var(--accent);      color: white;          border: none;                       box-shadow: 0 4px 16px var(--accent-dim); }
.btn-secondary { background: var(--surface);     color: var(--text-1);  border: 1px solid var(--border);    box-shadow: var(--shadow-sm); }
.btn-ghost     { background: transparent;         color: var(--text-2);  border: 1px solid transparent; }
.btn-danger    { background: var(--red-light);   color: var(--red);     border: 1px solid var(--red-light); }
.btn-success   { background: var(--green-light); color: var(--green);   border: 1px solid var(--green-light); }

.btn:disabled  { opacity: 0.4; cursor: not-allowed; }
```

---

### Status Badges

Four reconciliation states. Always pill-shaped (`border-radius: 9999px`).

| Status | Background | Color | Icon |
|--------|-----------|-------|------|
| `matched` | `--green-light` | `--green` | ✓ check |
| `discrepancy` | `--amber-light` | `--amber` | ⚠ alert |
| `unmatched-bank` | `--red-light` | `--red` | ✕ x |
| `unmatched-ledger` | `oklch(92% 0.05 280)` | `--accent` | ℹ info |

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 9px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}

.badge-matched           { background: var(--green-light); color: var(--green); }
.badge-discrepancy       { background: var(--amber-light); color: var(--amber); }
.badge-unmatched-bank    { background: var(--red-light);   color: var(--red);   }
.badge-unmatched-ledger  { background: oklch(92% 0.05 280); color: var(--accent); }
```

---

### Inputs & Forms

```css
.input-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 14px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
  transition: border-color 0.15s, box-shadow 0.15s;
}

.input-wrapper:focus-within {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-dim);
}

.input-wrapper input {
  border: none;
  background: transparent;
  font-family: var(--sans);
  font-size: 13px;
  color: var(--text-1);
  outline: none;
  width: 100%;
}

/* Filter tabs */
.tab-group {
  display: flex;
  background: var(--surface2);
  border-radius: 10px;
  padding: 3px;
  gap: 2px;
}

.tab {
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.15s;
}

.tab.active {
  background: var(--surface);
  font-weight: 600;
  color: var(--text-1);
  box-shadow: var(--shadow-sm);
}

.tab-count {
  padding: 1px 7px;
  border-radius: 10px;
  font-size: 11px;
  font-family: var(--mono);
}
```

---

### Cards

#### Summary Card

```css
.summary-card {
  flex: 1;
  background: var(--surface);
  border-radius: var(--radius-lg);
  padding: 20px 24px;
  border: 1px solid var(--border);
  border-top: 3px solid var(--accent); /* swap color per type */
  box-shadow: var(--shadow-sm);
}

.summary-card .value {
  font-size: 28px;
  font-weight: 700;
  font-family: var(--mono);
  letter-spacing: -0.02em;
  color: var(--text-1);
}

.summary-card .label {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text-3);
}
```

#### Generic Card

```css
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 28px;
  box-shadow: var(--shadow-sm);
}
```

---

### Drop Zones

```css
/* Empty state */
.dropzone {
  border: 2px dashed var(--border-strong);
  border-radius: 16px;
  background: var(--surface);
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 220px;
  justify-content: center;
}

.dropzone:hover,
.dropzone.dragging {
  border-color: var(--accent);
  background: var(--accent-dim);
}

/* Loaded state */
.dropzone.loaded {
  border: 2px solid transparent;
  box-shadow: var(--shadow);
}

/* File type tag */
.file-ext-tag {
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--green);
  color: white;
  font-size: 9px;
  font-weight: 700;
  padding: 1px 5px;
  border-radius: 3px;
  letter-spacing: 0.05em;
}
```

---

### Tables

```css
.data-table {
  width: 100%;
  border-collapse: collapse;
  background: var(--surface);
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
}

.data-table thead tr {
  background: var(--surface2);
}

.data-table th {
  padding: 10px 20px;
  text-align: left;
  font-size: 11px;
  font-weight: 600;
  color: var(--text-3);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  white-space: nowrap;
}

.data-table tbody tr {
  border-top: 1px solid var(--border);
  background: var(--surface);
  cursor: pointer;
  transition: background 0.15s;
}

.data-table tbody tr:hover {
  background: var(--accent-light);
}

.data-table td {
  padding: 13px 20px;
}

/* Expanded row */
.row-expanded {
  background: var(--accent-light);
  border-top: 1px solid var(--accent-dim);
  padding: 16px 20px 16px 44px;
}

/* Amount cells */
.amount-positive { font-family: var(--mono); font-weight: 500; color: var(--green); }
.amount-negative { font-family: var(--mono); font-weight: 500; color: var(--red); }
.amount-null     { font-family: var(--mono); color: var(--text-3); }

/* Date / ref cells */
.cell-date { font-family: var(--mono); font-size: 13px; color: var(--text-2); white-space: nowrap; }
.cell-ref  { font-family: var(--mono); font-size: 11px; color: var(--text-3); margin-top: 2px; }

/* Table footer */
.table-footer {
  padding: 12px 24px;
  border-top: 1px solid var(--border);
  background: var(--surface2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: var(--text-3);
}
```

---

### Navigation

#### Sidebar

```css
.sidebar {
  width: 220px;
  background: var(--sidebar);
  display: flex;
  flex-direction: column;
  padding: 24px 12px;
  height: 100vh;
  position: sticky;
  top: 0;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  color: oklch(65% 0.015 260);
  transition: all 0.15s;
  margin-bottom: 2px;
}

.nav-item:hover  { background: var(--sidebar-hover); color: white; }
.nav-item.active { background: var(--sidebar-active); color: white; font-weight: 600; }

/* Section label */
.nav-section-label {
  font-size: 11px;
  font-weight: 600;
  color: oklch(50% 0.02 260);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding-left: 8px;
  margin-bottom: 8px;
}
```

#### Top bar

```css
.topbar {
  height: 60px;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
}
```

---

## Icons

Using inline SVG. Stroke-based, `strokeWidth: 2`, `strokeLinecap: round`, `strokeLinejoin: round`.

| Name | Usage |
|------|-------|
| `sparkle` | Logo, AI badge, primary CTA |
| `check` | Matched status, success states |
| `x` | Unmatched (bank), remove, close |
| `alert` | Discrepancy, warning |
| `info` | Unmatched (ledger), helper text |
| `upload` | Upload CTA |
| `download` | Export buttons |
| `search` | Search inputs |
| `bank` | Bank statement drop zone |
| `book` | Ledger drop zone |
| `refresh` | Reconcile nav item |
| `trash` | Remove file |
| `file` | File preview |
| `grid` | Settings, table view |

> **Rule:** Never fill icons. Stroke only. Color always inherits from parent (`currentColor`) unless semantic coloring is needed.

---

## Animations

```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-20px); }
  to   { opacity: 1; transform: translateX(0); }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
}

@keyframes countUp {
  from { opacity: 0; transform: scale(0.8); }
  to   { opacity: 1; transform: scale(1); }
}
```

| Animation | Usage |
|-----------|-------|
| `fadeUp` | Page / section entry |
| `fadeIn` | File loaded state |
| `slideInLeft` | Table row staggered entry |
| `spin` | Processing spinner |
| `pulse` | Active indicator dot, "Processing…" label |
| `countUp` | Summary card value reveal |

**Stagger rule:** Table rows use `animation-delay: index × 30ms`. Process steps use `index × 200ms`.

---

## Do's & Don'ts

### ✅ Do

- Use OKLCH for all new colors — ensures perceptual consistency
- Use `DM Mono` for every number, amount, date, and reference ID
- Use semantic colors: green = matched, amber = discrepancy, red = unmatched
- Always show `—` (em dash) for null amounts, never leave empty
- Use `text-wrap: pretty` on paragraphs
- Keep all transitions at `0.15s–0.2s ease` for snappiness
- Apply `border-top: 3px solid <color>` to distinguish summary card types

### ❌ Don't

- Don't use `Inter`, `Roboto`, or `Arial` — always `DM Sans` / `DM Mono`
- Don't use zebra striping on table rows — use `var(--surface)` uniformly
- Don't use gradient backgrounds on cards or the sidebar
- Don't round financial amounts — display exact values
- Don't use emoji in the UI — use stroke SVG icons only
- Don't use `box-shadow` with `rgba` — use `oklch(0% 0 0 / %)` instead
- Don't hard-code hex colors — always reference a CSS token

---

*ReconcileAI Design System · maintained by the Finance Product Team*
