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
    <img src="/icons/search.svg" alt="" aria-hidden="true" className="budget-list__search-icon" />
  </label>
)

export default BudgetSearchField