import BudgetListItem from "./budget-list/BudgetListItem"
import BudgetSearchField from "./budget-list/BudgetSearchField"
import BudgetSortButton, { type BudgetSortButtonProps } from "./budget-list/BudgetSortButton"
import { SORT_OPTIONS, useBudgetList } from "../hooks/useBudgetList"
import type { SortKey } from "../hooks/useBudgetList"
import type { SavedBudget } from "../lib/types/budgetTypes"
import "./BudgetListSection.css"

type BudgetListSectionProps = {
  budgets: SavedBudget[]
  currencySymbol: string
}

const BudgetListSection = ({ budgets, currencySymbol }: BudgetListSectionProps) => {
  const listState = useBudgetList(budgets)
  const { searchTerm, setSearchTerm, sortConfig, handleSortClick, results } = listState

  const hasBudgets = results.all.length > 0
  const hasResults = results.filtered.length > 0

  const sortButtons: Array<Omit<BudgetSortButtonProps, "onClick"> & { key: SortKey }> = SORT_OPTIONS.map(
    ({ key, label }) => ({
      key,
      label,
      isActive: sortConfig.key === key,
      order: sortConfig.order,
    })
  )

  const displayBudgets = results.sorted.map((budget) => ({ ...budget, currencySymbol }))

  return (
    <section className="budget-list">
      <header className="budget-list__header">
        <h2 className="budget-list__title">Presupuestos en curso</h2>
        {hasBudgets && (
          <div className="budget-list__controls">
            <BudgetSearchField value={searchTerm} onChange={setSearchTerm} />
            <div className="budget-list__sort">
              {sortButtons.map(({ key, ...buttonProps }) => (
                <BudgetSortButton
                  key={key}
                  {...buttonProps}
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
          {displayBudgets.map((budget) => (
            <BudgetListItem key={budget.id} budget={budget} />
          ))}
        </ul>
      )}
    </section>
  )
}

export default BudgetListSection