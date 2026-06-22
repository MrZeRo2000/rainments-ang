# Migration Plan: Bootstrap + ngx-bootstrap → Angular Material

> **Status: PLANNING — no code changed yet.**
> This is a living document. Update the **Progress Log** and per-component
> checkboxes at the end of every working session. Read the
> **Instructions for future sessions** section before starting any work.

---

## 1. Goal & Scope

Fully remove **`bootstrap`** (CSS + `bootstrap.bundle.min.js`) and
**`ngx-bootstrap`** from the project and replace all of their behaviour and
styling with **Angular Material** (`@angular/material`, `@angular/cdk`).

Done step by step, **component by component**. The app must build, lint, and
pass tests after each component is migrated (no big-bang rewrite).

### Out of scope (do NOT change as part of this migration)
- **FontAwesome icons** (`@fortawesome/*`). They are orthogonal to the
  Bootstrap→Material move. Keep them. (A later, separate effort may swap them
  for `mat-icon`.) Note: Material components do not *require* `mat-icon`; FA
  icons can live inside Material buttons/menus fine.
- **D3 charts** (`reports-chart-date-totals`). Pure SVG, no Bootstrap.
- The signal/zoneless architecture — it is already done. Keep it. Do not
  reintroduce Zone.js. (See related effort: signal + zoneless migration.)

### Current relevant baseline
- Angular **21.2**, standalone components, **zoneless**, signal-based.
- `@angular/cdk@^21.2.2` is already installed; `@angular/material` is **NOT**.
- `provideAnimations()` is already in `app.config.ts` (Material needs this ✓).
- Tests run on **Vitest** under **jsdom**; `src/test-setup.ts` installs noop
  animations and zoneless CD. Strict unknown-element checks are **off**.

---

## 2. Inventory of what must change

### 2a. `ngx-bootstrap` feature usage (the behavioural surface)

| ngx-bootstrap feature | Used in | Material replacement |
|---|---|---|
| `alert` (`AlertComponent`) | `messages/message.component` (4 dismissible alert types) | Inline banner — custom `app-alert` styled with Material tokens, **or** `MatSnackBar` (transient). These are *inline panel* messages tied to a `messageSource`, so prefer an inline banner, NOT a snackbar. |
| `modal` (`BsModalService`, `BsModalRef`) | `core/components/confirmation-modal-dialog`, `core/table/common-editable-table-component`, `components/update-payment-group`, `payment-objects-table`, `payment-groups-table`, `products-table`, `payments-table` | **`MatDialog`** + `MatDialogRef` + `MAT_DIALOG_DATA` |
| `dropdown` (`BsDropdownModule`, `dropdown`/`dropdownToggle`/`*dropdownMenu`) | `core/components/drop-down-multi-select`, `components/payments-table-display-options`, `reports-table-display-options`, `reports-chart-date-totals-display-options` | **`MatMenu`** (see note on form-in-menu below). For the simple action menu, `MatMenu` items. |
| `dropdown` via **native Bootstrap JS** (`data-bs-toggle="dropdown"`) | `core/components/drop-down-more-menu` | **`MatMenu`** (this is the one place that depends on `bootstrap.bundle.min.js`) |
| `datepicker` (`BsDatepickerModule`, `bsDaterangepicker`) | `components/reports-master` (date **range** picker) | **`MatDateRangePicker`** (`mat-date-range-input` + `mat-date-range-picker`) + a date adapter (`provideNativeDateAdapter` or Luxon adapter) |
| `tooltip` (`TooltipModule`, `tooltip`/`isDisabled`) | `components/payments-table` | **`MatTooltip`** (`matTooltip`, `matTooltipDisabled`) |

> **Form-in-menu caveat:** `payments-table-display-options`,
> `reports-table-display-options`, and `reports-chart-date-totals-display-options`
> put a `<form>` of checkboxes inside the dropdown and use ngx-bootstrap's
> `[insideClick]="false"` so clicking a checkbox does NOT close the panel.
> `MatMenu` closes on item click by default. Two options:
> 1. Wrap the menu content and call `(click)="$event.stopPropagation()"` on the
>    container, and avoid `mat-menu-item` on the interactive rows; **or**
> 2. Use a **CDK Overlay** (`cdkConnectedOverlay`) for a fully custom popover.
> Prefer option 1 (MatMenu + stopPropagation) for consistency; fall back to CDK
> overlay only if focus/keyboard behaviour is wrong.

