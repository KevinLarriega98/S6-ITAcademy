import { useState } from "react"
import type { FormEvent } from "react"
import type { BillingCycle, SavedBudget } from "../types/budgetTypes"
import { buildServiceLabel } from "../utils/budgetCalculations"
import { generateId } from "../../../shared/utils/id"
import { useBudgetController, type UseBudgetControllerOptions } from "./useBudgetController"
import { useBudgetForm, type BudgetFormFieldView } from "./useBudgetForm"
import type { UseBudgetCalculatorResult } from "./useBudgetCalculator"

type BudgetRequestFormController = {
  fields: BudgetFormFieldView[]
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  isSubmitDisabled: boolean
  submissionError: string | null
  clearSubmissionError: () => void
}

type UseBudgetPageControllerResult = {
  selection: UseBudgetCalculatorResult
  budgets: SavedBudget[]
  form: BudgetRequestFormController
}

const useBudgetPageController = (options: UseBudgetControllerOptions): UseBudgetPageControllerResult => {
  const selection = useBudgetController(options)
  const { fields, normalizedValues, isValid, reset } = useBudgetForm()
  const [budgets, setBudgets] = useState<SavedBudget[]>([])
  const [submissionError, setSubmissionError] = useState<string | null>(null)

  const isSubmitDisabled =
    !isValid || selection.selectedServices.length === 0 || selection.pricing.totalAmount === 0

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isSubmitDisabled) {
      return
    }

    setSubmissionError(null)

    try {
      const { pages: webPages, languages: webLanguages } = selection.webConfig
      const normalized = normalizedValues
      const billingCycle: BillingCycle = selection.isAnnualBilling ? "annual" : "monthly"

      const newBudget: SavedBudget = {
        id: generateId(),
        clientName: normalized.name,
        phone: normalized.phone,
        email: normalized.email,
        services: selection.selectedServices.map((serviceId) => buildServiceLabel(serviceId, webPages, webLanguages)),
        total: selection.pricing.totalAmount,
        createdAt: new Date().toISOString(),
        billingCycle,
        discountRate: selection.isAnnualBilling ? selection.discountRate : 0,
      }

      setBudgets((current) => [newBudget, ...current])
      reset()
      selection.resetSelections()
      selection.setAnnualBilling(false)
    } catch (error) {
      console.error("Failed to create budget entry", error)
      setSubmissionError("No se pudo guardar el presupuesto. Inténtalo de nuevo.")
    }
  }

  return {
    selection,
    budgets,
    form: {
      fields,
      onSubmit: handleSubmit,
      isSubmitDisabled,
      submissionError,
      clearSubmissionError: () => setSubmissionError(null),
    },
  }
}

export type { BudgetRequestFormController, UseBudgetPageControllerResult }
export { useBudgetPageController }
