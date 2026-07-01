# Migration Plan: Bootstrap + ngx-bootstrap + FontAwesome → Angular Material

> **Status: IN PROGRESS.**
> This is a living document. Update the **Progress Log** and per-component
> checkboxes at the end of every working session. Read the
> **Instructions for future sessions** section before starting any work.

---

## 1. Goal & Scope

Fully remove **`bootstrap`** (CSS + `bootstrap.bundle.min.js`),
**`ngx-bootstrap`**, AND **FontAwesome** (`@fortawesome/*`) from the project and
replace all of their behaviour, styling, and icons with **Angular Material**
(`@angular/material`, `@angular/cdk`) — icons via **`mat-icon`** (Material Icons
font, already linked in `index.html` from Phase 0).

> **Scope update (2026-06-22):** FontAwesome removal was added to the target at
> the user's request. Originally FA was out of scope. **Rule going forward: when
> you migrate a component, also replace ALL its `fa-icon` usages with
> `mat-icon`** — do not leave a migrated component depending on FontAwesome.
> (`add-panel` was briefly migrated with its FA plus icon retained, then fixed.)

Done step by step, **component by component**. The app must build, lint, and
pass tests after each component is migrated (no big-bang rewrite).

### Out of scope (do NOT change as part of this migration)
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

### 2c. FontAwesome usage (icons → `mat-icon`)

Packages: `@fortawesome/angular-fontawesome`, `@fortawesome/fontawesome-svg-core`,
`@fortawesome/free-solid-svg-icons`. Icons are registered centrally in
`src/app/font-awesome-icons/font-awesome-icons.module.ts` (a `FaIconLibrary`),
which is provided app-wide via `importProvidersFrom(FontAwesomeIconsModule)` in
`app.config.ts`. Each component imports `FaIconComponent` and uses `<fa-icon>`.

**Components still using `<fa-icon>` (12; verify before each migration):**
`backup-database-button`, `payments-dashboard`, `payments-date-selection`,
`payments-selectable-panel`, `payments-table`, `colored-trend-label`,
`display-icon-element`, `drag-grip`, `drop-down-more-menu`, `edit-delete-panel`,
`report-nav`. (DONE/FA-free: `loading-spinner-element`, `add-panel`.)

**Icon name mapping (FA solid → Material Icons ligature).** Use as a default;
adjust per visual taste:

| FontAwesome | `mat-icon` | | FontAwesome | `mat-icon` |
|---|---|---|---|---|
| `faPlus` | `add` | | `faEye` | `visibility` |
| `faPlusCircle` | `add_circle` | | `faEdit`/`faPen` | `edit` |
| `faTrash` | `delete` | | `faClone` | `content_copy` |
| `faSave` | `save` | | `faSearch` | `search` |
| `faFileExport` | `file_download` | | `faCog` | `settings` |
| `faLock` | `lock` | | `faChartLine` | `show_chart` |
| `faSignInAlt` | `login` | | `faEllipsisH` | `more_horiz` |
| `faSignOutAlt` | `logout` | | `faGripVertical` | `drag_indicator` |
| `faTimes`/`faWindowClose` | `close` | | `faExclamation` | `priority_high` |
| `faCheckCircle` | `check_circle` | | `faCheckDouble` | `done_all` |
| `faAngleLeft` | `chevron_left` | | `faCaretUp` | `arrow_drop_up` |
| `faAngleRight` | `chevron_right` | | `faCaretDown` | `arrow_drop_down` |
| `faEquals` | `drag_handle` | | `faSpinner` | (→ `mat-spinner`, done) |

Notes:
- `colored-trend-label` switches icon by sign (`caret-up`/`caret-down`/`equals`)
  → conditional `<mat-icon>` with `arrow_drop_up`/`arrow_drop_down`/`drag_handle`
  (or consider `trending_up`/`trending_down`/`trending_flat` for clearer trend
  semantics).
- FA `transform="grow-N"`/`[fixedWidth]` sizing → use `mat-icon` font-size via
  CSS (`mat-icon { font-size/width/height }`) where size matters.
- Icon-inside-Material-button: `mat-icon` is styled automatically inside
  `matButton`/`matIconButton`.
