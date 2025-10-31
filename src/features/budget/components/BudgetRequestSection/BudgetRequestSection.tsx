import type { BudgetRequestFormController } from "../../hooks/useBudgetPageController"
import "./BudgetRequestSection.css"

type BudgetRequestSectionProps = {
  form: BudgetRequestFormController
}

const BudgetRequestSection = ({ form }: BudgetRequestSectionProps) => {
  const { onSubmit, isSubmitDisabled, fields, submissionError, clearSubmissionError } = form

  return (
    <section className="budget-request">
      <h2 className="budget-request__title">Pedir presupuesto</h2>
      <form className="budget-request__form" onSubmit={onSubmit}>
        {fields.map(
          ({
            key,
            label,
            placeholder,
            type,
            value,
            pattern,
            title,
            inputMode,
            autoComplete,
            required,
            onChange,
            onBlur,
            isInvalid,
            errorMessage,
          }) => {
            const inputId = `budget-request-${key}`
            const errorId = `${inputId}-error`

            return (
              <div
                key={key}
                className={`budget-request__field${isInvalid ? " budget-request__field--error" : ""}`}
              >
                <label className="budget-request__label" htmlFor={inputId}>
                  {label}
                </label>
                <input
                  id={inputId}
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
                  aria-invalid={isInvalid}
                  aria-describedby={isInvalid ? errorId : undefined}
                  onChange={(event) => {
                    clearSubmissionError()
                    onChange(event.target.value)
                  }}
                  onBlur={() => {
                    clearSubmissionError()
                    onBlur()
                  }}
                />
                {isInvalid && (
                  <span id={errorId} className="budget-request__error" role="alert">
                    {errorMessage}
                  </span>
                )}
              </div>
            )
          },
        )}
        {submissionError && (
          <div className="budget-request__submit-error" role="alert" aria-live="assertive">
            {submissionError}
          </div>
        )}
        <button className="btn budget-request__submit" type="submit" disabled={isSubmitDisabled}>
          Solicitar presupuesto
        </button>
      </form>
    </section>
  )
}

export default BudgetRequestSection