import type { FormEvent } from "react"
import type { BudgetFormField } from "../forms/budgetForm"
import "./BudgetRequestSection.css"

type BudgetRequestSectionProps = {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  isSubmitDisabled: boolean
  fields: Array<
    BudgetFormField & {
      value: string
      onChange: (value: string) => void
    }
  >
}

const BudgetRequestSection = ({
  onSubmit,
  isSubmitDisabled,
  fields,
}: BudgetRequestSectionProps) => {
  return (
    <section className="budget-request">
      <h2 className="budget-request__title">Pedir presupuesto</h2>
      <form className="budget-request__form" onSubmit={onSubmit}>
        {fields.map(({ key, placeholder, type, value, pattern, title, inputMode, autoComplete, required, onChange }) => (
          <input
            key={key}
            className="budget-request__input"
            name={key}
            type={type}
            placeholder={placeholder}
            value={value}
            pattern={pattern}
            title={title}
            inputMode={inputMode}
            autoComplete={autoComplete}
            required={required}
            onChange={(event) => onChange(event.target.value)}
          />
        ))}
        <button className="btn budget-request__submit" type="submit" disabled={isSubmitDisabled}>
          Solicitar presupuesto
        </button>
      </form>
    </section>
  )
}

export default BudgetRequestSection