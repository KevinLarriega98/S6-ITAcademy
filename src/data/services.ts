import type { ServiceOption } from "../lib/types/budgetTypes"
import { WEB_SERVICE_ID } from "../lib/constants/pricingConstants"

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

export const SERVICE_MAP = new Map(SERVICE_OPTIONS.map((service) => [service.id, service]))
export const SERVICE_PRICE_MAP = new Map(SERVICE_OPTIONS.map((service) => [service.id, service.price]))

export const WEB_BASE_PRICE = SERVICE_PRICE_MAP.get(WEB_SERVICE_ID) ?? 0

export const getServiceById = (serviceId: string) => SERVICE_MAP.get(serviceId)
export const getServicePrice = (serviceId: string) => SERVICE_PRICE_MAP.get(serviceId)