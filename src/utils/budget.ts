import { SERVICE_OPTIONS, PRICE_MAP } from "../data/services"
import { WEB_SERVICE_ID } from "../constants/web"

export const buildServiceLabel = (serviceId: string, pages: number, languages: number) => {
    if (serviceId === WEB_SERVICE_ID) {
        const pagesLabel = `${pages} ${pages === 1 ? "página" : "páginas"}`
        const languagesLabel = `${languages} ${languages === 1 ? "idioma" : "idiomas"}`
        return `Web (${pagesLabel} y ${languagesLabel})`
    }

    const service = SERVICE_OPTIONS.find((item) => item.id === serviceId)
    return service?.title ?? serviceId
}

export const calculateTotalAmount = (services: string[], webTotal: number, priceMap = PRICE_MAP) =>
    services.reduce((amount, serviceId) => amount + (serviceId === WEB_SERVICE_ID ? webTotal : (priceMap.get(serviceId) ?? 0)), 0)