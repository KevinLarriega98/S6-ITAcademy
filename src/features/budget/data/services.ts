import type { ServiceOption } from "../types/budgetTypes"
import { WEB_SERVICE_ID } from "../constants/pricingConstants"

const BASE_SERVICE_DESCRIPTION = "Programación de una web responsive completa"

export const SERVICE_OPTIONS: ServiceOption[] = [
  {
    id: "seo",
    title: "SEO",
    description: BASE_SERVICE_DESCRIPTION,
    price: 300,
  },
  {
    id: "ads",
    title: "Ads",
    description: BASE_SERVICE_DESCRIPTION,
    price: 400,
  },
  {
    id: WEB_SERVICE_ID,
    title: "Web",
    description: BASE_SERVICE_DESCRIPTION,
    price: 500,
  },
]

export const WEB_BASE_PRICE =
  SERVICE_OPTIONS.find((service) => service.id === WEB_SERVICE_ID)?.price ?? 0

export const getServiceById = (serviceId: string) =>
  SERVICE_OPTIONS.find((service) => service.id === serviceId)

export const getServicePrice = (serviceId: string) =>
  SERVICE_OPTIONS.find((service) => service.id === serviceId)?.price