type ServiceBillingToggleProps = {
  isAnnualBilling: boolean
  onToggle: () => void
}

const ServiceBillingToggle = ({ isAnnualBilling, onToggle }: ServiceBillingToggleProps) => (
  <div className="service-billing">
    <span className={`service-billing__label${!isAnnualBilling ? " service-billing__label--active" : ""}`}>
      Pago mensual
    </span>
    <button
      type="button"
      className={`service-billing__switch${isAnnualBilling ? " service-billing__switch--active" : ""}`}
      onClick={onToggle}
      aria-pressed={isAnnualBilling}
      aria-label={isAnnualBilling ? "Cambiar a pago mensual" : "Cambiar a pago anual"}
    >
      <span className="service-billing__thumb" />
    </button>
    <span className={`service-billing__label${isAnnualBilling ? " service-billing__label--active" : ""}`}>
      Pago anual
    </span>
  </div>
)

export default ServiceBillingToggle