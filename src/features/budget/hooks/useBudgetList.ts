import { useState } from "react"
import type { SavedBudget } from "../types/budgetTypes"

export type SortKey = "date" | "total" | "name"
export type SortOrder = "asc" | "desc"

type SortConfig = {
  key: SortKey
  order: SortOrder
}

export const SORT_OPTIONS: Array<{ key: SortKey; label: string }> = [
  { key: "date", label: "Fecha" },
  { key: "total", label: "Importe" },
  { key: "name", label: "Nombre" },
]

const getDefaultOrder = (key: SortKey): SortOrder => (key === "name" ? "asc" : "desc")

const filterBudgets = (budgets: SavedBudget[], searchTerm: string) => {
  const query = searchTerm.trim().toLowerCase()

  if (!query) {
    return budgets
  }

  return budgets.filter((budget) => budget.clientName.toLowerCase().includes(query))
}

const sortBudgets = (budgets: SavedBudget[], sortConfig: SortConfig) => {
  const sorted = [...budgets]

  sorted.sort((first, second) => {
    if (sortConfig.key === "date") {
      const firstDate = first.createdAt ? new Date(first.createdAt).getTime() : 0
      const secondDate = second.createdAt ? new Date(second.createdAt).getTime() : 0
      return sortConfig.order === "asc" ? firstDate - secondDate : secondDate - firstDate
    }

    if (sortConfig.key === "total") {
      return sortConfig.order === "asc" ? first.total - second.total : second.total - first.total
    }

    const firstName = first.clientName.toLowerCase()
    const secondName = second.clientName.toLowerCase()
    const comparison = firstName.localeCompare(secondName)
    return sortConfig.order === "asc" ? comparison : -comparison
  })

  return sorted
}

export const useBudgetList = (budgets: SavedBudget[]) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: "date", order: "desc" })
  const [searchTerm, setSearchTerm] = useState("")

  const filteredBudgets = filterBudgets(budgets, searchTerm)
  const sortedBudgets = sortBudgets(filteredBudgets, sortConfig)

  const handleSortClick = (key: SortKey) => {
    setSortConfig((current) => {
      if (current.key === key) {
        return {
          key,
          order: current.order === "asc" ? "desc" : "asc",
        }
      }

      return {
        key,
        order: getDefaultOrder(key),
      }
    })
  }

  return {
    searchTerm,
    setSearchTerm,
    sortConfig,
    handleSortClick,
    results: {
      all: budgets,
      filtered: filteredBudgets,
      sorted: sortedBudgets,
    },
  }
}