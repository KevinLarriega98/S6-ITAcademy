import type { SavedBudget } from "../types/budget"
import "./BudgetListSection.css"

type BudgetListSectionProps = {
  budgets: SavedBudget[]
  currencySymbol: string
}

const BudgetListSection = ({ budgets, currencySymbol }: BudgetListSectionProps) => {
  return (
    <section className="budget-list">
      <h2 className="budget-list__title">Presupuestos en curso</h2>
      {budgets.length === 0 ? (
        <p className="budget-list__empty">Todavía no hay presupuestos guardados.</p>
      ) : (
        <ul className="budget-list__items">
          {budgets.map((budget) => (
            <li key={budget.id} className="budget-list__item">
              <div className="budget-list__identity">
                <strong className="budget-list__name">{budget.clientName}</strong>
                <span>{budget.email}</span>
                <span>{budget.phone}</span>
              </div>
              <div className="budget-list__services">
                <span className="budget-list__services-label">Servicios contratados:</span>
                <ul className="budget-list__services-list">
                  {budget.services.map((serviceLabel, index) => (
                    <li key={`${budget.id}-${index}`}>{serviceLabel}</li>
                  ))}
                </ul>
              </div>
              <div className="budget-list__total">
                <span>Total</span>
                <strong>{`${budget.total} ${currencySymbol}`}</strong>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default BudgetListSection
