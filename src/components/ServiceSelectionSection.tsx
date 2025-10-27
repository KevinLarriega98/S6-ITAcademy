import ServiceBillingToggle from "./service-selection/ServiceBillingToggle"
import ServiceCard, {
  type ServiceCardService,
  type ServiceCardState,
} from "./service-selection/ServiceCard"
import WebConfigurator from "./web-configurator/WebConfigurator"
import "./ServiceSelectionSection.css"
import type { ServiceOption } from "../lib/types/budgetTypes"
import { formatPrice } from "../utils/format"

type WebConfigProps = {
  pages: number
  languages: number
  onPagesChange: (value: number) => void
  onLanguagesChange: (value: number) => void
  basePrice: number
  extraPrice: number
  totalPrice: number
}

type SelectionState = {
  selectedServices: string[]
  toggleService: (serviceId: string) => void
  webServiceId: string
  webConfig: WebConfigProps
}

type PriceInfo = {
  currencySymbol: string
  totalAmount: number
  servicePriceMap: Map<string, number>
}

type BillingState = {
  isAnnualBilling: boolean
  toggleAnnualBilling: () => void
  discountRate: number
}

type ServiceSelectionSectionProps = {
  services: ServiceOption[]
  selectionState: SelectionState
  priceInfo: PriceInfo
  billingState: BillingState
}

const ServiceList = ({
  services,
  selectionState,
  priceInfo,
  billingState,
}: {
  services: ServiceOption[]
  selectionState: SelectionState
  priceInfo: PriceInfo
  billingState: BillingState
}) => {
  const { selectedServices, toggleService, webServiceId, webConfig } = selectionState
  const { currencySymbol, servicePriceMap } = priceInfo
  const { isAnnualBilling, discountRate } = billingState

  const discountLabel = `Ahorra un ${Math.round(discountRate * 100)}%`

  const buildCardProps = (service: ServiceOption): { service: ServiceCardService; state: ServiceCardState } => {
    const isWebService = service.id === webServiceId
    const displayPrice = isWebService ? webConfig.totalPrice : servicePriceMap.get(service.id) ?? service.price

    return {
      service: {
        data: service,
        priceLabel: formatPrice(displayPrice),
        currencySymbol,
      },
      state: {
        isSelected: selectedServices.includes(service.id),
        showDiscount: isAnnualBilling,
        discountLabel,
      },
    }
  }

  return (
    <section className="service-list">
      <ServiceBillingToggle isAnnualBilling={isAnnualBilling} onToggle={billingState.toggleAnnualBilling} />

      {services.map((service) => {
        const { service: cardService, state: cardState } = buildCardProps(service)
        const isWebService = service.id === webServiceId
        const isSelected = cardState.isSelected

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
  selectionState,
  priceInfo,
  billingState,
}: ServiceSelectionSectionProps) => (
  <>
    <ServiceList services={services} selectionState={selectionState} priceInfo={priceInfo} billingState={billingState} />
    <BudgetSummary totalAmount={priceInfo.totalAmount} currencySymbol={priceInfo.currencySymbol} />
  </>
)

export type { SelectionState, PriceInfo, BillingState, WebConfigProps }
export default ServiceSelectionSection