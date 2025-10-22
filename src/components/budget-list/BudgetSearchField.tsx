type BudgetSearchFieldProps = {
  value: string
  onChange: (value: string) => void
}

const BudgetSearchField = ({ value, onChange }: BudgetSearchFieldProps) => (
  <label className="budget-list__search">
    <span className="budget-list__search-label">Buscar presupuestos por nombre</span>
    <input
      type="search"
      name="budget-search"
      className="budget-list__search-input"
      placeholder="Buscar por nombre"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
    <svg className="budget-list__search-icon" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M10.5 10.5L14 14M11.75 7.375a4.375 4.375 0 11-8.75 0 4.375 4.375 0 018.75 0z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </label>
)

export default BudgetSearchField
