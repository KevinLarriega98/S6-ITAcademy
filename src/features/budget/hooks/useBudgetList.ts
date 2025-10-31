import { useCallback, useMemo, useState } from "react"
import type { SavedBudget } from "../types/budgetTypes"
import {
  SORT_OPTIONS,
  filterBudgets,
  getDefaultOrder,
  sortBudgets,
  type SortConfig,
  type SortKey,
  type SortOrder,
} from "../utils/budgetListUtils"

export { SORT_OPTIONS }
export type { SortKey, SortOrder }

export const useBudgetList = (budgets: SavedBudget[]) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: "date", order: "desc" })
  const [searchTerm, setSearchTerm] = useState("")

  const filteredBudgets = useMemo(
    () => filterBudgets(budgets, searchTerm),
    [budgets, searchTerm],
  )

  const sortedBudgets = useMemo(
    () => sortBudgets(filteredBudgets, sortConfig),
    [filteredBudgets, sortConfig],
  )

  const handleSortClick = useCallback((key: SortKey) => {
    setSortConfig((current) =>
      current.key === key
        ? { key, order: current.order === "asc" ? "desc" : "asc" }
        : { key, order: getDefaultOrder(key) },
    )
  }, [])

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
