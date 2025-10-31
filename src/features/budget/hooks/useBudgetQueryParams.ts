import { useCallback, useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import type { ServiceOption } from "../types/budgetTypes"

export type BudgetQueryState = {
  selectedServices: string[]
  webPages: number
  webLanguages: number
  isAnnualBilling: boolean
}

const BILLING_PARAM = "billing"
const BILLING_ANNUAL = "annual"
const BILLING_MONTHLY = "monthly"
const PAGES_PARAM = "pages"
const LANGUAGES_PARAM = "languages"

const toPositiveInteger = (value: string | null) => {
  const parsed = Number.parseInt(value ?? "", 10)
  return Number.isNaN(parsed) ? 0 : Math.max(0, parsed)
}

const readBudgetQuery = (
  params: URLSearchParams,
  services: ServiceOption[],
): BudgetQueryState => {
  const selectedServices = services
    .filter((service) => params.get(service.id) === "true")
    .map((service) => service.id)

  return {
    selectedServices,
    webPages: toPositiveInteger(params.get(PAGES_PARAM)),
    webLanguages: toPositiveInteger(params.get(LANGUAGES_PARAM)),
    isAnnualBilling: params.get(BILLING_PARAM) === BILLING_ANNUAL,
  }
}

export const buildBudgetQueryParams = (
  { selectedServices, webPages, webLanguages, isAnnualBilling }: BudgetQueryState,
  services: ServiceOption[],
  webServiceId: string,
) => {
  const params = new URLSearchParams()

  services.forEach((service) => {
    if (selectedServices.includes(service.id)) {
      params.set(service.id, "true")
    }
  })

  if (selectedServices.includes(webServiceId)) {
    params.set(PAGES_PARAM, webPages.toString())
    params.set(LANGUAGES_PARAM, webLanguages.toString())
  }

  params.set(BILLING_PARAM, isAnnualBilling ? BILLING_ANNUAL : BILLING_MONTHLY)

  return params
}

export const useBudgetQueryParams = (services: ServiceOption[], webServiceId: string) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const queryString = useMemo(() => searchParams.toString(), [searchParams])

  const queryState = useMemo(
    () => readBudgetQuery(searchParams, services),
    [searchParams, services],
  )

  const replaceQuery = useCallback(
    (state: BudgetQueryState) => {
      const nextParams = buildBudgetQueryParams(state, services, webServiceId)

      if (nextParams.toString() !== searchParams.toString()) {
        setSearchParams(nextParams, { replace: true })
      }
    },
    [searchParams, services, setSearchParams, webServiceId],
  )

  return { queryState, replaceQuery, queryString }
}
