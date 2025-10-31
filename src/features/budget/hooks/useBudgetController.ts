import type { BudgetQueryState } from "./useBudgetQueryParams"
import {
  useBudgetCalculator,
  type UseBudgetCalculatorOptions,
  type UseBudgetCalculatorResult,
} from "./useBudgetCalculator"
import { useBudgetUrlSync } from "./useBudgetUrlSync"

type UseBudgetControllerOptions = UseBudgetCalculatorOptions & {
  urlSync: {
    queryState: BudgetQueryState
    replaceQuery: (state: BudgetQueryState) => void
  }
}

const useBudgetController = ({
  urlSync,
  ...calculatorOptions
}: UseBudgetControllerOptions): UseBudgetCalculatorResult => {
  const calculator = useBudgetCalculator(calculatorOptions)

  useBudgetUrlSync({
    queryState: urlSync.queryState,
    replaceQuery: urlSync.replaceQuery,
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