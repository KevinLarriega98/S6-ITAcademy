import { useCallback, useState } from "react"
import {
  budgetFormFields,
  createBudgetFormValues,
  normalizeBudgetFormValues,
  validateBudgetForm,
  isBudgetFormValid,
  type BudgetFormField,
  type BudgetFormValues,
  type BudgetFormFieldKey,
} from "../forms/budgetForm"

type BudgetFormFieldView = BudgetFormField & {
  value: string
  onChange: (value: string) => void
  onBlur: () => void
  isInvalid: boolean
  errorMessage: string
}

type UseBudgetFormResult = {
  fields: BudgetFormFieldView[]
  normalizedValues: BudgetFormValues
  isValid: boolean
  reset: () => void
}

const initialTouchedState: Record<BudgetFormFieldKey, boolean> = {
  name: false,
  phone: false,
  email: false,
}

export const useBudgetForm = (): UseBudgetFormResult => {
  const [values, setValues] = useState<BudgetFormValues>(createBudgetFormValues())
  const [touched, setTouched] = useState<Record<BudgetFormFieldKey, boolean>>(initialTouchedState)

  const normalizedValues = normalizeBudgetFormValues(values)
  const validity = validateBudgetForm(normalizedValues)
  const isValid = isBudgetFormValid(validity)

  const touchField = useCallback((key: BudgetFormFieldKey) => {
    setTouched((current) => ({
      ...current,
      [key]: true,
    }))
  }, [])

  const fields = budgetFormFields.map((field) => {
    const currentValue = values[field.key]
    const sanitizeInput = field.sanitize

    const handleChange = (nextValue: string) => {
      const valueToStore = sanitizeInput ? sanitizeInput(nextValue) : nextValue

      setValues((current) => ({
        ...current,
        [field.key]: valueToStore,
      }))
    }

    const isInvalidField = touched[field.key] && !validity[field.key]

    return {
      ...field,
      value: currentValue,
      onChange: handleChange,
      onBlur: () => touchField(field.key),
      isInvalid: isInvalidField,
      errorMessage: field.title,
    }
  })

  const reset = () => {
    setValues(createBudgetFormValues())
    setTouched(initialTouchedState)
  }

  return {
    fields,
    normalizedValues,
    isValid,
    reset,
  }
}

export type { BudgetFormFieldView }