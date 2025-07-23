# Refactoring: Backend/Frontend Separation

This document outlines the atomic, step-by-step process for refactoring the `mod-ledger` application. The goal is to create a clear, maintainable separation between backend and frontend code.

## Guiding Principles

- **Atomicity:** Each step must be the smallest possible logical change. No two actions will be combined.
- **Verification:** After every single file move or significant change, we will run `npm run build` from the root directory to verify the application's integrity.
- **Clarity:** The final structure must be unambiguous.

## Target Directory Structure

**Current:**
```
apps/mod-ledger/src/
├── app/
├── components/
├── config/
├── contexts/
├── features/
├── lib/
└── services/
```

**Target:**
```
apps/mod-ledger/src/
├── app/         # Next.js pages and API routes (thin wrappers)
├── backend/
│   ├── services/
│   └── lib/
└── frontend/
    ├── components/
    ├── contexts/
    ├── lib/
    └── config/
```

---

## Phase 1: Create New Directory Structure

Each command is a separate, verifiable step.

- [x] **Step 1.1:** Create `apps/mod-ledger/src/backend`
- [x] **Step 1.2:** Create `apps/mod-ledger/src/frontend`
- [x] **Step 1.3:** Create `apps/mod-ledger/src/backend/services`
- [x] **Step 1.4:** Create `apps/mod-ledger/src/backend/lib`
- [x] **Step 1.5:** Create `apps/mod-ledger/src/frontend/components`
- [x] **Step 1.6:** Create `apps/mod-ledger/src/frontend/contexts`
- [x] **Step 1.7:** Create `apps/mod-ledger/src/frontend/lib`
- [x] **Step 1.8:** Create `apps/mod-ledger/src/frontend/config`
- [x] **Step 1.9:** **Verification:** Run `npm run build` to ensure scaffolding caused no issues.

---

## Phase 2: Move Frontend Components

We will move all files from `src/components` to `src/frontend/components`. For each component, we will move its `.tsx` and `.module.css` files together, update all necessary import paths, and verify the changes are reflected in the running `dev` server.

**Component: `AllyCodeForm`**
- [x] **Step 2.1.1:** Move `AllyCodeForm.tsx` and `AllyCodeForm.module.css` to `src/frontend/components`.
- [x] **Step 2.1.2:** Update the component import in `apps/mod-ledger/src/components/ModsPageClient.tsx`.
- [x] **Step 2.1.3:** **Verification:** Confirmed changes are reflected correctly in the `dev` server.

**Component: `CollectionEfficiencyDisplay`**
- [x] **Step 2.2.1:** Move `CollectionEfficiencyDisplay.tsx` and `CollectionEfficiencyDisplay.module.css` to `src/frontend/components`.
- [x] **Step 2.2.2:** No import update needed as component is currently unused.
- [x] **Step 2.2.3:** **Verification:** Confirmed changes are reflected correctly in the `dev` server.

**Component: `FilterPanel`**
- [x] **Step 2.3.1:** Move `FilterPanel.tsx` and `FilterPanel.module.css` to `src/frontend/components`.
- [x] **Step 2.3.2:** Update the component import in `apps/mod-ledger/src/components/ModsPageClient.tsx`.
- [x] **Step 2.3.3:** **Verification:** Confirmed changes are reflected correctly in the `dev` server.

**Component: `ModCard`**
- [x] **Step 2.4.1:** Move `ModCard.tsx` and `ModCard.module.css` to `src/frontend/components`.
- [x] **Step 2.4.2:** Update the component import in `apps/mod-ledger/src/components/ModGrid.tsx`.
- [x] **Step 2.4.3:** **Verification:** Confirmed changes are reflected correctly in the `dev` server.

**Component: `ModDetailModal`**
- [x] **Step 2.5.1:** Move `ModDetailModal.tsx` and `ModDetailModal.module.css` to `src/frontend/components`.
- [x] **Step 2.5.2:** Update the component import in `apps/mod-ledger/src/components/ModsPageClient.tsx`.
- [x] **Step 2.5.3:** **Verification:** Confirmed changes are reflected correctly in the `dev` server.

**Component: `ModGrid`**
- [x] **Step 2.6.1:** Move `ModGrid.tsx` and `ModGrid.module.css` to `src/frontend/components`.
- [x] **Step 2.6.2:** Update the component import in `apps/mod-ledger/src/components/ModsPageClient.tsx`.
- [x] **Step 2.6.3:** **Verification:** Confirmed changes are reflected correctly in the `dev` server.

**Component: `ModsPageClient`**
- [x] **Step 2.7.1:** Move `ModsPageClient.tsx` to `src/frontend/components`.
- [x] **Step 2.7.2:** Update the component import in `apps/mod-ledger/src/app/mods/page.tsx`.
- [x] **Step 2.7.3:** **Verification:** Confirmed changes are reflected correctly in the `dev` server.

**Component: `ModVisual`**
- [x] **Step 2.8.1:** Move `ModVisual.tsx` and `ModVisual.module.css` to `src/frontend/components`.
- [x] **Step 2.8.2:** Update the component import in `apps/mod-ledger/src/frontend/components/ModCard.tsx`.
- [x] **Step 2.8.3:** **Verification:** Confirmed changes are reflected correctly in the `dev` server.

