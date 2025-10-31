import type { ServiceOption } from "../types/budgetTypes"
import { buildBudgetQueryParams, type BudgetQueryState } from "../hooks/useBudgetQueryParams"

type MutableRef<T> = {
  current: T
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

type ApplyQueryArgs = {
  queryString: string
  queryState: BudgetQueryState
  selectedServices: string[]
  setSelectedServices: (services: string[]) => void
  webPages: number
  setPages: (value: number) => void
  webLanguages: number
  setLanguages: (value: number) => void
  isAnnualBilling: boolean
  setAnnualBilling: (value: boolean) => void
  lastSyncedQueryRef: MutableRef<string>
  hasHydratedRef: MutableRef<boolean>
}

const applyQueryToState = ({
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
}: ApplyQueryArgs) => {
  const {
    selectedServices: queryServices,
    webPages: queryPages,
    webLanguages: queryLanguages,
    isAnnualBilling: queryBilling,
  } = queryState

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
}

type UpdateQueryArgs = {
  selectedServices: string[]
  webPages: number
  webLanguages: number
  isAnnualBilling: boolean
  services: ServiceOption[]
  webServiceId: string
  replaceQuery: (state: BudgetQueryState) => void
  lastSyncedQueryRef: MutableRef<string>
  hasHydratedRef: MutableRef<boolean>
}

const updateQueryFromState = ({
  selectedServices,
  webPages,
  webLanguages,
  isAnnualBilling,
  services,
  webServiceId,
  replaceQuery,
  lastSyncedQueryRef,
  hasHydratedRef,
}: UpdateQueryArgs) => {
  if (!hasHydratedRef.current) {
    return
  }

  const snapshot = buildStateSnapshot(selectedServices, webPages, webLanguages, isAnnualBilling)
  const nextParams = buildBudgetQueryParams(snapshot, services, webServiceId)
  const nextQuery = nextParams.toString()

  if (nextQuery === lastSyncedQueryRef.current) {
    return
  }

  lastSyncedQueryRef.current = nextQuery
  replaceQuery(snapshot)
}

export {
  applyQueryToState,
  updateQueryFromState,
  buildStateSnapshot,
}
