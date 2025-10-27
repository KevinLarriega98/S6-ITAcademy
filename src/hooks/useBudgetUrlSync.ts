import { useEffect, useRef } from "react"
import type { ServiceOption } from "../lib/types/budgetTypes"
import type { BudgetQueryState } from "./useBudgetQueryParams"
import { buildBudgetQueryParams } from "./useBudgetQueryParams"

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

const areArraysEqual = (first: string[], second: string[]) =>
  first.length === second.length && first.every((value, index) => value === second[index])

const buildStateSnapshot = (
  selectedServices: string[],
  webPages: number,
  webLanguages: number,
  isAnnualBilling: boolean,
): BudgetQueryState => ({
  selectedServices,
  webPages,
  webLanguages,
  isAnnualBilling,
})

export const useBudgetUrlSync = ({
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
}: UseBudgetUrlSyncOptions) => {
  const hasHydratedRef = useRef(false)
  const lastSyncedQueryRef = useRef(queryString)

  const { selectedServices: queryServices, webPages: queryPages, webLanguages: queryLanguages, isAnnualBilling: queryBilling } =
    queryState

  useEffect(() => {
    if (!hasHydratedRef.current) {
      hasHydratedRef.current = true
      lastSyncedQueryRef.current = queryString
      return
    }

    if (queryString === lastSyncedQueryRef.current) {
      return
    }

    lastSyncedQueryRef.current = queryString

    if (!areArraysEqual(selectedServices, queryServices)) {
      setSelectedServices(queryServices)
    }

    if (webPages !== queryPages) {
      setPages(queryPages)
    }

    if (webLanguages !== queryLanguages) {
      setLanguages(queryLanguages)
    }

    if (isAnnualBilling !== queryBilling) {
      setAnnualBilling(queryBilling)
    }
  }, [
    isAnnualBilling,
    queryBilling,
    queryLanguages,
    queryPages,
    queryServices,
    queryString,
    selectedServices,
    setAnnualBilling,
    setLanguages,
    setPages,
    setSelectedServices,
    webLanguages,
    webPages,
  ])

  useEffect(() => {
    if (!hasHydratedRef.current) {
      return
    }

    const nextState = buildStateSnapshot(selectedServices, webPages, webLanguages, isAnnualBilling)
    const nextParams = buildBudgetQueryParams(nextState, services, webServiceId)
    const nextQuery = nextParams.toString()

    if (nextQuery === queryString) {
      lastSyncedQueryRef.current = nextQuery
      return
    }

    lastSyncedQueryRef.current = nextQuery
    replaceQuery(nextState)
  }, [
    isAnnualBilling,
    queryString,
    replaceQuery,
    selectedServices,
    services,
    webLanguages,
    webPages,
    webServiceId,
  ])
}