### 2b. `bootstrap` CSS usage (the styling surface)

Bootstrap classes are used broadly in templates. Frequency (approx):
`form-check` (35), `btn`/`btn-outline*`/`btn-sm` (~45), `d-flex`+utilities (17+),
`form-control` (15), `form-select` (12), `form-group` (8), `dropdown-*` (16),
`table`/`table-*` (~13), `row`/`col-*` (~15), `navbar*` (6), `card*` (9),
`badge` (3), `breadcrumb` (2), `alert` (2), `input-group` (3),
`modal-*` (5), `nav`/`nav-link`/`nav-pills` (8), `jumbotron` (1),
`spinner` (none — uses FA spinner), `progress` (0).

Bootstrap provides three things we lean on:
1. **Components** (buttons, forms, tables, cards, nav, modal, dropdown) →
   replaced per-component with Material equivalents.
2. **Layout grid** (`row`/`col-*`/`container*`) → replace with CSS flexbox/grid
   or Angular CDK Layout. Material has **no grid system**.
3. **Utility classes** (`d-flex`, `me-auto`, `mb-2`, `text-nowrap`, `text-center`,
   `w-*`, `align-items-*`) → these are the stickiest. Decide early (see §3).

`src/styles.scss` currently imports:
```scss
@import 'variables';                                  // src/_variables.scss
@import 'node_modules/bootstrap/scss/bootstrap';      // full bootstrap
@import 'node_modules/ngx-bootstrap/datepicker/bs-datepicker.scss';
```
plus custom rules that reference Bootstrap SCSS vars (`$table-border-color`,
`$border-radius`, `$btn-border-radius`, `$table-cell-padding-y`) and override
`.table`, `.breadcrumb`, `.jumbotron`, `.tooltip-inner`, `.badge-*`, link
underlines, label margins. `angular.json` injects
`node_modules/bootstrap/dist/js/bootstrap.bundle.min.js`.

---

## 3. Key decisions to make BEFORE component work (Phase 0)

These shape every later step. Resolve them first; record the answers here.

1. **Utility classes.** Bootstrap utilities (`d-flex`, `mb-2`, `me-auto`,
   `text-nowrap`, `w-50`, …) are used in ~every template. Options:
   - **(A) Adopt a lightweight utility layer** — keep a small hand-rolled SCSS
     file providing the ~15 utilities actually used (fl/spacing/text). Lowest
     churn; recommended. Lets us delete Bootstrap without touching every class.
   - (B) Replace each utility inline with component SCSS as we touch files.
     Cleaner long-term, much higher churn.
   - **Recommendation: (A)** — create `src/_utilities.scss` with only the
     utilities the app uses, so templates barely change when Bootstrap leaves.
2. **Date adapter for MatDatepicker.** `provideNativeDateAdapter` (zero deps,
   `Date` objects — matches current `Date[]` usage in `reports-master`) vs Luxon.
   **Recommendation: native adapter** (current code already passes `Date`s).
   Watch the input format: current picker uses `DD.MM.YYYY` — configure
   `MAT_DATE_FORMATS` / locale to match.
3. **Theme.** Define a Material 3 theme (`mat.theme`) in `styles.scss` with a
   primary/accent palette approximating the current look (dark navbar, primary
   buttons). Pick a palette now so component colors are consistent.
4. **Alert replacement.** Inline banner component vs MatSnackBar.
   **Recommendation:** inline `app-alert` (keeps `messageSource` panel routing).

> ⛔ Do not silence build/deprecation warnings to make Material/SCSS warnings go
> away (project rule). Fix at the root or leave visible.

---

## 4. Phased plan

Each phase ends with: `npm run build`, `npm run lint`, `npm test` all green,
and a Progress Log entry. Bootstrap and ngx-bootstrap stay installed until the
**final** phase so the app keeps working throughout.

