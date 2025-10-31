import type { SavedBudget } from "../../../types/budgetTypes"
import { formatPrice } from "../../../../../shared/utils/format"

type BudgetListItemProps = {
  budget: SavedBudget
  currencySymbol: string
}

const getBillingLabel = (billingCycle: SavedBudget["billingCycle"], discountRate: number) => {
  if (billingCycle === "annual") {
    return `Pago anual - Ahorra ${Math.round(discountRate * 100)}%`
  }

  return "Pago mensual"
}

const BudgetListItem = ({ budget, currencySymbol }: BudgetListItemProps) => {
  const billingLabel = getBillingLabel(budget.billingCycle, budget.discountRate)

  return (
    <li className="budget-list__item">
      <div className="budget-list__identity">
        <strong className="budget-list__name">{budget.clientName}</strong>
        <span className={`budget-list__billing budget-list__billing--${budget.billingCycle}`}>{billingLabel}</span>
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
        <strong>{`${formatPrice(budget.total)} ${currencySymbol}`}</strong>
      </div>
    </li>
  )
}

export default BudgetListItem
