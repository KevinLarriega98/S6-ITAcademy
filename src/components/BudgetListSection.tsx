import BudgetListItem from "./budget-list/BudgetListItem"
import BudgetSearchField from "./budget-list/BudgetSearchField"
import BudgetSortButton from "./budget-list/BudgetSortButton"
import { SORT_OPTIONS, useBudgetList } from "../hooks/useBudgetList"
import type { SavedBudget } from "../lib/types/budgetTypes"
import "./BudgetListSection.css"

type BudgetListSectionProps = {
  budgets: SavedBudget[]
  currencySymbol: string
}

const BudgetListSection = ({ budgets, currencySymbol }: BudgetListSectionProps) => {
  const { sortConfig, searchTerm, setSearchTerm, handleSortClick, sortedBudgets, searchFilteredBudgets } =
    useBudgetList(budgets)

  const hasBudgets = budgets.length > 0
  const hasResults = searchFilteredBudgets.length > 0

  return (
    <section className="budget-list">
      <header className="budget-list__header">
        <h2 className="budget-list__title">Presupuestos en curso</h2>
        {hasBudgets && (
          <div className="budget-list__controls">
            <BudgetSearchField value={searchTerm} onChange={(value) => setSearchTerm(value)} />
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
          {sortedBudgets.map((budget) => (
            <BudgetListItem key={budget.id} budget={budget} currencySymbol={currencySymbol} />
          ))}
        </ul>
      )}
    </section>
  )
}

export default BudgetListSection
