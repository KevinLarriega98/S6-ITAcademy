import { useRef, useState } from "react"
import type { FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import ServiceSelectionSection from "../components/ServiceSelectionSection"
import BudgetRequestSection from "../components/BudgetRequestSection"
import BudgetListSection from "../components/BudgetListSection"
import type { BillingCycle, SavedBudget } from "../lib/types/budgetTypes"
import { SERVICE_OPTIONS, WEB_BASE_PRICE } from "../data/services"
import { WEB_SERVICE_ID, CURRENCY_SYMBOL, ANNUAL_DISCOUNT_RATE } from "../lib/constants/pricingConstants"
import { buildServiceLabel } from "../utils/budgetCalculations"
import { generateId } from "../utils/id"
import { useBudgetCalculator } from "../hooks/useBudgetCalculator"
import { useBudgetQueryParams } from "../hooks/useBudgetQueryParams"
import { useBudgetUrlSync } from "../hooks/useBudgetUrlSync"
import { useBudgetForm } from "../hooks/useBudgetForm"
import "./BudgetPage.css"

const BudgetPage = () => {
  const navigate = useNavigate()
  const { queryState, replaceQuery, queryString } = useBudgetQueryParams(SERVICE_OPTIONS, WEB_SERVICE_ID)
  const initialQueryStateRef = useRef(queryState)
  const [budgets, setBudgets] = useState<SavedBudget[]>([])
  const { fields: requestFields, normalizedValues, isValid: isFormValid, reset: resetForm } = useBudgetForm()

  const {
    selectedServices,
    setSelectedServices,
    toggleService,
    resetSelections,
    isAnnualBilling,
    setAnnualBilling,
    toggleBillingCycle,
    servicePriceMap,
    pricing,
    webConfig,
  } = useBudgetCalculator({
    services: SERVICE_OPTIONS,
    webServiceId: WEB_SERVICE_ID,
    webBasePrice: WEB_BASE_PRICE,
    discountRate: ANNUAL_DISCOUNT_RATE,
    initialSelectedServices: initialQueryStateRef.current.selectedServices,
    initialWebPages: initialQueryStateRef.current.webPages,
    initialWebLanguages: initialQueryStateRef.current.webLanguages,
    initialIsAnnualBilling: initialQueryStateRef.current.isAnnualBilling,
  })

  const { webBasePrice, webExtraPrice, webTotalPrice, totalAmount } = pricing
  const { pages: webPages, languages: webLanguages, setPages, setLanguages } = webConfig

  useBudgetUrlSync({
    queryState,
    queryString,
    replaceQuery,
    services: SERVICE_OPTIONS,
    webServiceId: WEB_SERVICE_ID,
    selectedServices,
    setSelectedServices,
    webPages,
    setPages,
    webLanguages,
    setLanguages,
    isAnnualBilling,
    setAnnualBilling,
  })

  const isSubmitDisabled =
    !isFormValid || selectedServices.length === 0 || totalAmount === 0

  const serviceSelectionProps = {
    services: SERVICE_OPTIONS,
    selectionState: {
      selectedServices,
      toggleService,
      webServiceId: WEB_SERVICE_ID,
      webConfig: {
        pages: webPages,
        languages: webLanguages,
        onPagesChange: setPages,
        onLanguagesChange: setLanguages,
        basePrice: webBasePrice,
        extraPrice: webExtraPrice,
        totalPrice: webTotalPrice,
      },
    },
    priceInfo: {
      currencySymbol: CURRENCY_SYMBOL,
      totalAmount,
      servicePriceMap,
    },
    billingState: {
      isAnnualBilling,
      toggleAnnualBilling: toggleBillingCycle,
      discountRate: ANNUAL_DISCOUNT_RATE,
    },
  }

  const handleBudgetSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isSubmitDisabled) {
      return
    }

    const normalized = normalizedValues
    const billingCycle: BillingCycle = isAnnualBilling ? "annual" : "monthly"

    const newBudget: SavedBudget = {
      id: generateId(),
      clientName: normalized.name,
      phone: normalized.phone,
      email: normalized.email,
      services: selectedServices.map((serviceId) => buildServiceLabel(serviceId, webPages, webLanguages)),
      total: totalAmount,
      createdAt: new Date().toISOString(),
      billingCycle,
      discountRate: isAnnualBilling ? ANNUAL_DISCOUNT_RATE : 0,
    }

    setBudgets((current) => [newBudget, ...current])
    resetForm()
    resetSelections()
    setAnnualBilling(false)
  }

  const requestSectionProps = {
    fields: requestFields,
    onSubmit: handleBudgetSubmit,
    isSubmitDisabled,
  }

  return (
    <main className="budget-page">
      <h1 className="budget-page__title">Calculadora de presupuesto</h1>

      <ServiceSelectionSection {...serviceSelectionProps} />

      <BudgetRequestSection {...requestSectionProps} />

      <BudgetListSection budgets={budgets} currencySymbol={CURRENCY_SYMBOL} />

      <footer className="budget-page__footer">
        <button type="button" className="btn budget-page__back" onClick={() => navigate("/")}>
          Volver al inicio
        </button>
      </footer>
    </main>
  )
}

export default BudgetPage