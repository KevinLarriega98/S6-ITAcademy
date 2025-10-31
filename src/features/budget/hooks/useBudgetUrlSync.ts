import { useEffect, useRef } from "react"
import type { ServiceOption } from "../types/budgetTypes"
import type { BudgetQueryState } from "./useBudgetQueryParams"
import {
  applyQueryToState,
  updateQueryFromState,
} from "../utils/budgetUrlSyncHelpers"

type UseBudgetUrlSyncOptions = {
  queryState: BudgetQueryState
  queryString: string
  replaceQuery: (state: BudgetQueryState) => void
  services: ServiceOption[]
  webServiceId: string
  selectedServices: string[]
  setSelectedServices: (services: string[]) => void
  webPages: number
  setPages: (value: number) => void
  webLanguages: number
  setLanguages: (value: number) => void
  isAnnualBilling: boolean
  setAnnualBilling: (value: boolean) => void
}

export const useBudgetUrlSync = (options: UseBudgetUrlSyncOptions) => {
  const {
    queryState,
    queryString,
    replaceQuery,
    services,
    webServiceId,
    selectedServices,
    setSelectedServices,
    webPages,
    setPages,
    webLanguages,
    setLanguages,
    isAnnualBilling,
    setAnnualBilling,
  } = options

  const lastSyncedQueryRef = useRef(queryString)
  const hasHydratedRef = useRef(false)

  useEffect(() => {
    try {
      applyQueryToState({
        queryString,
        queryState,
        selectedServices,
        setSelectedServices,
        webPages,
        setPages,
        webLanguages,
        setLanguages,
        isAnnualBilling,
        setAnnualBilling,
        lastSyncedQueryRef,
        hasHydratedRef,
      })
    } catch (error) {
      console.error("Failed to hydrate budget state from URL", error)
    }
  }, [
    isAnnualBilling,
    queryString,
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
    try {
      updateQueryFromState({
        selectedServices,
        webPages,
        webLanguages,
        isAnnualBilling,
        services,
        webServiceId,
        replaceQuery,
        lastSyncedQueryRef,
        hasHydratedRef,
      })
    } catch (error) {
      console.error("Failed to update budget URL parameters", error)
    }
  }, [
    isAnnualBilling,
    replaceQuery,
    selectedServices,
    services,
    webLanguages,
    webPages,
    webServiceId,
  ])
}
