import { useMemo, useState } from "react"
import {
  budgetFormFields,
  createBudgetFormValues,
  normalizeBudgetFormValues,
  validateBudgetForm,
  isBudgetFormValid,
  type BudgetFormField,
  type BudgetFormValues,
} from "../forms/budgetForm"

type BudgetFormFieldView = BudgetFormField & {
  value: string
  onChange: (value: string) => void
}

type UseBudgetFormResult = {
  fields: BudgetFormFieldView[]
  normalizedValues: BudgetFormValues
  isValid: boolean
  reset: () => void
}

export const useBudgetForm = (): UseBudgetFormResult => {
  const [values, setValues] = useState<BudgetFormValues>(createBudgetFormValues())

  const normalizedValues = useMemo(() => normalizeBudgetFormValues(values), [values])
  const validity = useMemo(() => validateBudgetForm(normalizedValues), [normalizedValues])
  const isValid = useMemo(() => isBudgetFormValid(validity), [validity])

  const fields = useMemo(
    () =>
      budgetFormFields.map((field) => ({
        ...field,
        value: values[field.key],
        onChange: (nextValue: string) =>
          setValues((current) => ({
            ...current,
            [field.key]: field.sanitize ? field.sanitize(nextValue) : nextValue,
          })),
      })),
    [values],
  )

  const reset = () => setValues(createBudgetFormValues())

  return {
    fields,
    normalizedValues,
    isValid,
    reset,
  }
}