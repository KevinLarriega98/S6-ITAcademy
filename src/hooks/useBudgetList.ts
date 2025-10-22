import { useCallback, useMemo, useState } from "react"
import type { SavedBudget } from "../lib/types/budgetTypes"
import { normalize } from "../utils/validation"

export type SortKey = "date" | "total" | "name"
export type SortOrder = "asc" | "desc"

type SortConfig = {
  key: SortKey
  order: SortOrder
}

const getDefaultOrder = (key: SortKey): SortOrder => (key === "name" ? "asc" : "desc")

export const SORT_OPTIONS: Array<{ key: SortKey; label: string }> = [
  { key: "date", label: "Fecha" },
  { key: "total", label: "Importe" },
  { key: "name", label: "Nombre" },
]

export const useBudgetList = (budgets: SavedBudget[]) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: "date", order: "desc" })
  const [searchTerm, setSearchTerm] = useState("")

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

  const handleSortClick = useCallback((key: SortKey) => {
    setSortConfig((current) =>
      current.key === key
        ? { key, order: current.order === "asc" ? "desc" : "asc" }
        : { key, order: getDefaultOrder(key) },
    )
  }, [])

  return {
    sortConfig,
    searchTerm,
    setSearchTerm,
    handleSortClick,
    sortedBudgets,
    searchFilteredBudgets,
  }
}
