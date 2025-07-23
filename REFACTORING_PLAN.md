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
- [ ] **Step 1.9:** **Verification:** Run `npm run build` to ensure scaffolding caused no issues.

---

## Phase 2: Move Frontend Components

We will move all files from `src/components` to `src/frontend/components`. For each file, we will move it, update its imports, and verify.

**File: `AllyCodeForm.tsx`**
- [ ] **Step 2.1.1:** Move `AllyCodeForm.tsx` to `src/frontend/components`.
- [ ] **Step 2.1.2:** Update import in `apps/mod-ledger/src/components/ModsPageClient.tsx`.
- [ ] **Step 2.1.3:** **Verification:** Run `npm run build`.

**File: `AllyCodeForm.module.css`**
- [ ] **Step 2.2.1:** Move `AllyCodeForm.module.css` to `src/frontend/components`.
- [ ] **Step 2.2.2:** Update import in `apps/mod-ledger/src/frontend/components/AllyCodeForm.tsx`.
- [ ] **Step 2.2.3:** **Verification:** Run `npm run build`.

**File: `CollectionEfficiencyDisplay.tsx`**
- [ ] **Step 2.3.1:** Move `CollectionEfficiencyDisplay.tsx` to `src/frontend/components`.
- [ ] **Step 2.3.2:** Update import in `apps/mod-ledger/src/components/PlayerHeader.tsx`.
- [ ] **Step 2.3.3:** **Verification:** Run `npm run build`.

**File: `CollectionEfficiencyDisplay.module.css`**
- [ ] **Step 2.4.1:** Move `CollectionEfficiencyDisplay.module.css` to `src/frontend/components`.
- [ ] **Step 2.4.2:** Update import in `apps/mod-ledger/src/frontend/components/CollectionEfficiencyDisplay.tsx`.
- [ ] **Step 2.4.3:** **Verification:** Run `npm run build`.

**File: `FilterPanel.tsx`**
- [ ] **Step 2.5.1:** Move `FilterPanel.tsx` to `src/frontend/components`.
- [ ] **Step 2.5.2:** Update import in `apps/mod-ledger/src/components/ModsPageClient.tsx`.
- [ ] **Step 2.5.3:** **Verification:** Run `npm run build`.

**File: `FilterPanel.module.css`**
- [ ] **Step 2.6.1:** Move `FilterPanel.module.css` to `src/frontend/components`.
- [ ] **Step 2.6.2:** Update import in `apps/mod-ledger/src/frontend/components/FilterPanel.tsx`.
- [ ] **Step 2.6.3:** **Verification:** Run `npm run build`.

**File: `ModCard.tsx`**
- [ ] **Step 2.7.1:** Move `ModCard.tsx` to `src/frontend/components`.
- [ ] **Step 2.7.2:** Update import in `apps/mod-ledger/src/components/ModGrid.tsx`.
- [ ] **Step 2.7.3:** **Verification:** Run `npm run build`.

**File: `ModCard.module.css`**
- [ ] **Step 2.8.1:** Move `ModCard.module.css` to `src/frontend/components`.
- [ ] **Step 2.8.2:** Update import in `apps/mod-ledger/src/frontend/components/ModCard.tsx`.
- [ ] **Step 2.8.3:** **Verification:** Run `npm run build`.

**File: `ModDetailModal.tsx`**
- [ ] **Step 2.9.1:** Move `ModDetailModal.tsx` to `src/frontend/components`.
- [ ] **Step 2.9.2:** Update import in `apps/mod-ledger/src/components/ModsPageClient.tsx`.
- [ ] **Step 2.9.3:** **Verification:** Run `npm run build`.

**File: `ModDetailModal.module.css`**
- [ ] **Step 2.10.1:** Move `ModDetailModal.module.css` to `src/frontend/components`.
- [ ] **Step 2.10.2:** Update import in `apps/mod-ledger/src/frontend/components/ModDetailModal.tsx`.
- [ ] **Step 2.10.3:** **Verification:** Run `npm run build`.

**File: `ModGrid.tsx`**
- [ ] **Step 2.11.1:** Move `ModGrid.tsx` to `src/frontend/components`.
- [ ] **Step 2.11.2:** Update import in `apps/mod-ledger/src/components/ModsPageClient.tsx`.
- [ ] **Step 2.11.3:** **Verification:** Run `npm run build`.

