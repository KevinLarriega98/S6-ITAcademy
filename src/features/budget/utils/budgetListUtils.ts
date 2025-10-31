import type { SavedBudget } from "../types/budgetTypes"
import { normalize } from "../../../shared/utils/validation"

export type SortKey = "date" | "total" | "name"
export type SortOrder = "asc" | "desc"

export type SortConfig = {
  key: SortKey
  order: SortOrder
}

export const getDefaultOrder = (key: SortKey): SortOrder => (key === "name" ? "asc" : "desc")

export const SORT_OPTIONS: Array<{ key: SortKey; label: string }> = [
  { key: "date", label: "Fecha" },
  { key: "total", label: "Importe" },
  { key: "name", label: "Nombre" },
]

export const filterBudgets = (budgets: SavedBudget[], searchTerm: string) => {
  const normalizedQuery = normalize(searchTerm).toLowerCase()

  if (!normalizedQuery) {
    return budgets
  }

  return budgets.filter((budget) => budget.clientName.toLowerCase().includes(normalizedQuery))
}

const compareByKey = (first: SavedBudget, second: SavedBudget, key: SortKey) => {
  switch (key) {
    case "date": {
      const firstCreatedAtMs = first.createdAt ? new Date(first.createdAt).getTime() : 0
      const secondCreatedAtMs = second.createdAt ? new Date(second.createdAt).getTime() : 0
      return firstCreatedAtMs - secondCreatedAtMs
    }
    case "total":
      return first.total - second.total
    case "name":
      return first.clientName.localeCompare(second.clientName, undefined, { sensitivity: "base" })
    default:
      return 0
  }
}

export const sortBudgets = (budgets: SavedBudget[], sortConfig: SortConfig) => {
  const sortedBudgets = [...budgets]

  sortedBudgets.sort((first, second) => {
    const result = compareByKey(first, second, sortConfig.key)
    return sortConfig.order === "asc" ? result : -result
  })

  return sortedBudgets
}