### Phase 0 — Setup & scaffolding (schematic; minor visual shift acceptable)

> **Decision (2026-06-22):** Use the official `ng add @angular/material`
> schematic. The user accepts a slight appearance change; the only hard
> requirement is that the app keeps **compiling and running** so manual
> front-end testing stays possible. The schematic is the canonical, least
> error-prone setup path and never leaves the app in a non-building state.
>
> **The one real breakage risk to manage:** the standalone schematic adds an
> animations provider to `app.config.ts`, but the app **already** has
> `provideAnimations()`. Two animation providers can throw at runtime. We avoid
> this by running with **`--animations=excluded`** (schematic adds NO animations
> provider) and keeping the existing `provideAnimations()`. Reconcile/verify in
> the diff review step below.

> **WHAT ACTUALLY HAPPENED (2026-06-22):** The schematic could NOT run to
> completion in this environment: `ng add` shells out to `npm` to install, and
> `npm.cmd` is blocked by group policy here → the workflow aborted after only
> adding `@angular/material` to `package.json`, before applying any config/theme
> edits. **Resolution:** installed the package via the working `npm.ps1` route
> (`npm install @angular/material@21.2.2`), then applied the schematic's file
> edits MANUALLY (identical result, no blocked install). Future Material
> schematics (`ng generate @angular/material:<x>`) will hit the same block —
> apply their edits manually, or pre-install then run the generator.

- [x] Git working tree clean before starting (only the untracked plan file).
- [x] `@angular/material@21.2.2` installed (matches `@angular/cdk@21.2.2`).
- [x] Material 3 theme added to `src/styles.scss`: `@use '@angular/material'`
      (first statement) + `html { color-scheme: light; @include mat.theme(...) }`
      with azure primary / blue tertiary, density 0. Placed below the Bootstrap
      import; both coexist (non-overlapping selectors).
- [x] Roboto + Material Icons font links added to `src/index.html`.
- [x] `provideNativeDateAdapter()` added to `app.config.ts` (additive; first
      used in Phase 4). Existing `provideAnimations()` kept — NO duplicate
      animations provider (we never let the schematic touch `app.config.ts`).
      `DD.MM.YYYY` `MAT_DATE_FORMATS`/locale deferred to Phase 4.
- [x] `src/_utilities.scss` created as an empty, unimported placeholder
      (populated in Phase 5). Bootstrap import left intact.
- [x] **VALIDATION GATE:** `npm run build` ✓ · `npm test` ✓ (84 pass / 2 skip,
      unchanged) · `npm run lint` ⚠ 1 PRE-EXISTING error in the unmodified file
      `src/app/repository/update-payment-object-group-repository.ts`
      (`@angular-eslint/prefer-inject`, constructor injection) — NOT caused by
      Phase 0; out of scope. Phase 0 added zero new lint errors.
- [ ] **MANUAL VISUAL CHECK (USER):** run `npm start` and confirm every screen
      still renders and works. Minor font/spacing shift from Roboto + Material
      tokens is expected and OK; a broken layout or runtime error is not.

> **Rollback:** `git checkout package.json package-lock.json src/styles.scss
> src/index.html src/app/app.config.ts` + delete `src/_utilities.scss`, then
> `npm install`, returns to the exact pre-migration state.
>
> **Open item for later:** the pre-existing `prefer-inject` lint error in
> `update-payment-object-group-repository.ts` is unrelated to this migration but
> keeps `npm run lint` red. Decide separately whether to fix it (trivial
> inject() refactor) so the lint gate can be fully green in later phases.

### Phase 1 — Leaf / low-risk components (build confidence)
Order chosen so shared pieces land before their consumers.
- [ ] **`messages/message.component`** — replace ngx `alert` with the new inline
      `app-alert` (or MatSnackBar per §3.4). Update `message.component.spec.ts`
      and `app.component.spec.ts` / `settings.component.spec.ts` which import
      `AlertModule`.
- [ ] **`payments-table` tooltip** — swap `TooltipModule` → `MatTooltip`
      (`matTooltip` + `matTooltipDisabled`). (Modal in this file handled in
      Phase 3.)
