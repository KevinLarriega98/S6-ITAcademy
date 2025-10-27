import type { ReactNode } from "react"
import type { ServiceOption } from "../../lib/types/budgetTypes"

type ServiceCardService = {
  data: ServiceOption
  priceLabel: string
  currencySymbol: string
}

type ServiceCardState = {
  isSelected: boolean
  showDiscount: boolean
  discountLabel?: string
}

type ServiceCardProps = {
  service: ServiceCardService
  state: ServiceCardState
  onToggle: () => void
  children?: ReactNode
}

const ServiceCard = ({ service, state, onToggle, children }: ServiceCardProps) => {
  const { data, priceLabel, currencySymbol } = service
  const { isSelected, showDiscount, discountLabel } = state
  const shouldShowDiscount = showDiscount && discountLabel

  return (
    <article className={`service-card${isSelected ? " service-card--selected" : ""}`}>
      <div className="service-card__row">
        <div className="service-card__heading">
          <h2 className="service-card__title">{data.title}</h2>
          {shouldShowDiscount && <span className="service-card__discount">{discountLabel}</span>}
        </div>
        <strong className="service-card__price">{`${priceLabel} ${currencySymbol}`}</strong>
      </div>

      <div className="service-card__row service-card__row--bottom">
        <p className="service-card__description">{data.description}</p>
        <label className="service-card__action">
          <input type="checkbox" checked={isSelected} onChange={onToggle} />
          <span>Añadir</span>
        </label>
      </div>

      {children}
    </article>
  )
}

export type { ServiceCardService, ServiceCardState }
export default ServiceCard