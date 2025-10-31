import { useCallback, useMemo, useState } from "react"
import type { ServiceOption } from "../types/budgetTypes"
import {
  buildDiscountedPriceMap,
  calculateTotalAmount,
  calculateWebExtraPrice,
  getDiscountMultiplier,
  getWebBasePrice,
  getWebTotalPrice,
} from "../utils/budgetPricing"

type UseBudgetCalculatorOptions = {
  services: ServiceOption[]
  webServiceId: string
  webBasePrice: number
  discountRate: number
  initialSelectedServices?: string[]
  initialWebPages?: number
  initialWebLanguages?: number
  initialIsAnnualBilling?: boolean
}

type WebConfigState = {
  pages: number
  languages: number
  setPages: (value: number) => void
  setLanguages: (value: number) => void
}

type PricingDetails = {
  webBasePrice: number
  webExtraPrice: number
  webTotalPrice: number
  totalAmount: number
}

type SelectionControls = {
  selectedServices: string[]
  setSelectedServices: (services: string[]) => void
  toggleService: (serviceId: string) => void
  resetSelections: () => void
  isAnnualBilling: boolean
  setAnnualBilling: (value: boolean) => void
  toggleBillingCycle: () => void
  webConfig: WebConfigState
}

type UseBudgetCalculatorResult = SelectionControls & {
  discountRate: number
  servicePriceMap: Map<string, number>
  pricing: PricingDetails
}

export const useBudgetCalculator = ({
  services,
  webServiceId,
  webBasePrice,
  discountRate,
  initialSelectedServices,
  initialWebPages,
  initialWebLanguages,
  initialIsAnnualBilling,
}: UseBudgetCalculatorOptions): UseBudgetCalculatorResult => {
  const [selectedServices, setSelectedServices] = useState<string[]>(initialSelectedServices ?? [])
  const [webPages, setWebPages] = useState(initialWebPages ?? 0)
  const [webLanguages, setWebLanguages] = useState(initialWebLanguages ?? 0)
  const [isAnnualBilling, setAnnualBilling] = useState(initialIsAnnualBilling ?? false)

  const replaceSelectedServices = useCallback((services: string[]) => {
    setSelectedServices(Array.from(new Set(services)))
  }, [])

  const toggleService = useCallback((serviceId: string) => {
    setSelectedServices((current) =>
      current.includes(serviceId)
        ? current.filter((id) => id !== serviceId)
        : [...current, serviceId],
    )
  }, [])

  const resetSelections = useCallback(() => {
    setSelectedServices([])
    setWebPages(0)
    setWebLanguages(0)
  }, [])

  const toggleBillingCycle = useCallback(() => {
    setAnnualBilling((current) => !current)
  }, [])

  const webExtraPrice = useMemo(
    () => calculateWebExtraPrice(webPages, webLanguages),
    [webLanguages, webPages],
  )

  const discountMultiplier = useMemo(
    () => getDiscountMultiplier(isAnnualBilling, discountRate),
    [discountRate, isAnnualBilling],
  )

  const servicePriceMap = useMemo(
    () => buildDiscountedPriceMap(services, discountMultiplier),
    [discountMultiplier, services],
  )

  const discountedWebBasePrice = useMemo(
    () => getWebBasePrice(webBasePrice, discountMultiplier),
    [discountMultiplier, webBasePrice],
  )

  const webTotalPrice = useMemo(
    () => getWebTotalPrice(discountedWebBasePrice, webExtraPrice),
    [discountedWebBasePrice, webExtraPrice],
  )

  const totalAmount = useMemo(
    () => calculateTotalAmount(selectedServices, webTotalPrice, servicePriceMap, webServiceId),
    [selectedServices, servicePriceMap, webServiceId, webTotalPrice],
  )

  return {
    selectedServices,
    setSelectedServices: replaceSelectedServices,
    toggleService,
    resetSelections,
    isAnnualBilling,
    setAnnualBilling,
    toggleBillingCycle,
    webConfig: {
      pages: webPages,
      languages: webLanguages,
      setPages: setWebPages,
      setLanguages: setWebLanguages,
    },
    discountRate,
    servicePriceMap,
    pricing: {
      webBasePrice: discountedWebBasePrice,
      webExtraPrice,
      webTotalPrice,
      totalAmount,
    },
  }
}

export type { UseBudgetCalculatorOptions, UseBudgetCalculatorResult }