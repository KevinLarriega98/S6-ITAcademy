import { useEffect, useRef } from "react"
import type { BudgetQueryState } from "./useBudgetQueryParams"

type UseBudgetUrlSyncOptions = {
  queryState: BudgetQueryState
  replaceQuery: (state: BudgetQueryState) => void
  selectedServices: string[]
  setSelectedServices: (services: string[]) => void
  webPages: number
  setPages: (value: number) => void
  webLanguages: number
  setLanguages: (value: number) => void
  isAnnualBilling: boolean
  setAnnualBilling: (value: boolean) => void
}

const haveDifferentServices = (first: string[], second: string[]) => {
  if (first.length !== second.length) {
    return true
  }

  return first.some((service, index) => service !== second[index])
}

const hasQueryChanged = (previous: BudgetQueryState | null, next: BudgetQueryState) => {
  if (!previous) {
    return true
  }

  if (previous.webPages !== next.webPages || previous.webLanguages !== next.webLanguages) {
    return true
  }

  if (previous.isAnnualBilling !== next.isAnnualBilling) {
    return true
  }

  return haveDifferentServices(previous.selectedServices, next.selectedServices)
}

export const useBudgetUrlSync = ({
  queryState,
  replaceQuery,
  selectedServices,
  setSelectedServices,
  webPages,
  setPages,
  webLanguages,
  setLanguages,
  isAnnualBilling,
  setAnnualBilling,
}: UseBudgetUrlSyncOptions) => {
  const lastQueryRef = useRef<BudgetQueryState | null>(null)

  useEffect(() => {
    if (!hasQueryChanged(lastQueryRef.current, queryState)) {
      return
    }

    lastQueryRef.current = queryState

    if (haveDifferentServices(queryState.selectedServices, selectedServices)) {
      setSelectedServices(queryState.selectedServices)
    }

    if (queryState.webPages !== webPages) {
      setPages(queryState.webPages)
    }

    if (queryState.webLanguages !== webLanguages) {
      setLanguages(queryState.webLanguages)
    }

    if (queryState.isAnnualBilling !== isAnnualBilling) {
      setAnnualBilling(queryState.isAnnualBilling)
    }
  }, [
    isAnnualBilling,
    queryState,
    selectedServices,
    setAnnualBilling,
    setLanguages,
    setPages,
    setSelectedServices,
    webLanguages,
    webPages,
  ])

  useEffect(() => {
    replaceQuery({
      selectedServices,
      webPages,
      webLanguages,
      isAnnualBilling,
    })
  }, [isAnnualBilling, replaceQuery, selectedServices, webLanguages, webPages])
}