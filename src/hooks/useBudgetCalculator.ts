import { useCallback, useMemo, useState } from "react"
import { SERVICE_OPTIONS, WEB_BASE_PRICE } from "../data/services"
import { calculateTotalAmount, calculateWebExtraPrice } from "../utils/budgetCalculations"

type UseBudgetCalculatorOptions = {
  discountRate: number
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
  toggleService: (serviceId: string) => void
  resetSelections: () => void
  isAnnualBilling: boolean
  toggleBillingCycle: () => void
  discountRate: number
  servicePriceMap: Map<string, number>
  pricing: PricingDetails
  webConfig: WebConfigState
}

export const useBudgetCalculator = ({ discountRate }: UseBudgetCalculatorOptions): UseBudgetCalculatorResult => {
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [webPages, setWebPages] = useState(0)
  const [webLanguages, setWebLanguages] = useState(0)
  const [isAnnualBilling, setIsAnnualBilling] = useState(false)

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
    () => (isAnnualBilling ? 1 - discountRate : 1),
    [discountRate, isAnnualBilling],
  )

  const servicePriceMap = useMemo(
    () =>
      new Map(
        SERVICE_OPTIONS.map((service) => [
          service.id,
          Number((service.price * discountMultiplier).toFixed(2)),
        ]),
      ),
    [discountMultiplier],
  )

  const webBasePrice = useMemo(
    () => Number((WEB_BASE_PRICE * discountMultiplier).toFixed(2)),
    [discountMultiplier],
  )

  const webTotalPrice = useMemo(
    () => Number((webBasePrice + webExtraPrice).toFixed(2)),
    [webBasePrice, webExtraPrice],
  )

  const totalAmount = useMemo(
    () => calculateTotalAmount(selectedServices, webTotalPrice, servicePriceMap),
    [selectedServices, servicePriceMap, webTotalPrice],
  )

  return {
    selectedServices,
    toggleService,
    resetSelections,
    isAnnualBilling,
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
