import type { ServiceOption } from "../lib/types/budgetTypes"
import { WEB_SERVICE_ID } from "../lib/constants/web"

export const SERVICE_OPTIONS: ServiceOption[] = [
    {
        id: "seo",
        title: "Seo",
        description: "Programación de una web responsive completa",
        price: 300,
    },
    {
        id: "ads",
        title: "Ads",
        description: "Programación de una web responsive completa",
        price: 400,
    },
    {
        id: "web",
        title: "Web",
        description: "Programación de una web responsive completa",
        price: 500,
    },
]

export const PRICE_MAP = new Map(SERVICE_OPTIONS.map((s) => [s.id, s.price]))

export const WEB_BASE_PRICE = PRICE_MAP.get(WEB_SERVICE_ID) ?? 0
