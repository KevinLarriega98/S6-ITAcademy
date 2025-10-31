import { useState } from "react"
import {
  budgetFormFields,
  createBudgetFormValues,
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
  values: BudgetFormValues
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

  const validity = validateBudgetForm(values)
  const isValid = isBudgetFormValid(validity)

  const fields = budgetFormFields.map((field) => {
    const currentValue = values[field.key]
    const isInvalidField = touched[field.key] && !validity[field.key]

    return {
      ...field,
      value: currentValue,
      onChange: (nextValue: string) => {
        setValues((current) => ({
          ...current,
          [field.key]: nextValue,
        }))
      },
      onBlur: () => {
        setTouched((current) => ({
          ...current,
          [field.key]: true,
        }))
      },
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
    values,
    isValid,
    reset,
  }
}

export type { BudgetFormFieldView }