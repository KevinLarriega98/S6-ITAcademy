import BudgetListItem from "./budget-list/BudgetListItem"
import BudgetSearchField from "./budget-list/BudgetSearchField"
import BudgetSortButton from "./budget-list/BudgetSortButton"
import { SORT_OPTIONS, useBudgetList } from "../../hooks/useBudgetList"
import type { SavedBudget } from "../../types/budgetTypes"
import "./BudgetListSection.css"

type BudgetListSectionProps = {
  budgets: SavedBudget[]
  currencySymbol: string
}

const BudgetListSection = ({ budgets, currencySymbol }: BudgetListSectionProps) => {
  const { searchTerm, setSearchTerm, sortConfig, handleSortClick, results } = useBudgetList(budgets)

  const hasBudgets = results.all.length > 0
  const hasResults = results.filtered.length > 0

  return (
    <section className="budget-list">
      <header className="budget-list__header">
        <h2 className="budget-list__title">Presupuestos en curso</h2>
        {hasBudgets && (
          <div className="budget-list__controls">
            <BudgetSearchField value={searchTerm} onChange={setSearchTerm} />
            <div className="budget-list__sort">
              {SORT_OPTIONS.map(({ key, label }) => (
                <BudgetSortButton
                  key={key}
                  label={label}
                  isActive={sortConfig.key === key}
                  order={sortConfig.order}
                  onClick={() => handleSortClick(key)}
                />
              ))}
            </div>
          </div>
        )}
      </header>

      {!hasBudgets ? (
        <p className="budget-list__empty">Todavía no hay presupuestos guardados.</p>
      ) : !hasResults ? (
        <p className="budget-list__empty">No hay presupuestos que coincidan con la búsqueda.</p>
      ) : (
        <ul className="budget-list__items">
          {results.sorted.map((budget) => (
            <BudgetListItem key={budget.id} budget={budget} currencySymbol={currencySymbol} />
          ))}
        </ul>
      )}
    </section>
  )
}

export default BudgetListSection