- [ ] **`loading-spinner-element` / `loading-progress`** — currently FA spinner.
      Optional: swap to `MatProgressSpinner`/`MatProgressBar`. Low priority;
      decide if worth it.

### Phase 2 — Dropdowns / menus
- [ ] **`core/components/drop-down-more-menu`** — replace native Bootstrap
      `data-bs-toggle` dropdown with `MatMenu`. **This removes the last runtime
      dependency on `bootstrap.bundle.min.js`** → after this, remove the script
      from `angular.json` and re-test.
- [ ] **`core/components/drop-down-multi-select`** — `MatMenu` with checkable
      items (multi-select). Uses `[insideClick]="false"` semantics → keep panel
      open on selection (stopPropagation pattern, §2a caveat).
- [ ] **`payments-table-display-options`** — form-in-menu (7 switches). MatMenu +
      stopPropagation, `mat-slide-toggle` or `mat-checkbox` for switches.
- [ ] **`reports-table-display-options`** — same pattern.
- [ ] **`reports-chart-date-totals-display-options`** — same pattern.

### Phase 3 — Dialogs (Modal)
- [ ] **`core/components/confirmation-modal-dialog`** — convert to `MatDialog`
      content component: inject `MatDialogRef` + `MAT_DIALOG_DATA` (carry
      `message`, `item`, `result` Subject). Use `<h2 mat-dialog-title>`,
      `<mat-dialog-content>`, `<mat-dialog-actions>`.
- [ ] **`core/table/common-editable-table-component`** — replace
      `BsModalService.show()` / `BsModalRef` with `MatDialog.open()` /
      `MatDialogRef`. This is the shared base used by the tables.
- [ ] **`components/update-payment-group`** — uses its own `modalService.show()`.
- [ ] **`payment-objects-table`**, **`payment-groups-table`**,
      **`products-table`** — they inject `BsModalService` via the base; verify
      after base is migrated. Update their `*.spec.ts` (they import `ModalModule`
      / `BsModalService`).
- [ ] Remove `data-management.component.spec.ts` `ModalModule` import etc.

### Phase 4 — Datepicker (highest risk)
- [ ] **`components/reports-master`** — replace `bsDaterangepicker` with
      `mat-date-range-input` + `mat-date-range-picker` (+ `MatFormField`).
      Preserve: min/max dates, `Date[]` two-element range, `DD.MM.YYYY` display
      format, the `onDateRangeValueChange` reload behaviour. Remove the
      `bs-datepicker.scss` import from `styles.scss`.

### Phase 5 — Structural CSS: buttons, forms, tables, nav, cards, grid
Migrate Bootstrap CSS-only components to Material, file by file. These have no
ngx-bootstrap JS dependency, just classes.
- [ ] **Buttons** — `btn`/`btn-outline-*`/`btn-sm`/`btn-group` → `mat-button`,
      `mat-stroked-button`, `mat-raised-button`, `mat-button-toggle-group`
      (for the Chart/Table toggle in `reports-master`).
- [ ] **Forms** — `form-control`/`form-select`/`form-check`/`form-group` →
      `mat-form-field` + `matInput` / `mat-select` / `mat-checkbox` /
      `mat-slide-toggle`. Touch: `update-payment-group`, `settings`,
      table editors, display-options panels.
- [ ] **Tables** — `table`/`table-*` → decide: keep semantic `<table>` with
      Material table styles, or migrate to `MatTable`. The tables here are
      custom editable tables (`common-editable-table-component`); a full
      `MatTable` rewrite is large. **Recommendation:** keep `<table>` markup,
      restyle with a small SCSS layer, defer `MatTable` unless needed.
- [ ] **Nav** — `nav-top` navbar → `MatToolbar` + `mat-button` links;
      `settings` `nav-pills` → `mat-nav-list` or `mat-tab-group`.
- [ ] **Cards** — `card`/`card-*` → `mat-card`.
- [ ] **Badges** — `badge` → `matBadge` or styled span.
- [ ] **Breadcrumb / jumbotron** — no Material equivalent; restyle with custom
      SCSS (small).
