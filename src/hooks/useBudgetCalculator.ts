import { useCallback, useMemo, useState } from "react"
import type { ServiceOption } from "../lib/types/budgetTypes"
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

type UseBudgetCalculatorResult = {
  selectedServices: string[]
  setSelectedServices: (services: string[]) => void
  toggleService: (serviceId: string) => void
  resetSelections: () => void
  isAnnualBilling: boolean
  setAnnualBilling: (value: boolean) => void
  toggleBillingCycle: () => void
  discountRate: number
  servicePriceMap: Map<string, number>
  pricing: PricingDetails
  webConfig: WebConfigState
}

export const useBudgetCalculator = ({
  services,
  webServiceId,
  webBasePrice: baseWebPrice,
  discountRate,
  initialSelectedServices = [],
  initialWebPages = 0,
  initialWebLanguages = 0,
  initialIsAnnualBilling = false,
}: UseBudgetCalculatorOptions): UseBudgetCalculatorResult => {
  const [selectedServices, setSelectedServices] = useState<string[]>(initialSelectedServices)
  const [webPages, setWebPages] = useState(initialWebPages)
  const [webLanguages, setWebLanguages] = useState(initialWebLanguages)
  const [isAnnualBilling, setIsAnnualBilling] = useState(initialIsAnnualBilling)

  const replaceSelectedServices = useCallback((services: string[]) => {
    setSelectedServices(Array.from(new Set(services)))
  }, [])

  const setAnnualBilling = useCallback((value: boolean) => {
    setIsAnnualBilling(value)
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
    setIsAnnualBilling((current) => !current)
  }, [])

  const webExtraPrice = useMemo(
    () => calculateWebExtraPrice(webPages, webLanguages),
    [webPages, webLanguages],
  )

  const discountMultiplier = useMemo(
    () => getDiscountMultiplier(isAnnualBilling, discountRate),
    [discountRate, isAnnualBilling],
  )

  const servicePriceMap = useMemo(
    () =>
      buildDiscountedPriceMap(services, discountMultiplier),
    [discountMultiplier, services],
  )

  const webBasePrice = useMemo(
    () => getWebBasePrice(baseWebPrice, discountMultiplier),
    [baseWebPrice, discountMultiplier],
  )

  const webTotalPrice = useMemo(
    () => getWebTotalPrice(webBasePrice, webExtraPrice),
    [webBasePrice, webExtraPrice],
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
    discountRate,
    servicePriceMap,
    pricing: {
      webBasePrice,
      webExtraPrice,
      webTotalPrice,
      totalAmount,
    },
    webConfig: {
      pages: webPages,
      languages: webLanguages,
      setPages: setWebPages,
      setLanguages: setWebLanguages,
    },
  }
}