import type { SortOrder } from "../../hooks/useBudgetList"

export type BudgetSortButtonProps = {
  label: string
  isActive: boolean
  order: SortOrder
  onClick: () => void
}

const BudgetSortButton = ({ label, isActive, order, onClick }: BudgetSortButtonProps) => (
  <button
    type="button"
    className={`budget-list__sort-button${isActive ? " budget-list__sort-button--active" : ""}`}
    onClick={onClick}
    aria-pressed={isActive}
  >
    <span>{label}</span>
    {isActive && (
      <span className={`budget-list__sort-icon budget-list__sort-icon--${order}`} aria-hidden="true" />
    )}
  </button>
)

export default BudgetSortButton