- [ ] **Grid** (`row`/`col-*`/`container*`) → flexbox/CSS grid via
      `_utilities.scss`.

### Phase 6 — Teardown
- [ ] Grep the repo: **zero** matches for `ngx-bootstrap` and for Bootstrap-only
      classes (`btn`, `form-control`, `row`, `col-`, `navbar`, …) outside the
      utility shim. Use the verification grep in §6.
- [ ] Remove from `styles.scss`: `@import bootstrap`, any Bootstrap-var usages.
- [ ] Remove `bootstrap.bundle.min.js` from `angular.json` (should already be
      gone after Phase 2).
- [ ] `npm uninstall bootstrap ngx-bootstrap`.
- [ ] Review `src/_variables.scss` — drop Bootstrap-derived vars.
- [ ] Clean `src/test-setup.ts` comment about "ngx-bootstrap modules that inject
      AnimationBuilder" (noop animations still needed for Material though — keep
      the provider, update the comment).
- [ ] Final full build/lint/test + manual smoke of every screen.
- [ ] Update `README.md` / `REWORK_RECOMMENDATIONS.md` references.

---

## 5. Per-file work tracker

> Check off as each file is fully migrated AND its spec updated.

**ngx-bootstrap-bound (.ts):**
- [ ] `src/app/messages/message.component.ts` (alert)
- [ ] `src/app/messages/message.component.spec.ts`
- [ ] `src/app/app.component.spec.ts` (AlertModule import)
- [ ] `src/app/components/settings/settings.component.spec.ts` (Alert+Modal)
- [ ] `src/app/core/components/confirmation-modal-dialog/confirmation-modal-dialog.component.ts` (modal)
- [ ] `src/app/core/components/confirmation-modal-dialog/confirmation-modal-dialog.component.spec.ts`
- [ ] `src/app/core/table/common-editable-table-component.ts` (modal)
- [ ] `src/app/components/update-payment-group/update-payment-group.component.ts` (modal)
- [ ] `src/app/components/update-payment-group/update-payment-group.component.spec.ts`
- [ ] `src/app/components/payment-objects-table/*.ts` + spec (modal)
- [ ] `src/app/components/payment-groups-table/*.ts` + spec (modal)
- [ ] `src/app/components/products-table/*.ts` + spec (modal)
- [ ] `src/app/components/payments-table/payments-table.component.ts` (modal + tooltip)
- [ ] `src/app/components/payments-table/payments-table.component.spec.ts`
- [ ] `src/app/components/payments-master/payments-master.component.spec.ts` (ModalModule)
- [ ] `src/app/components/data-managment/data-management.component.spec.ts` (ModalModule)
- [ ] `src/app/core/components/drop-down-multi-select/drop-down-multi-select.component.ts` (dropdown)
- [ ] `src/app/core/components/drop-down-more-menu/drop-down-more-menu.component.ts` (native dropdown)
- [ ] `src/app/components/payments-table-display-options/*.ts` (dropdown)
- [ ] `src/app/components/reports-table-display-options/*.ts` (dropdown)
- [ ] `src/app/components/reports-chart-date-totals-display-options/*.ts` (dropdown)
- [ ] `src/app/components/reports-master/reports-master.component.ts` (datepicker + dropdown consumers)
- [ ] `src/app/test-setup.ts` (comment cleanup, keep noop anim)
- [ ] `src/app/app.config.ts` (comment cleanup + add date adapter)

**Config/global:**
- [ ] `src/styles.scss` (remove bootstrap + bs-datepicker imports; add theme + utilities)
- [ ] `src/_variables.scss` (drop bootstrap vars)
- [ ] `angular.json` (remove bootstrap JS script)
- [ ] `package.json` (uninstall bootstrap, ngx-bootstrap)

---

## 6. Verification commands (run each session)

