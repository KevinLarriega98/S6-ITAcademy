import ServiceBillingToggle from "./service-selection/ServiceBillingToggle"
import ServiceCard, {
  type ServiceCardService,
  type ServiceCardState,
} from "./service-selection/ServiceCard"
import WebConfigurator from "../WebConfigurator/WebConfigurator"
import "./ServiceSelectionSection.css"
import type { ServiceOption } from "../../types/budgetTypes"
import { formatPrice } from "../../../../shared/utils/format"
import type { UseBudgetCalculatorResult } from "../../hooks/useBudgetCalculator"

type ServiceSelectionSectionProps = {
  services: ServiceOption[]
  controller: UseBudgetCalculatorResult
  webServiceId: string
  currencySymbol: string
}

type ServiceListProps = {
  services: ServiceOption[]
  webServiceId: string
  currencySymbol: string
  controller: UseBudgetCalculatorResult
}

const ServiceList = ({ services, webServiceId, currencySymbol, controller }: ServiceListProps) => {
  const {
    selectedServices,
    toggleService,
    webConfig,
    servicePriceMap,
    isAnnualBilling,
    toggleBillingCycle,
    discountRate,
    pricing,
  } = controller

  const discountLabel = `Ahorra un ${Math.round(discountRate * 100)}%`

  return (
    <section className="service-list">
      <ServiceBillingToggle isAnnualBilling={isAnnualBilling} onToggle={toggleBillingCycle} />

      {services.map((service) => {
        const isWebService = service.id === webServiceId
        const isSelected = selectedServices.includes(service.id)
        const displayPrice = isWebService ? pricing.webTotalPrice : servicePriceMap.get(service.id) ?? service.price

        const cardService: ServiceCardService = {
          data: service,
          priceLabel: formatPrice(displayPrice),
          currencySymbol,
        }

        const cardState: ServiceCardState = {
          isSelected,
          showDiscount: isAnnualBilling,
          discountLabel,
        }

        return (
          <ServiceCard
            key={service.id}
            service={cardService}
            state={cardState}
            onToggle={() => toggleService(service.id)}
          >
            {isSelected && isWebService && (
              <WebConfigurator
                pages={webConfig.pages}
                languages={webConfig.languages}
                onPagesChange={webConfig.setPages}
                onLanguagesChange={webConfig.setLanguages}
                basePrice={pricing.webBasePrice}
                extraPrice={pricing.webExtraPrice}
              />
            )}
          </ServiceCard>
        )
      })}
    </section>
  )
}

const BudgetSummary = ({ totalAmount, currencySymbol }: { totalAmount: number; currencySymbol: string }) => {
  const formattedTotalAmount = formatPrice(totalAmount)

  return (
    <section className="budget-summary">
      <strong className="budget-summary__value">
        <span className="budget-summary__label">Presupuesto total:</span>
        {`${formattedTotalAmount} ${currencySymbol}`}
      </strong>
    </section>
  )
}

const ServiceSelectionSection = ({
  services,
  controller,
  webServiceId,
  currencySymbol,
}: ServiceSelectionSectionProps) => (
  <>
    <ServiceList services={services} webServiceId={webServiceId} currencySymbol={currencySymbol} controller={controller} />
    <BudgetSummary totalAmount={controller.pricing.totalAmount} currencySymbol={currencySymbol} />
  </>
)

export default ServiceSelectionSection