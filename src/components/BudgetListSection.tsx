import { useMemo, useState } from "react"
import type { SavedBudget } from "../types/budget"
import { normalize } from "../utils/validation"
import "./BudgetListSection.css"

type BudgetListSectionProps = {
  budgets: SavedBudget[]
  currencySymbol: string
}

type SortKey = "date" | "total" | "name"
type SortOrder = "asc" | "desc"

const SORT_OPTIONS: Array<{ key: SortKey; label: string }> = [
  { key: "date", label: "Fecha" },
  { key: "total", label: "Importe" },
  { key: "name", label: "Nombre" },
]

const getDefaultOrder = (key: SortKey): SortOrder => (key === "name" ? "asc" : "desc")

const BudgetListSection = ({ budgets, currencySymbol }: BudgetListSectionProps) => {
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; order: SortOrder }>({
    key: "date",
    order: "desc",
  })
  const [searchTerm, setSearchTerm] = useState("")

  const handleSortClick = (key: SortKey) => {
    setSortConfig((current) =>
      current.key === key
        ? { key, order: current.order === "asc" ? "desc" : "asc" }
        : { key, order: getDefaultOrder(key) },
    )
  }

  const searchFilteredBudgets = useMemo(() => {
    const normalizedQuery = normalize(searchTerm).toLowerCase()

    if (!normalizedQuery) {
      return budgets
    }

    return budgets.filter((budget) => budget.clientName.toLowerCase().includes(normalizedQuery))
  }, [budgets, searchTerm])

  const sortedBudgets = useMemo(() => {
    const sortedList = [...searchFilteredBudgets]

    sortedList.sort((firstBudget, secondBudget) => {
      let result = 0

      switch (sortConfig.key) {
        case "date": {
          const firstCreatedAtMs = firstBudget.createdAt ? new Date(firstBudget.createdAt).getTime() : 0
          const secondCreatedAtMs = secondBudget.createdAt ? new Date(secondBudget.createdAt).getTime() : 0
          result = firstCreatedAtMs - secondCreatedAtMs
          break
        }
        case "total": {
          result = firstBudget.total - secondBudget.total
          break
        }
        case "name": {
          result = firstBudget.clientName.localeCompare(secondBudget.clientName, undefined, { sensitivity: "base" })
          break
        }
      }

      return sortConfig.order === "asc" ? result : -result
    })

    return sortedList
  }, [searchFilteredBudgets, sortConfig])

  return (
    <section className="budget-list">
      <header className="budget-list__header">
        <h2 className="budget-list__title">Presupuestos en curso</h2>
        {budgets.length > 0 && (
          <div className="budget-list__controls">
            <label className="budget-list__search">
              <span className="budget-list__search-label">Buscar presupuestos por nombre</span>
              <input
                type="search"
                name="budget-search"
                className="budget-list__search-input"
                placeholder="Buscar por nombre"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
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
            <div className="budget-list__sort">
              {SORT_OPTIONS.map(({ key, label }) => {
                const isActive = sortConfig.key === key
                const buttonClassName = [
                  "budget-list__sort-button",
                  isActive ? "budget-list__sort-button--active" : "",
                ]
                  .filter(Boolean)
                  .join(" ")

                return (
                  <button
                    key={key}
                    type="button"
                    className={buttonClassName}
                    onClick={() => handleSortClick(key)}
                    aria-pressed={isActive}
                  >
                    <span>{label}</span>
                    {isActive && (
                      <span
                        className={`budget-list__sort-icon budget-list__sort-icon--${sortConfig.order}`}
                        aria-hidden="true"
                      />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </header>

      {budgets.length === 0 ? (
        <p className="budget-list__empty">Todavía no hay presupuestos guardados.</p>
      ) : searchFilteredBudgets.length === 0 ? (
        <p className="budget-list__empty">No hay presupuestos que coincidan con la búsqueda.</p>
      ) : (
        <ul className="budget-list__items">
          {sortedBudgets.map((budget) => (
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
