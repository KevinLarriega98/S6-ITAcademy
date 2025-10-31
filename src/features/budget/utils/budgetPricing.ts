import type { ServiceOption } from "../types/budgetTypes"
import { WEB_CONFIGURATION_UNIT_PRICE } from "../constants/pricingConstants"

const roundCurrency = (value: number) => Number(value.toFixed(2))

export const calculateWebExtraPrice = (pages: number, languages: number) =>
  (pages + languages) * WEB_CONFIGURATION_UNIT_PRICE

export const getDiscountMultiplier = (isAnnualBilling: boolean, discountRate: number) =>
  isAnnualBilling ? 1 - discountRate : 1

export const buildDiscountedPriceMap = (services: ServiceOption[], discountMultiplier: number) =>
  new Map(services.map((service) => [service.id, roundCurrency(service.price * discountMultiplier)] as const))

export const getWebBasePrice = (basePrice: number, discountMultiplier: number) =>
  roundCurrency(basePrice * discountMultiplier)

export const getWebTotalPrice = (webBasePrice: number, webExtraPrice: number) =>
  roundCurrency(webBasePrice + webExtraPrice)

export const calculateTotalAmount = (
  selectedServices: string[],
  webTotalPrice: number,
  priceMap: Map<string, number>,
  webServiceId: string,
) =>
  roundCurrency(
    selectedServices.reduce((total, serviceId) => {
      if (serviceId === webServiceId) {
        return total + webTotalPrice
      }

      return total + (priceMap.get(serviceId) ?? 0)
    }, 0),
  )

