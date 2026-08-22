# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A Playwright UI-automation practice app (from the original `bondar-artem/pw-practice-app`). It has two halves:

1. **The test target** — a lightweight fork of the [akveo ngx-admin](https://github.com/akveo/ngx-admin) Angular dashboard in `src/`, served at `http://localhost:4200`. The app is intentionally kept small (forms, modal overlays, tables, charts) so tests have UI to exercise.
2. **The Playwright tests** — `tests/*.spec.ts` (raw-locator and concept practice) plus a page-object layer in `page-objects/`.

Both halves are equally part of this repo — expect to change the Angular app and the tests together (e.g. when a test fails because of a selector in an `nb-*` Nebular component).

## Commands

```bash
npm start                      # serve the Angular app on :4200 (npx ng serve)
npx playwright test            # run all tests; config's webServer auto-starts the app if not already running
npx playwright test tests/uiComponents.spec.ts        # single file
npx playwright test -g "input fields"                 # single test by name
npm run uicomponents-chrome    # uiComponents.spec.ts on chromium only — the only test CI runs
npx playwright show-report     # open the HTML report (playwright-report/)
docker compose up              # run uicomponents-chrome in the official Playwright container (v1.55.0)
```

There are **no lint or unit-test npm scripts**. `tslint.json` (codelyzer), `.stylelintrc.json`, and eslint/stylelint deps exist but nothing invokes them; `ng test`/karma and protractor references in `angular.json` are dead — the config files they point to were removed. Don't try to run them.

## Playwright setup (read `playwright.config.ts` + `test-options.ts` first)

- Config is typed `defineConfig<TestOptions>`; the custom options/fixtures live in **`test-options.ts`**, not the config. Tests needing them import `test` from `'../test-options'`; others import directly from `@playwright/test`.
- Custom fixtures in `test-options.ts`: `globalQAUrl` (option, used for the external globalsqa.com drag-and-drop iframe), `formLayoutsPage` (navigates to Form Layouts via the sidebar), `pageManager`.
- `import 'dotenv/config'` in the config loads `.env`, which defines `URL = http://uitestingplayground.com/ajax`. `tests/autoWaiting.spec.ts` reads `process.env.URL` and **throws in `beforeEach` if it is unset** — the env var must stay in `.env` or be exported.
- Timeouts: test `20s`, expect `2s`, retries `0`, reporter `html`, trace on first retry.
- Projects: `chromium` and `firefox`. Note: `tests/testMobile.spec.ts` branches on `testInfo.project.name == 'mobile'`, but **no `mobile` project is defined** — those branches are currently dead code (a commented-out multi-project qat1/qat2 section shows the intended pattern).
- `webServer` uses `reuseExistingServer: true`, so a manually started app is reused.

## Page-object model (`page-objects/`)

`PageManager` is the facade tests use; `HelperBase` (holds `page`) → `NavigationPage`, plus standalone `FormLayoutsPage` / `DatePickerPage`. Accessors: `pm.navigateTo()`, `pm.onFormLayoutPage()`, `pm.onDatePickerPage()`. When adding a page, add the class here and an accessor on `PageManager` — tests never instantiate page objects directly.

## The Angular app (`src/app/`)

Angular 20 + Nebular theme. `PagesComponent` renders the sidebar; child routes are lazy modules: `forms/` (datepicker, form-layouts), `modal-overlays/` (toastr, tooltip, window, dialog, popovers), `tables/` (smart-table, tree-grid), `charts/`, `extra-components/`, and `iot-dashboard` (the default route). Routes exist under e.g. `/forms/form-layouts`, but **tests navigate by clicking sidebar text** (`Forms` → `Form Layouts`) because Nebular menu behavior is what's under test; keep navigation consistent with that pattern.

## Gotchas when editing tests

- Nebular renders custom elements (`nb-card`, `nb-select`, `nb-tooltip`, ...). Scope with `page.locator('nb-card', { hasText: ... })` then role-based locators — this is the established idiom.
- Avoid dynamic Angular classes (`ng-star-inserted`); prefer stable selectors. `waitForTimeout` is deprecated — rely on auto-waiting/expect polling.
- Some tests hit **external** sites (uitestingplayground.com, globalsqa.com) and depend on the internet + those sites' stable markup; failures there are environment-dependent, not app bugs.
- Radio buttons/checkboxes in Nebular need `check({ force: true })` (native input is hidden).
- Commit convention seen in history: `update: <description>`.
