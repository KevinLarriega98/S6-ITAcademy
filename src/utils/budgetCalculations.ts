import { getServiceById } from "../data/services"
import { WEB_SERVICE_ID } from "../lib/constants/pricingConstants"

const formatCountLabel = (value: number, singular: string, plural: string) =>
  `${value} ${value === 1 ? singular : plural}`

export const buildServiceLabel = (serviceId: string, pages: number, languages: number) => {
  if (serviceId === WEB_SERVICE_ID) {
    const pagesLabel = formatCountLabel(pages, "página", "páginas")
    const languagesLabel = formatCountLabel(languages, "lenguaje", "lenguajes")
    return `Web (${pagesLabel} y ${languagesLabel})`
  }

  const service = getServiceById(serviceId)
  return service?.title ?? serviceId
}