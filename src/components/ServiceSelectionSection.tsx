import WebConfigurator from "./WebConfigurator"
import "./ServiceSelectionSection.css"
import type { ServiceOption } from "../types/budget"

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
}

const ServiceSelectionSection = ({
  services,
  selectedServices,
  onToggleService,
  webServiceId,
  webConfig,
  currencySymbol,
  totalAmount,
}: ServiceSelectionSectionProps) => {
  const isSelected = (serviceId: string) => selectedServices.includes(serviceId)

  return (
    <>
      <section className="service-list">
        {services.map((service) => {
          const selected = isSelected(service.id)
          const displayPrice = service.id === webServiceId ? webConfig.totalPrice : service.price

          return (
            <article
              key={service.id}
              className={`service-card${selected ? " service-card--selected" : ""}`}
            >
              <div className="service-card__row">
                <h2 className="service-card__title">{service.title}</h2>
                <strong className="service-card__price">{`${displayPrice} ${currencySymbol}`}</strong>
              </div>

              <div className="service-card__row service-card__row--bottom">
                <p className="service-card__description">{service.description}</p>
                <label className="service-card__action">
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => onToggleService(service.id)}
                  />
                  <span>Añadir</span>
                </label>
              </div>

              {selected && service.id === webServiceId && (
                <WebConfigurator
                  pages={webConfig.pages}
                  languages={webConfig.languages}
                  onPagesChange={webConfig.onPagesChange}
                  onLanguagesChange={webConfig.onLanguagesChange}
                  basePrice={webConfig.basePrice}
                  extraPrice={webConfig.extraPrice}
                />
              )}
            </article>
          )
        })}
      </section>

      <section className="budget-summary">
        <strong className="budget-summary__value">
          <span className="budget-summary__label">Presupuesto total:</span>
          {`${totalAmount} ${currencySymbol}`}
        </strong>
      </section>
    </>
  )
}

export default ServiceSelectionSection