**File: `ModGrid.module.css`**
- [ ] **Step 2.12.1:** Move `ModGrid.module.css` to `src/frontend/components`.
- [ ] **Step 2.12.2:** Update import in `apps/mod-ledger/src/frontend/components/ModGrid.tsx`.
- [ ] **Step 2.12.3:** **Verification:** Run `npm run build`.

**File: `ModsPageClient.tsx`**
- [ ] **Step 2.13.1:** Move `ModsPageClient.tsx` to `src/frontend/components`.
- [ ] **Step 2.13.2:** Update import in `apps/mod-ledger/src/app/mods/page.tsx`.
- [ ] **Step 2.13.3:** **Verification:** Run `npm run build`.

**File: `ModVisual.tsx`**
- [ ] **Step 2.14.1:** Move `ModVisual.tsx` to `src/frontend/components`.
- [ ] **Step 2.14.2:** Update import in `apps/mod-ledger/src/frontend/components/ModCard.tsx`.
- [ ] **Step 2.14.3:** **Verification:** Run `npm run build`.

**File: `ModVisual.module.css`**
- [ ] **Step 2.15.1:** Move `ModVisual.module.css` to `src/frontend/components`.
- [ ] **Step 2.15.2:** Update import in `apps/mod-ledger/src/frontend/components/ModVisual.tsx`.
- [ ] **Step 2.15.3:** **Verification:** Run `npm run build`.

**File: `PlayerHeader.tsx`**
- [ ] **Step 2.16.1:** Move `PlayerHeader.tsx` to `src/frontend/components`.
- [ ] **Step 2.16.2:** Update import in `apps/mod-ledger/src/frontend/components/ModsPageClient.tsx`.
- [ ] **Step 2.16.3:** **Verification:** Run `npm run build`.

**File: `PlayerHeader.module.css`**
- [ ] **Step 2.17.1:** Move `PlayerHeader.module.css` to `src/frontend/components`.
- [ ] **Step 2.17.2:** Update import in `apps/mod-ledger/src/frontend/components/PlayerHeader.tsx`.
- [ ] **Step 2.17.3:** **Verification:** Run `npm run build`.

**File: `TopBar.tsx`**
- [ ] **Step 2.18.1:** Move `TopBar.tsx` to `src/frontend/components`.
- [ ] **Step 2.18.2:** Update import in `apps/mod-ledger/src/app/layout.tsx`.
- [ ] **Step 2.18.3:** **Verification:** Run `npm run build`.

**File: `TopBar.module.css`**
- [ ] **Step 2.19.1:** Move `TopBar.module.css` to `src/frontend/components`.
- [ ] **Step 2.19.2:** Update import in `apps/mod-ledger/src/frontend/components/TopBar.tsx`.
- [ ] **Step 2.19.3:** **Verification:** Run `npm run build`.

- [ ] **Step 2.20:** **Final Verification:** Run `npm run build` and `rm -rf apps/mod-ledger/src/components`.

---

## Phase 3: Move Frontend Contexts

- [ ] **Step 3.1:** Move `DbLookupsContext.tsx` to `src/frontend/contexts`.
- [ ] **Step 3.2:** Move `WorkflowContext.tsx` to `src/frontend/contexts`.
- [ ] **Step 3.3:** Update all import paths for these files.
- [ ] **Step 3.4:** **Verification:** Run `npm run build` and `rm -rf apps/mod-ledger/src/contexts`.

---

## Phase 4: Move Config Files

- [ ] **Step 4.1:** Move `evaluationWorkflows.ts` to `src/frontend/config`.
- [ ] **Step 4.2:** Move `ruleDescriptions.ts` to `src/frontend/config`.
- [ ] **Step 4.3:** Update all import paths for these files.
- [ ] **Step 4.4:** **Verification:** Run `npm run build` and `rm -rf apps/mod-ledger/src/config`.

---

## Phase 5: Move and Classify `lib` and `services`

This is the most complex phase. We will analyze each file to determine if it's backend, frontend, or shared, and move it accordingly.

*(This section will be expanded after the previous phases are complete, as the import paths will have changed, making analysis easier.)*
