import type { ReactNode } from "react"
import type { ServiceOption } from "../../lib/types/budgetTypes"

type ServiceCardProps = {
  service: ServiceOption
  currencySymbol: string
  price: string
  isSelected: boolean
  showDiscount: boolean
  discountLabel: string
  onToggle: () => void
  children?: ReactNode
}

const ServiceCard = ({
  service,
  currencySymbol,
  price,
  isSelected,
  showDiscount,
  discountLabel,
  onToggle,
  children,
}: ServiceCardProps) => (
  <article className={`service-card${isSelected ? " service-card--selected" : ""}`}>
    <div className="service-card__row">
      <div className="service-card__heading">
        <h2 className="service-card__title">{service.title}</h2>
        {showDiscount && <span className="service-card__discount">{discountLabel}</span>}
      </div>
      <strong className="service-card__price">{`${price} ${currencySymbol}`}</strong>
    </div>

    <div className="service-card__row service-card__row--bottom">
      <p className="service-card__description">{service.description}</p>
      <label className="service-card__action">
        <input type="checkbox" checked={isSelected} onChange={onToggle} />
        <span>Añadir</span>
      </label>
    </div>

    {children}
  </article>
)

export default ServiceCard