**Component: `PlayerHeader`**
- [x] **Step 2.9.1:** Move `PlayerHeader.tsx` and `PlayerHeader.module.css` to `src/frontend/components`.
- [x] **Step 2.9.2:** Update the component import in `apps/mod-ledger/src/frontend/components/ModsPageClient.tsx`.
- [x] **Step 2.9.3:** **Verification:** Confirmed changes are reflected correctly in the `dev` server.

**Component: `TopBar`**
- [x] **Step 2.10.1:** Move `TopBar.tsx` and `TopBar.module.css` to `src/frontend/components`.
- [x] **Step 2.10.2:** No import update needed as component is currently unused.
- [x] **Step 2.10.3:** **Verification:** Confirmed changes are reflected correctly in the `dev` server.

- [x] **Step 2.11:** **Final Verification:** Run `npm run build` to ensure all changes are production-ready, then `rm -rf apps/mod-ledger/src/components`.

---

## Phase 3: Move Frontend Contexts

- [x] **Step 3.1:** Move `DbLookupsContext.tsx` to `src/frontend/contexts`.
- [x] **Step 3.2:** Move `WorkflowContext.tsx` to `src/frontend/contexts`.
- [x] **Step 3.3:** Update all import paths for these files.
- [x] **Step 3.4:** **Verification:** Run `npm run build` and `rm -rf apps/mod-ledger/src/contexts`.

---

## Phase 4: Move Config Files

- [x] **Step 4.1:** Move `evaluationWorkflows.ts` to `src/frontend/config`.
- [x] **Step 4.2:** Move `ruleDescriptions.ts` to `src/frontend/config`.
- [x] **Step 4.3:** Update all import paths for these files.
- [x] **Step 4.4:** **Verification:** Run `npm run build` and `rm -rf apps/mod-ledger/src/config`.

---

## Phase 5: Create Shared Backend Packages

We will extract `logger` and `discordService` into their own shared packages to be used across the monorepo.

**Sub-Phase 5.A: Create `logger` Package**
- [x] **Step 5.A.1:** Create the directory `packages/logger`.
- [x] **Step 5.A.2:** Create `packages/logger/package.json`.
- [x] **Step 5.A.3:** Create `packages/logger/index.ts`.
- [x] **Step 5.A.4:** Move the code from `apps/mod-ledger/src/services/logger.ts` into `packages/logger/index.ts`.
- [x] **Step 5.A.5:** Add `@astrogators-table/logger` to the dependencies in `apps/mod-ledger/package.json`.
- [x] **Step 5.A.6:** Run `npm install` from the root directory to link the new package.
- [x] **Step 5.A.7:** Delete the original file `apps/mod-ledger/src/services/logger.ts`.
- [x] **Step 5.A.8:** **Verification:** Confirm your `dev` server runs without errors.

**Sub-Phase 5.B: Create `discord` Package**
- [x] **Step 5.B.1:** Create the directory `packages/discord`.
- [x] **Step 5.B.2:** Create `packages/discord/package.json`.
- [x] **Step 5.B.3:** Create `packages/discord/index.ts`.
- [x] **Step 5.B.4:** Move the code from `apps/mod-ledger/src/services/discordService.ts` into `packages/discord/index.ts`.
- [x] **Step 5.B.5:** Update the import path for the logger in `packages/discord/index.ts` to use `@astrogators-table/logger`.
- [x] **Step 5.B.6:** Add `@astrogators-table/discord` to the dependencies in `apps/mod-ledger/package.json`.
- [x] **Step 5.B.7:** Run `npm install` from the root directory to link the new package.
- [x] **Step 5.B.8:** Delete the original file `apps/mod-ledger/src/services/discordService.ts`.
- [x] **Step 5.B.9:** **Verification:** Confirm your `dev` server runs without errors.

---

## Phase 6: Move and Classify `services`

We will move the remaining files from `apps/mod-ledger/src/services` into their correct `frontend` or `backend` locations.

**Sub-Phase 6.A: Move Backend Services**
- [x] **Step 6.A.1:** Move `modHydrationService.ts` to `apps/mod-ledger/src/backend/services`.
- [x] **Step 6.A.2:** Move `swgohComlinkService.ts` to `apps/mod-ledger/src/backend/services`.
- [x] **Step 6.A.3:** Update all import paths for these files.
- [x] **Step 6.A.4:** **Verification:** Run `npm run build`.

**Sub-Phase 6.B: Move Frontend Services**
- [x] **Step 6.B.1:** Create the directory `apps/mod-ledger/src/frontend/services`.
- [x] **Step 6.B.2:** Move `modRuleFunctions.ts` to `apps/mod-ledger/src/frontend/services`.
- [x] **Step 6.B.3:** Move `modWorkflowService.ts` to `apps/mod-ledger/src/frontend/services`.
- [x] **Step 6.B.4:** Update all import paths for these files.
- [x] **Step 6.B.5:** **Verification:** Run `npm run build`.

**Sub-Phase 6.C: Final Cleanup**
- [x] **Step 6.C.1:** Delete the now-empty directory `apps/mod-ledger/src/services`.
- [x] **Step 6.C.2:** **Verification:** Run `npm run build` to ensure the final structure is correct.
