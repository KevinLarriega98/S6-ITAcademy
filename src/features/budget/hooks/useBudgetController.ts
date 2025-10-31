import type { ServiceOption } from "../types/budgetTypes"
import type { BudgetQueryState } from "./useBudgetQueryParams"
import { useBudgetCalculator, type UseBudgetCalculatorOptions, type UseBudgetCalculatorResult } from "./useBudgetCalculator"
import { useBudgetUrlSync } from "./useBudgetUrlSync"

type UseBudgetControllerOptions = UseBudgetCalculatorOptions & {
  urlSync: {
    queryState: BudgetQueryState
    queryString: string
    replaceQuery: (state: BudgetQueryState) => void
    services: ServiceOption[]
  }
}

const useBudgetController = ({
  urlSync,
  ...calculatorOptions
}: UseBudgetControllerOptions): UseBudgetCalculatorResult => {
  const calculator = useBudgetCalculator(calculatorOptions)

  useBudgetUrlSync({
    queryState: urlSync.queryState,
    queryString: urlSync.queryString,
    replaceQuery: urlSync.replaceQuery,
    services: urlSync.services,
    webServiceId: calculatorOptions.webServiceId,
    selectedServices: calculator.selectedServices,
    setSelectedServices: calculator.setSelectedServices,
    webPages: calculator.webConfig.pages,
    setPages: calculator.webConfig.setPages,
    webLanguages: calculator.webConfig.languages,
    setLanguages: calculator.webConfig.setLanguages,
    isAnnualBilling: calculator.isAnnualBilling,
    setAnnualBilling: calculator.setAnnualBilling,
  })

  return calculator
}

export type { UseBudgetControllerOptions }
export { useBudgetController }
