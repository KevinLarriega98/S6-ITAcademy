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
  const { fields, values, isValid, reset } = useBudgetForm()
  const [budgets, setBudgets] = useState<SavedBudget[]>([])
  const [submissionError, setSubmissionError] = useState<string | null>(null)

  const isSubmitDisabled = !isValid || selection.selectedServices.length === 0

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isSubmitDisabled) {
      setSubmissionError("Completa el formulario y selecciona al menos un servicio.")
      return
    }

    setSubmissionError(null)

    const { pages: webPages, languages: webLanguages } = selection.webConfig
    const billingCycle: BillingCycle = selection.isAnnualBilling ? "annual" : "monthly"
    const clientName = values.name.trim()
    const phone = values.phone.trim()
    const email = values.email.trim()

    const newBudget: SavedBudget = {
      id: generateId(),
      clientName,
      phone,
      email,
      services: selection.selectedServices.map((serviceId) =>
        buildServiceLabel(serviceId, webPages, webLanguages),
      ),
      total: selection.pricing.totalAmount,
      createdAt: new Date().toISOString(),
      billingCycle,
      discountRate: selection.isAnnualBilling ? selection.discountRate : 0,
    }

    setBudgets((current) => [newBudget, ...current])
    reset()
    selection.resetSelections()
    selection.setAnnualBilling(false)
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