- **Material Icons font is already linked** in `index.html` (Phase 0), so
  ligatures like `<mat-icon>add</mat-icon>` render with no extra setup.

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
- [x] **`loading-spinner-element`** — DONE (2026-06-22). FA spinner → `mat-spinner`
      (`MatProgressSpinnerModule`, `[diameter]="32"`, `:host{display:inline-block}`
      to stay inline next to the loading message). No spec existed. Build ✓ /
      tests ✓ (84/2). NOTE: `faSpinner` in `font-awesome-icons.module.ts` is now
      unused (this was its only consumer) — optional cleanup, left in place.
- [ ] **`loading-progress`** — pure wrapper around the spinner + message; no
      Bootstrap/ngx-bootstrap. No change needed unless we restyle later.

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

### Phase 5b — FontAwesome icons → `mat-icon`
Done opportunistically as part of each component migration (see the §1 rule:
never leave a migrated component on FA). This phase is the explicit sweep to
catch anything left, then remove FA entirely.
- [ ] Confirm every `<fa-icon>` in §2c's component list has been replaced with
      `<mat-icon>` (grep `fa-icon`/`FaIcon` → zero in components).
- [ ] Remove `importProvidersFrom(FontAwesomeIconsModule)` from `app.config.ts`
      (keep `RepositoryModule`).
- [ ] Delete `src/app/font-awesome-icons/font-awesome-icons.module.ts`.
- [ ] `npm uninstall @fortawesome/angular-fontawesome @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons`.
- [ ] Remove `$fa-font-path` from `src/_variables.scss`.

### Phase 6 — Teardown

