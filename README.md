# 💼 Sprint 6 – Budget Calculator SPA

Single-page React app built for Sprint 6 of the IT Academy Bootcamp. It lets prospective clients select digital services, configure a custom website package, and request a budget while tracking every quote they create. The UI runs on React + TypeScript + Vite and is fully covered by component tests powered by Vitest and Testing Library.

---

## ✨ Highlights
- Budget calculator that keeps totals, discounts, and itemised services in sync across the entire flow.
- Web configurator with counter controls for pages and languages, updating prices in real time.
- Request form with field-level validation and submission guardrails tied to service selection.
- Budget history with search and sort tools so users can review quotes they have already generated.
- Deep linking: selections, billing mode, and configurator values stay reflected in the URL query string.

---

## 🧭 Core Features
- **Service selection & billing toggle**: Choose SEO, Ads, and Web services; switch between monthly and annual billing to apply the discount instantly.
- **Website configurator**: Increment/decrement controls adjust extra costs per page/language and surface contextual help.
- **Request form**: Validates name, phone, and email before allowing submissions; only activates once a service is ticked.
- **Saved budgets list**: Newly created quotes appear at the top, can be filtered by client name, and sorted by total or date.
- **State synchronisation**: Custom hooks persist calculator state in the URL, enabling shareable budget links.

---

## 🧱 Project Structure

```plaintext
Sprint 6/
├── src/
│   ├── App.tsx                # Root layout with router outlet
│   ├── main.tsx               # Vite bootstrap entry
│   ├── index.css              # Global design tokens and reset
│   ├── features/
│   │   ├── budget/
│   │   │   ├── components/
│   │   │   │   ├── BudgetListSection/ (+ budget-list/* atoms)
│   │   │   │   ├── BudgetRequestSection/
│   │   │   │   ├── ServiceSelectionSection/ (+ service-selection/*)
│   │   │   │   └── WebConfigurator/ (+ counter/*)
│   │   │   ├── constants/     # Pricing constants and currency symbols
│   │   │   ├── data/          # Service catalog and base prices
│   │   │   ├── forms/         # Form field configs and validation helpers
│   │   │   ├── hooks/         # Calculator logic, URL syncing, list utilities
│   │   │   ├── pages/         # Budget page entry point (+ tests)
│   │   │   ├── types/         # Shared TypeScript types for budgets
│   │   │   └── utils/         # Calculations, formatting bridges, id helpers
│   │   └── welcome/
│   │       └── pages/         # Landing page for the configurator
│   └── shared/
│       ├── components/        # Cross-feature UI primitives (HelpModal, etc.)
│       └── utils/             # Common helpers (formatting, validation)
├── package.json               # Scripts and dependency manifest
├── tsconfig*.json             # TypeScript project references
└── vite.config.ts             # Vite + React SWC configuration
```

---

## 🛠️ Tech Stack
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" height="18" style="vertical-align: text-bottom;" />&nbsp;<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" height="18" style="vertical-align: text-bottom;" /> React 19 + TypeScript 5
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" alt="Vite" height="18" style="vertical-align: text-bottom;" /> Vite 7 with the SWC React plugin
- <img src="https://cdn.simpleicons.org/reactrouter/CA4245/ffffff" alt="React Router" height="18" style="vertical-align: text-bottom;" /> React Router 7 for navigation and memory routing in tests
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS" height="18" style="vertical-align: text-bottom;" /> Plain CSS modules scoped per component
- <img src="https://cdn.simpleicons.org/vitest/729B1B/ffffff" alt="Vitest" height="18" style="vertical-align: text-bottom;" />&nbsp;<img src="https://testing-library.com/img/octopus-64x64.png" alt="Testing Library" height="18" style="vertical-align: text-bottom;" /> Vitest 4 + React Testing Library 16 + jsdom for component testing
- <img src="https://cdn.simpleicons.org/eslint/4B32C3/ffffff" alt="ESLint" height="18" style="vertical-align: text-bottom;" /> ESLint 9 with TypeScript and React-focused rules

---

## 🧪 Test Coverage
- `ServiceSelectionSection`: ensures selecting and deselecting services updates totals and toggles the web configurator.
- `ServiceBillingToggle`: verifies the annual billing discount applies and reverts across UI labels and internal price maps.
- `WebConfigurator`: checks counter controls, extra price increments, and total calculations for every interaction path.
- `BudgetPage`: end-to-end flow validating that a fully completed form plus at least one selected service unlocks submission.

Run the full suite:

```bash
npm run test
```

---

## ▶️ Getting Started

```bash
git clone https://github.com/KevinLarriega98/S6-ITAcademy.git
cd S6-ITAcademy
npm install
```

- `npm run dev` — start the Vite development server with hot module replacement.
- `npm run build` — type-check and generate the production build.
- `npm run preview` — run the production build locally.
- `npm run lint` — lint the entire project.
- `npm run test` — execute the Vitest suite.

---

## 🚧 Improvements in Backlog
- **Complete CRUD for budgets**: add edit and delete actions so saved quotes can be updated or removed directly from the list (currently only create + read are available).
