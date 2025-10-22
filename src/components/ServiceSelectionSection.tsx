import ServiceBillingToggle from "./service-selection/ServiceBillingToggle"
import ServiceCard from "./service-selection/ServiceCard"
import WebConfigurator from "./WebConfigurator"
import "./ServiceSelectionSection.css"
import type { ServiceOption } from "../lib/types/budgetTypes"
import { formatPrice } from "../utils/format"

type ServiceSelectionSectionProps = {
  services: ServiceOption[]
  selectedServices: string[]
  onToggleService: (serviceId: string) => void
  webServiceId: string
  webConfig: {
    pages: number
    languages: number
    onPagesChange: (value: number) => void
    onLanguagesChange: (value: number) => void
    basePrice: number
    extraPrice: number
    totalPrice: number
  }
  currencySymbol: string
  totalAmount: number
  isAnnualBilling: boolean
  onToggleAnnualBilling: () => void
  discountRate: number
  servicePriceMap: Map<string, number>
}

const ServiceSelectionSection = ({
  services,
  selectedServices,
  onToggleService,
  webServiceId,
  webConfig,
  currencySymbol,
  totalAmount,
  isAnnualBilling,
  onToggleAnnualBilling,
  discountRate,
  servicePriceMap,
}: ServiceSelectionSectionProps) => {
  const discountLabel = `Ahorra un ${Math.round(discountRate * 100)}%`
  const formattedTotalAmount = formatPrice(totalAmount)

  const isSelected = (serviceId: string) => selectedServices.includes(serviceId)

  return (
    <>
      <section className="service-list">
        <ServiceBillingToggle isAnnualBilling={isAnnualBilling} onToggle={onToggleAnnualBilling} />

        {services.map((service) => {
          const selected = isSelected(service.id)
          const isWebService = service.id === webServiceId
          const displayPrice = isWebService
            ? webConfig.totalPrice
            : servicePriceMap.get(service.id) ?? service.price
          const formattedPrice = formatPrice(displayPrice)

          return (
            <ServiceCard
              key={service.id}
              service={service}
              currencySymbol={currencySymbol}
              price={formattedPrice}
              isSelected={selected}
              showDiscount={isAnnualBilling}
              discountLabel={discountLabel}
              onToggle={() => onToggleService(service.id)}
            >
              {selected && isWebService && (
                <WebConfigurator
                  pages={webConfig.pages}
                  languages={webConfig.languages}
                  onPagesChange={webConfig.onPagesChange}
                  onLanguagesChange={webConfig.onLanguagesChange}
                  basePrice={webConfig.basePrice}
                  extraPrice={webConfig.extraPrice}
                />
              )}
            </ServiceCard>
          )
        })}
      </section>

      <section className="budget-summary">
        <strong className="budget-summary__value">
          <span className="budget-summary__label">Presupuesto total:</span>
          {`${formattedTotalAmount} ${currencySymbol}`}
        </strong>
      </section>
    </>
  )
}

export default ServiceSelectionSection