```bash
# In project root (rainments-ang). Use the Bash tool for these.
# Build / lint / test:
npm run build
npm run lint
npm test

# Find remaining ngx-bootstrap:
grep -rn "ngx-bootstrap" src

# Find remaining Bootstrap component classes (should shrink toward 0):
grep -rhoE 'class="[^"]*"' src --include="*.html" \
  | grep -oE '\b(btn|btn-[a-z-]+|form-control|form-select|form-check|card|card-[a-z]+|modal-[a-z]+|row|col-[a-z0-9-]+|navbar[a-z-]*|nav-pills|dropdown-[a-z]+|input-group|breadcrumb|badge)\b' \
  | sort | uniq -c | sort -rn
```
> npm in this environment: see user memory — use `env.ps1` + bypass exec policy
> if `npm` is blocked, or run via the Bash tool.

---

## 7. Instructions for future sessions (READ FIRST)

1. **Re-read this whole file**, then look at the **Progress Log** (§8) to see
   where we stopped and what the next unchecked item is.
2. **One component at a time.** After each, run build + lint + test (§6) and
   only then check the box and add a Progress Log line.
3. **Keep both libraries installed** until Phase 6. The app must stay runnable
   on every commit. Bootstrap CSS and Material can coexist; if cascade conflicts
   appear, scope Material with `@layer` or tighten selectors — do **not** add
   `!important` spam.
4. **Do not** suppress SCSS/deprecation/build warnings to make Material happy
   (project rule). Fix the root cause or leave the warning visible.
5. **Specs:** every ngx-bootstrap component has a `.spec.ts` importing an ngx
   module (`AlertModule`/`ModalModule`/etc). Update the spec in the SAME step as
   the component, or tests break. Tests are Vitest+jsdom, zoneless, noop
   animations (`test-setup.ts`). Material dialogs/menus use overlays — may need
   `MatDialogModule`/`OverlayModule` and harnesses (`@angular/cdk/testing`).
6. **Keep FontAwesome.** Don't replace FA icons with mat-icon in this migration.
7. **Datepicker is the riskiest item** — leave it for Phase 4, preserve the
   `Date[]` range shape and `DD.MM.YYYY` format that `reports-master` relies on.
8. **The form-in-dropdown panels** must NOT close on inner click (today's
   `[insideClick]="false"`). Verify this behaviour after migrating each.
9. Prefer JPQL/idioms already in the repo; match surrounding code style. (This
   is a frontend project; the repo's signal/zoneless idioms are the norm —
   follow them.)
10. When a phase completes, update §8 and tick the phase box in §4.

---

## 8. Progress Log

> Newest entry on top. Format: `YYYY-MM-DD — what changed — build/lint/test status`.

- 2026-06-22 — **Phase 0 EXECUTED.** Installed `@angular/material@21.2.2`; added
  M3 `mat.theme` to `styles.scss`, Material fonts to `index.html`,
  `provideNativeDateAdapter()` to `app.config.ts`; created empty
  `src/_utilities.scss`. `ng add` schematic aborted on the group-policy-blocked
  npm install, so config edits were applied manually (same result). Build ✓,
  tests ✓ (84/2), lint ⚠ only a pre-existing unrelated error. Bootstrap +
  ngx-bootstrap still fully installed and active — app unchanged behaviourally.
  **Awaiting user manual visual check, then proceed to Phase 1 (alert + tooltip).**
- 2026-06-22 — Phase 0 reworked to a **controlled, guaranteed non-breaking**
  setup: `npm install @angular/material` only (NOT the schematic, to avoid its
  global font/body/typography injection), scoped theme tokens below the
  Bootstrap import, additive date-adapter provider, and an explicit validation
  gate (build+lint+test+visual-identical) with a 3-file rollback. Rationale:
  Material (`mat-*`/`.mat-*`/`.cdk-*`) and Bootstrap (`.btn`/`.row`/…) selectors
  do not overlap, so coexistence is clean. No code changed.
- 2026-06-22 — Plan created. No code changed. Inventory complete: 6 ngx-bootstrap
  features (alert, modal, dropdown, native-dropdown, daterangepicker, tooltip)
  across the files in §5; `@angular/material` not yet installed; `@angular/cdk`
  already present; app is zoneless/signal/standalone with `provideAnimations()`.
  **Next: Phase 0 — controlled install + resolve §3 decisions.**
