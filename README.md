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
│   ├── components/
│   │   ├── ServiceSelectionSection.tsx (+ .css + .test.tsx)
│   │   ├── ServiceBillingToggle.test.tsx
│   │   ├── BudgetRequestSection.tsx (+ .css)
│   │   ├── BudgetListSection.tsx (+ .css) and budget-list/* atoms
│   │   ├── web-configurator/  # WebConfigurator component, styles, tests, counter control
│   │   └── HelpModal.tsx (+ .css)
│   ├── pages/
│   │   ├── BudgetPage.tsx (+ .css + .test.tsx)
│   │   └── WelcomePage.tsx
│   ├── data/                  # Service catalog and base prices
│   ├── forms/                 # Form field configs and validation rules
│   ├── hooks/                 # Calculator logic, query param syncing, list utilities
│   └── utils/                 # Pure helpers (pricing, formatting, ids)
├── package.json               # Scripts and dependency manifest
├── tsconfig*.json             # TypeScript project references
└── vite.config.ts             # Vite + React SWC configuration
```

---

## 🛠️ Tech Stack
- React 19 + TypeScript 5
- Vite 7 with the SWC React plugin
- React Router 7 for navigation and memory routing in tests
- Plain CSS modules scoped per component
- Vitest 4 + React Testing Library 16 + jsdom for component testing
- ESLint 9 with TypeScript and React-focused rules

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