> **Bootstrap-coexistence workarounds to REMOVE once Bootstrap CSS is gone**
> (added only because Bootstrap's global resets still apply during migration):
> - [ ] `styles.scss`: `.mat-mdc-icon-button { line-height: 1 }` (counteracts
>       Bootstrap's global `line-height: 1.5` offsetting icon-button glyphs).
> - [ ] `styles.scss`: the `a:not([class*="btn"])…:hover { text-decoration }`
>       link-underline rules (they underline Material anchors on hover).
> - [ ] Per-component `line-height: 1` glyph-centering rules added for the same
>       Bootstrap leak: `drag-grip` (`:host mat-icon`), `report-nav`
>       (`.report-link mat-icon`), `drop-down-more-menu` (`:host button` — now
>       redundant with the global icon-button rule), `confirmation-modal-dialog`
>       (`.confirm-close`). Re-check each renders centered WITHOUT the rule, then
>       delete.
> - [ ] `colored-value-label`: literal Bootstrap-ish colors (#198754/#dc3545/
>       #6c757dad) — revisit vs theme tokens.
> - [ ] Dead global rules in `styles.scss`: `.badge-value`, `.badge-value-light`
>       (last consumer migrated), `.jumbotron`/`.breadcrumb`/table-border fixes
>       (re-check usage).

- [ ] Grep the repo: **zero** matches for `ngx-bootstrap`, `@fortawesome`/
      `fa-icon`, and Bootstrap-only classes (`btn`, `form-control`, `row`,
      `col-`, `navbar`, …) outside the utility shim. Use the verification grep
      in §6.
- [ ] Remove from `styles.scss`: `@import bootstrap`, any Bootstrap-var usages.
- [ ] Remove `bootstrap.bundle.min.js` from `angular.json` (should already be
      gone after Phase 2).
- [ ] `npm uninstall bootstrap ngx-bootstrap` (FA already removed in Phase 5b).
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

- 2026-06-22 — **SCOPE EXPANDED: remove FontAwesome too** (user request). Plan
  retitled; §1 goal + §2c FA inventory/icon-map + Phase 5b (FA→mat-icon sweep &
  uninstall) added. New rule: every component migration must also replace its
  `fa-icon`s with `mat-icon`. Audited already-migrated components:
  `loading-spinner-element` already FA-free ✓; `add-panel` still had a FA plus
  icon → fixed (now `<mat-icon>add</mat-icon>`, fully FA-free). Build ✓, tests ✓.
- 2026-07-01 — **`payments-table-display-options` migrated** (first dropdown →
  MatMenu). ngx-bootstrap `dropdown`/`[insideClick]="false"` + 8 Bootstrap
  `form-check form-switch` + FA cog trigger → `matIconButton`+`<mat-icon>settings</mat-icon>`
  triggering a `mat-menu` (`xPosition="before"`). Switches → `mat-slide-toggle`
  via `[checked]`/`(change)` (no ngModel/FormsModule needed); `<hr>` → `mat-divider`.
  Form-in-menu stays open: wrapper `(click)="$event.stopPropagation()"`. Inlined
  `mat-icon settings` instead of the FA `display-icon-element` (dropped its import;
  that shared cog component still used by the other 2 display-options panels until
  migrated). Spec dropped `FontAwesomeIconsModule`. Build ✓, tests ✓ (83/2). First
  of the ngx dropdowns done; pattern set for reports-table-display-options +
  reports-chart-date-totals-display-options + drop-down-multi-select.
- 2026-07-01 — **Cards forced white.** `--mat-sys-surface` is `#fbf9f9` (off-white
  gray from the grayscale seed) so mat-cards looked tinted vs Material examples.
  Added `mat.card-overrides((elevated/outlined-container-color: #ffffff))` in
  styles.scss (targeted, like the table-white override; menus/dialogs unaffected).
  Build ✓, tests ✓ (83/2).
- 2026-07-01 — **Enabled Material typography.** `mat.theme` had `color`+`density`
  but no `typography`, so type-scale tokens (`--mat-sys-title-large` etc.) didn't
  exist → `mat-card-title` looked like body text (user noticed on payments-summary).
  Added `typography: Roboto` (Roboto already linked in index.html). Affects only
  Material components' text (not Bootstrap elements); permanent (not a coexistence
  workaround). `--mat-sys-title-large: 400 1.375rem/1.75rem Roboto`. Build ✓, tests ✓.
- 2026-07-01 — **`payments-summary` migrated.** Two Bootstrap `card`s →
  `<mat-card appearance="outlined">` + `mat-card-header`/`mat-card-title`. Summary
  card: `d-flex`/`text-end` → `.summary-row`/`.summary-labels`/`.summary-values`
  scss. "By group" `table table-bordered` → flex `mat-table` (group/amount cols,
  per-row `[style.background-color]="row.paymentGroup.color"`, replacing
  `--bs-table-bg`). Removed `NgStyle`; added MatCard/MatTable. No FA. Build ✓,
  tests ✓ (83/2).
- 2026-07-01 — **`payments-selectable-panel` migrated & FA-free.** Select-all /
  clear-all: `btn btn-outline-primary` + FA `check-double`/`times` →
  `matIconButton` + `<mat-icon>done_all</mat-icon>`/`clear` with tooltips; `.text-left`
  span + `me-2` → `.selectable-panel` inline-flex gap. Removed FA. Build ✓, tests ✓.
- 2026-06-26 — **`payments-date-selection` migrated & FA-free.** Date navigator
  `[<][period][year][>]`: FA `angle-left/right` buttons → `matIconButton` +
  `<mat-icon>chevron_left/right</mat-icon>` with real `[disabled]` at boundaries
  (selectedFirstDate/LastDate); Bootstrap `form-select` selects → `mat-form-field`
  + `mat-select` (`subscriptSizing="dynamic"`, `[ngValue]`→`[value]`); `form-inline
  d-flex` → `.date-selection` flex row (scss, fields 9rem). Removed `NgClass`/FA;
  spec dropped `FontAwesomeIconsModule`. Build ✓, tests ✓ (83/2).
- 2026-06-25 — **Removed `MessageComponent` entirely.** Since messages are global
  snackbars (MessagesService), the no-op `<app-message>` was dead. Removed the 3
  remaining tags (payments-master, reports-master, settings) + their MessageComponent
  imports + app.component.spec import; deleted message.component.ts + .spec. Kept
  MessagesService + message.model. NOTE: `messageSource` inputs on update-payment-group
  / backup-database remain (flow into the message's now-ignored source field) —
  optional deeper cleanup. Test count 84→83 (deleted spec). Build ✓, tests ✓ (83/2).
- 2026-06-25 — **`colored-value-label` migrated.** Bootstrap `badge`/`bg-success`/
  `bg-danger`/`badge-value(-light)` + `NgClass` → a styled `.value-label` pill
  (component scss) with `[class.value-label--positive/negative]` modifiers; kept
  the same look (green `#198754` / red `#dc3545` / neutral `#6c757dad`). No
  Material component (matBadge is an overlay, mat-chip too heavy) — a styled span
  is the faithful equivalent. Removed `NgClass`. Used by dashboard + payments-table.
  Global `.badge-value`/`.badge-value-light` in styles.scss now dead (remove in
  teardown). Build ✓, tests ✓ (84/2).
- 2026-06-25 — **`report-nav` migrated & FA-free.** FA `chart-line` (`text-muted
  h4`) → `<mat-icon>show_chart</mat-icon>` inside the existing nav anchor; muted
  via `.report-link { color: var(--mat-sys-on-surface-variant) }` + `mat-icon`
  line-height:1. Spec dropped `FontAwesomeIconsModule`. Used by dashboard +
  payments-master. NOTE: nav-top final bg = `--mat-sys-primary` (lighter than the
  near-black inverse-surface, per user). The Bootstrap-era link-underline rule in
  styles.scss still underlines Material anchors on hover — user OK with it; it'll
  go away in the Bootstrap CSS teardown (remove those `a:not(...)` rules then).
  Build ✓, tests ✓ (84/2).
- 2026-06-25 — **`nav-top` migrated.** Bootstrap `navbar navbar-dark bg-dark`
  + `nav-link`/`navbar-nav` → `<mat-toolbar>` with `<a mat-button routerLink
  routerLinkActive>`. Kept the dark look via `mat.toolbar-overrides`
  (container-background = `--mat-sys-inverse-surface`, text = inverse-on-surface)
  + `mat.button-overrides(text-label-text-color: inverse-on-surface)` so links are
  light on dark. Active route → `.nav-top__active` (subtle light overlay + bold).
  Dropped the empty navbar-brand. Build ✓, tests ✓ (84/2).
- 2026-06-25 — **`payments-dashboard` migrated** (appearance retained). Bootstrap
  `card`/`card-body`/`card-title` → `<mat-card appearance="outlined">` (outlined ≈
  Bootstrap card border). Responsive `row`/`col-xl-3`/`col-lg-4`/`col-md-6` → CSS
  grid with matching breakpoints (4/3/2/1 cols at ≥1200/992/768/else). `.stretched-link`
  → custom `.card-link` (absolute inset-0, z-index 1); `report-nav-cell` z-index 2
  so its links stay clickable. FA `exclamation` (text-danger) → `<mat-icon
  class="overdue-icon">priority_high</mat-icon>` colored `--mat-sys-error`. d-flex
  utilities → component scss flex. Removed inert `<app-message>` + MessageComponent
  import. Spec keeps `FontAwesomeIconsModule` (report-nav child still uses FA).
  Build ✓, tests ✓ (84/2).
- 2026-06-25 — **`backup-database-button` migrated → BOOTSTRAP JS DROPPED.**
  Header button: `btn btn-outline-primary` + FA save + Bootstrap **toast**
  (`bootstrap.Toast`, `data-bs-*`) → `<button matIconButton matTooltip="Backup
  database">` + `<mat-icon>save</mat-icon>`. Disabled while running via
  `[disabled]="backupDatabaseRepository.loadingSignal()"` (prevents repeat
  presses). Removed the toast entirely; success feedback is the snackbar — the
  button now reports it (`MessagesService.reportMessage(SuccessMessage)`) since
  it's always mounted, and `BackupDatabaseComponent` no longer reports (avoids a
  duplicate snackbar; it just refreshes its info). This was the LAST
  `bootstrap.bundle.min.js` user → **removed the script from `angular.json`**
  (`scripts: []`). Confirmed zero `data-bs-*`/`bootstrap.*` JS in src. Build ✓,
  tests ✓ (84/2). Bootstrap **CSS** + ngx-bootstrap (dropdown/datepicker/tooltip)
  still present; FA still used by ~7 components.
- 2026-06-25 — **`update-payment-group`, `backup-database`, `data-management`
  migrated.** update-payment-group: 3 Bootstrap `form-select` → `mat-form-field`
  + `mat-select` + `mat-error` (shared-style, ErrorStateMatcher gated on the
  component's `formSubmitted` flag); Update button → `matButton="outlined"` in a
  new global `.app-form-actions` row (added to _forms.scss). backup-database:
  `.alert-info` → a `.backup-info` box (surface-container); Backup button →
  `matButton="outlined"`. data-management: removed the now-inert `<app-message>`
  tags + `MessageComponent` import (messages are global snackbars now). Error
  gating from the prior entry also applies. Build ✓, tests ✓ (84/2). NOTE:
  `backup-database-button` (header save button, NOT in scope) still uses the
  Bootstrap **toast** (`bootstrap.bundle.min.js`) + FA save icon — it's the last
  native-Bootstrap-JS user; migrate it (toast → snackbar) before dropping the
  bootstrap script.
- 2026-06-25 — **Message snackbar moved to `MessagesService` + read-repo error
  fix.** Two bugs surfaced by a simulated 404: (1) **stuck loading** — read
  repository's `catchError` returned `[]` (an ObservableInput that emits nothing),
  so the `loadingSignal.set(false)` tap never ran → changed to `of([])`.
  (2) **error snackbar never showed** — the component-`effect()` approach +
  `initialized` guard swallowed the error reported around panel mount. Moved the
  snackbar into `MessagesService.reportMessage()` (opens at report-time, like
  violetnote's MessageService) — robust, no mount-timing dependency. `MessageComponent`
  reduced to a no-op (`template: ''`, keeps `messageSource` input) since display is
  now global; `<app-message>` tags left inert (removable later). Test-safe: no spec
  calls reportMessage. Build ✓, tests ✓ (84/2).
- 2026-06-25 — **`MessageComponent` redesigned → MatSnackBar** (Phase 1 alert,
  violetnote-style). Replaced the inline ngx-bootstrap `<alert>` with a snackbar:
  the component now renders nothing (`template: ''`) and, via an effect on
  `MessagesService.lastMessage()` filtered by `messageSource`, opens a
  `MatSnackBar` (bottom-center, duration 7s errors / 4s else, panelClass per
  severity). Kept the `<app-message>`+`messageSource` routing and the
  `MessagesService` API unchanged (no template/caller changes). An `initialized`
  guard skips the pre-existing message on mount so navigation doesn't re-toast a
  stale message. Deleted message.component.html/.scss. Added global snackbar
  color classes in styles.scss (`.app-snackbar-error/success/warning/info` via an
  `app-snackbar` mixin). Removed `ngx-bootstrap/alert` (`AlertModule`) from the
  message/settings/app.component specs. **Zero `ngx-bootstrap/alert` refs left in
  src.** Build ✓, tests ✓ (84/2). ngx-bootstrap remaining: dropdown (multi-select
  + 3 display-options), datepicker (reports-master), tooltip (payments-table).
- 2026-06-25 — **`products-table` migrated** (last of the 3 tables; modeled on
  payment-objects). Table → flex `mat-table` + CDK DnD (id/name/unitName/actions);
  form → `mat-form-field`/`matInput` (name, unitName) + `mat-select` (counterPrecision)
  + `mat-error` + shared `ErrorStateMatcher` + `.app-form`. Removed `NgClass`/
  `CdkDragPreview`. ALSO FIXED: products was missing `MatMenuItem` in imports (its
  Phase-3 `<button mat-menu-item>` was rendering as a plain button) — added it.
  Column widths in scss (id/unitName/actions fixed, name fills). Build ✓, tests ✓
  (84/2; color-utils timeout flake again on a slow run, green on re-run).
  **All 3 editable tables (objects/groups/products) now fully Material + FA-free
  except shared bits already done.** Remaining ngx-bootstrap: alert, dropdown
  (multi-select + display-options), datepicker, tooltip.
- 2026-06-24 — **`payment-groups-table` migrated** (modeled on payment-objects).
  Table → flex `mat-table` + CDK DnD; per-row color via `[style.background-color]="row.color"`
  (replaces Bootstrap `--bs-table-bg`); name cell keeps conditional URL link. Form
  → `mat-form-field`/`matInput`/`mat-error` + shared `ErrorStateMatcher` + `.app-form`;
  Preview switch → `mat-slide-toggle` (`[(ngModel)]` standalone); native
  `<input type="color">` kept (Material has no color field). Two fixes the user
  flagged: (1) **Preview paints the WHOLE field** not just the input text — set a
  `--name-preview-bg` custom prop on the field + `::ng-deep .mat-mdc-text-field-wrapper
  { background-color: var(...) }`. (2) **Color input `#rrggbb` console error** on
  reset/edit — coerce empty→`#FFFFFF` via `color.valueChanges` subscription
  (`takeUntilDestroyed`, `setValue(..., {emitEvent:false})`). Also fixed the shared
  **drag-grip vertical centering** (bare `mat-icon` inheriting Bootstrap line-height
  1.5 → `:host mat-icon { line-height:1; display:block }`) — affects all tables.
  Build ✓, tests ✓ (84/2; one color-utils timeout flake on a slow run, green on re-run).
- 2026-06-24 — **PHASE 3 DONE: ngx-bootstrap modal → MatDialog (all usages).**
  `ConfirmationModalDialogComponent` → MatDialog content: `MAT_DIALOG_DATA`
  (`{message}`), `<h2 mat-dialog-title>` + `<mat-dialog-content [innerHTML]>` +
  `<mat-dialog-actions>`. Replaced the old `BsModalService.show()` + `Subject`/
  `initialState` plumbing with `MatDialog.open(...).afterClosed().subscribe(confirmed
  => …)` in the base `common-editable-table-component` (delete confirm) and in
  `update-payment-group` (import confirm). Removed `modalService` param from BOTH
  base constructors (`CommonEditableTableComponent`, `CommonSimpleEditableTableComponent`)
  → base now `inject(MatDialog)`; updated 4 subclass `super()` calls
  (payment-objects/groups/products/payments tables) to drop `inject(BsModalService)`.
  Dialog UX: expressive header (warning `mat-icon` in `--mat-sys-error`) + red
  Confirm via `mat.button-overrides((filled-container-color: error, ...))`.
  Cleaned ngx `ModalModule`/`BsModalService` from 8 specs + confirmation spec now
  provides `MAT_DIALOG_DATA`/`MatDialogRef`. **Zero `ngx-bootstrap/modal` refs left
  in src.** Build ✓, tests ✓ (84/2). ngx-bootstrap remaining: alert (message.component),
  dropdown (multi-select + display-options), datepicker (reports-master), tooltip.
- 2026-06-23 — **`core/components/save-dialog-panel` migrated.** Bootstrap
  `input-group`/`btn btn-outline-primary`/`btn-outline-secondary`/`mt-2`/`ms-2`/
  `justify-content-end` → `matButton="outlined"` (Create/Save) + `matButton`
  (Cancel) in a `.save-dialog-actions` flex row (right-aligned, gap, margin-top).
  Kept `type="button"` (lives inside a `<form>` — Material buttons default to
  submit otherwise). Added `MatButtonModule`. Shared by all 4 tables; no spec, no
  FA. Build ✓, tests ✓ (84/2). NOTE on tooling: settings.json permission rules
  added mid-session aren't honored until a config reload (`/hooks` or restart) —
  that caused repeated npm prompts; resolved after reload. npm is allowlisted in
  `~/.claude/settings.json`.
- 2026-06-23 — **`payment-objects-table` EDIT FORM migrated** + **common form
  styles created.** Bootstrap form (`form-group`/`form-control`/`form-select`/
  `is-invalid`/`invalid-feedback`/`row`/`col-md-*`) → `mat-form-field` +
  `matInput` (name) + `mat-select`/`mat-option` (period/termQuantity/termType/
  payDelay) + `mat-error`. Created reusable **`src/_forms.scss`** (`.app-form`,
  `.app-form > mat-form-field` full width, `.app-form-row` responsive flex row) —
  `@use`d in styles.scss; new `app-*` class names so they don't collide with
  still-loaded Bootstrap. This is the "common bootstrap-resembling styles" the
  user asked for; reuse it for the products/payment-groups edit forms.
  Validation: custom `ErrorStateMatcher` (`invalid && editStateSignal().submitted`)
  preserves the old "errors only after Save" behaviour; `mat-error` per field;
  `subscriptSizing="dynamic"` so error space doesn't reserve permanently. mat-option
  values use `item[0] ?? ''` so the blank option stays `''` (matches form init and
  the getPersistData empty-filter). Dropped `NgClass`. payDelay values are now
  numbers (0/1) not strings — watch backend if issues. Build ✓, tests ✓ (84/2).
  **`payment-objects-table` now fully off Bootstrap & FA except the delete-confirm
  modal (BsModalService, Phase 3).**
- 2026-06-23 — **`payment-objects-table` TABLE migrated to `mat-table` + DnD**
  (+ shared `drag-grip`). Bootstrap `<table class="table">` → flex `<mat-table>`
  with matColumnDef (id/name/actions), following the violetnote reference
  pattern. CDK drag-drop preserved exactly: `cdkDropList`+`cdkDropListLockAxis` on
  mat-table, `cdkDrag`+`[cdkDragData]`+`(cdkDragStarted)` on `mat-row`,
  `cdkDragHandle` on the grip; base `onDrop(previousIndex/currentIndex)` unchanged.
  Chose flex mat-table (not `<table mat-table>`) because native-table rows
  collapse cell widths while dragging. `drag-grip`: FA `grip-vertical` →
  `<mat-icon>drag_indicator</mat-icon>` (shared, also used by products/
  payment-groups). Dropped the custom `*cdkDragPreview` box → default row-clone
  preview (like the reference). Column widths via `.mat-column-*` flex in scss.
  `displayedColumns` added. Specs: drag-grip dropped `FontAwesomeIconsModule`.
  Build ✓, tests ✓ (84/2). ⚠ NOT YET DONE in this component: the EDIT FORM is
  still Bootstrap (`form-control`/`form-select`/`is-invalid`/`invalid-feedback`/
  grid + custom `submitted`-based validation display) — sizable separate piece,
  awaiting go-ahead. Modal (delete confirm via BsModalService) still Phase 3.
- 2026-06-23 — **`core/components/drop-down-more-menu` migrated** (Phase 2 + FA).
  Native Bootstrap-JS dropdown (`data-bs-toggle="dropdown"`, `.dropstart`,
  `.dropdown-menu`, `btn-outline-primary`, `<fa-icon ellipsis-h>`) → `MatMenu`:
  `<button matIconButton [matMenuTriggerFor]><mat-icon>more_horiz</mat-icon>` +
  `<mat-menu xPosition="before"><ng-content></ng-content></mat-menu>`. Updated the
  3 consumers (payment-objects/groups/products tables) projected item from
  `<a class="dropdown-item" href="#">` → `<button mat-menu-item>` (preventDefault
  in handler is harmless on a button). Spec: dropped `FontAwesomeIconsModule`.
  Build ✓, tests ✓ (84/2). NOTE: content double-projection (consumer → this
  component's ng-content → mat-menu) works; MatMenu's ContentChildren finds the
  projected mat-menu-items. ⚠ `bootstrap.bundle.min.js` STILL required — found
  another native-JS user: `backup-database-button` (Bootstrap toast,
  `data-bs-dismiss`/`data-bs-delay`). Remove the script only after that toast →
  MatSnackBar. (So angular.json bootstrap JS removal moves from Phase 2 to
  after backup-database-button.)
- 2026-06-22 — **`components/settings` migrated off Bootstrap.** `nav nav-pills
  flex-column` → docs-site-style nav: `mat-action-list` + `<button mat-list-item>`
  (user wanted BUTTONS, not `<a>`). Bootstrap grid `row`/`col-md-*`/
  `container-fluid` → flexbox (`.settings-layout`/`.settings-nav`/
  `.settings-content`, wraps on small screens). Vertical split line via
  `border-right: 1px solid var(--mat-sys-outline-variant)` on the nav. Selected
  item highlighted with list tokens (`--mat-list-list-item-container-color:
  secondary-container` + label-text-color), NO `!important`. Dropped `NgClass`;
  added `MatListModule`. No FA here. Spec keeps `AlertModule`/`ModalModule`/
  `FontAwesomeIconsModule` (still needed by child message/tables). Build ✓, tests
  ✓ (84/2). NOTE: `[activated]` highlight is scoped to `mat-nav-list` only — for
  `mat-action-list` buttons, style the selected state yourself (via list tokens).
- 2026-06-22 — **`core/components/edit-delete-panel` migrated & FA-free**
  (Phase 5/5b). `<a class="btn btn-sm"><fa-icon trash/edit>` → two
  `<button matIconButton><mat-icon>delete/edit</mat-icon></button>` (matches
  violetnote-ang's edit/delete pattern). To honour the user's "same height / no
  row explosion" requirement, kept them compact via the Material size token
  (NOT hand CSS): `@include mat.icon-button-overrides((state-layer-size: 32px))`
  scoped to `:host` (stock is 40px → would grow rows; 32px ≈ old btn-sm). Used by
  4 tables; standalone, no spec. Build ✓, tests ✓ (84/2). PATTERN: shrink Material
  components with their density/size tokens (`*-overrides`).
  GOTCHA: the icon-button `icon-size` token resizes the icon BOX but not the
  glyph — `mat-icon` draws the glyph via `font-size`. To actually shrink the
  glyph, user OK'd a small targeted rule: `:host mat-icon { font-size/width/
  height/line-height: 20px }`. So: button size via token, glyph size via a
  font-size rule on mat-icon.
- 2026-06-22 — **`core/components/add-panel` migrated & FA-free** (Phase 5
  button, done early). FINAL: `<a class="btn btn-outline-primary"><fa-icon plus>`
  → `<button matMiniFab><mat-icon>add</mat-icon>`, **empty scss, no custom
  styling**. Dropped dead `text-left` class. Used by 4 tables; standalone, no
  spec. Build ✓, tests ✓ (84/2). First Bootstrap `.btn` removal.
  ROOT CAUSE of the icon being off-centre: `matButton`/`matButton="outlined"` is
  a TEXT button — it reserves a horizontal margin beside `mat-icon` for a label,
  so an icon-only text button is never horizontally centred. FABs / icon buttons
  don't. Matched the reference project `violetnote-ang`, whose add button is
  exactly `<button matMiniFab><mat-icon>add</mat-icon></button>` (no Bootstrap,
  no custom CSS, perfectly centred). LESSON: for an icon-only button use
  `matMiniFab` or `matIconButton`, never `matButton`; and don't add per-component
  CSS — copy the stock pattern from violetnote-ang. (Earlier detours — outlined
  text button, then matIconButton + border + flex-centering — were reverted.)
- 2026-06-22 — **Grayscale theme set.** The app's Bootstrap `$primary` is
  `dimgray (#696969)` (see `src/_variables.scss`), so the default azure/blue
  Material palette looked wrong. Generated grayscale M3 palettes via
  `ng generate @angular/material:theme-color` (seeds: primary #696969, secondary
  #808080, tertiary #909090, neutral/neutral-variant #7a7a7a; error kept red for
  a11y) → `src/_theme-colors.scss`. Wired into `styles.scss` via
  `@use './theme-colors'`. Compiled `--mat-sys-primary: #5e5e5e` (gray) ✓. The
  spinner now renders gray. Build ✓, tests ✓ (84/2; one flaky fail on first run,
  green on clean re-run). NOTE: the generator's `--directory` arg is buggy here —
  it created `src_theme-colors.scss` at root; moved it to `src/_theme-colors.scss`.
- 2026-06-22 — **Phase 1 (warm-up) `loading-spinner-element` migrated.** FA
  `fa-icon` spinner → Angular Material `mat-spinner`. First real `mat-*`
  component rendered — proves the Material pipeline end to end. Build ✓, tests ✓
  (84/2). FA→Material change (does not shrink the Bootstrap surface yet).
  `faSpinner` FA icon now unused (optional cleanup). **Next: tooltip → MatTooltip
  in payments-table — the first ngx-bootstrap module removal.**
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
