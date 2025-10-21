import type { FormEvent } from "react"
import "./BudgetRequestSection.css"

type BudgetRequestSectionProps = {
  clientName: string
  clientPhone: string
  clientEmail: string
  onClientNameChange: (value: string) => void
  onClientPhoneChange: (value: string) => void
  onClientEmailChange: (value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  isSubmitDisabled: boolean
  namePattern: string
  phonePattern: string
  emailPattern: string
}

const BudgetRequestSection = ({
  clientName,
  clientPhone,
  clientEmail,
  onClientNameChange,
  onClientPhoneChange,
  onClientEmailChange,
  onSubmit,
  isSubmitDisabled,
  namePattern,
  phonePattern,
  emailPattern,
}: BudgetRequestSectionProps) => {
  return (
    <section className="budget-request">
      <h2 className="budget-request__title">Pedir presupuesto</h2>
      <form className="budget-request__form" onSubmit={onSubmit}>
        <input
          className="budget-request__input"
          type="text"
          placeholder="Nombre"
          value={clientName}
          pattern={namePattern}
          title="Introduce al menos dos letras. No se permiten números."
          required
          onChange={(event) => onClientNameChange(event.target.value)}
        />
        <input
          className="budget-request__input"
          type="tel"
          placeholder="Teléfono"
          value={clientPhone}
          pattern={phonePattern}
          inputMode="numeric"
          title="Introduce un número de teléfono de 9 dígitos."
          required
          onChange={(event) => onClientPhoneChange(event.target.value)}
        />
        <input
          className="budget-request__input"
          type="email"
          placeholder="Correo electrónico"
          value={clientEmail}
          pattern={emailPattern}
          inputMode="email"
          title="Introduce un correo electrónico válido (por ejemplo, nombre@dominio.com)."
          required
          onChange={(event) => onClientEmailChange(event.target.value)}
        />
        <button className="btn budget-request__submit" type="submit" disabled={isSubmitDisabled}>
          Solicitar presupuesto
        </button>
      </form>
    </section>
  )
}

export default BudgetRequestSection