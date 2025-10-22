import { useState } from "react"
import type { FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import ServiceSelectionSection from "../components/ServiceSelectionSection"
import BudgetRequestSection from "../components/BudgetRequestSection"
import BudgetListSection from "../components/BudgetListSection"
import type { BillingCycle, SavedBudget } from "../lib/types/budgetTypes"
import { useBudgetCalculator } from "../hooks/useBudgetCalculator"
import "./BudgetPage.css"
import {
  NAME_PATTERN,
  PHONE_PATTERN,
  EMAIL_PATTERN,
  isNameValid as validateName,
  isPhoneValid as validatePhone,
  isEmailValid as validateEmail,
  normalize,
} from "../utils/validation"
import { SERVICE_OPTIONS } from "../data/services"
import { WEB_SERVICE_ID, CURRENCY_SYMBOL, ANNUAL_DISCOUNT_RATE } from "../lib/constants/web"
import { buildServiceLabel } from "../utils/budgetCalculations"
import { generateId } from "../utils/id"

const BudgetPage = () => {
  const navigate = useNavigate()
  const [clientName, setClientName] = useState("")
  const [clientPhone, setClientPhone] = useState("")
  const [clientEmail, setClientEmail] = useState("")
  const [budgets, setBudgets] = useState<SavedBudget[]>([])

  const {
    selectedServices,
    toggleService,
    resetSelections,
    isAnnualBilling,
    toggleBillingCycle,
    servicePriceMap,
    pricing,
    webConfig,
  } = useBudgetCalculator({ discountRate: ANNUAL_DISCOUNT_RATE })

  const { webBasePrice, webExtraPrice, webTotalPrice, totalAmount } = pricing
  const { pages: webPages, languages: webLanguages, setPages, setLanguages } = webConfig

  const trimmedName = normalize(clientName)
  const trimmedPhone = normalize(clientPhone)
  const trimmedEmail = normalize(clientEmail)
  const isNameValid = validateName(trimmedName)
  const isPhoneValid = validatePhone(trimmedPhone)
  const isEmailValid = validateEmail(trimmedEmail)

  const handleBudgetSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (
      !isNameValid ||
      !isPhoneValid ||
      !isEmailValid ||
      selectedServices.length === 0 ||
      totalAmount === 0
    ) {
      return
    }

    const billingCycle: BillingCycle = isAnnualBilling ? "annual" : "monthly"

    const newBudget: SavedBudget = {
      id: generateId(),
      clientName: trimmedName,
      phone: trimmedPhone,
      email: trimmedEmail,
      services: selectedServices.map((serviceId) => buildServiceLabel(serviceId, webPages, webLanguages)),
      total: totalAmount,
      createdAt: new Date().toISOString(),
      billingCycle,
      discountRate: isAnnualBilling ? ANNUAL_DISCOUNT_RATE : 0,
    }

    setBudgets((current) => [newBudget, ...current])
    setClientName("")
    setClientPhone("")
    setClientEmail("")
    resetSelections()
  }

  const isSubmitDisabled =
    !isNameValid || !isPhoneValid || !isEmailValid || selectedServices.length === 0 || totalAmount === 0

  return (
    <main className="budget-page">
      <h1 className="budget-page__title">Calculadora de presupuesto</h1>

      <ServiceSelectionSection
        services={SERVICE_OPTIONS}
        selectedServices={selectedServices}
        onToggleService={toggleService}
        webServiceId={WEB_SERVICE_ID}
        webConfig={{
          pages: webPages,
          languages: webLanguages,
          onPagesChange: setPages,
          onLanguagesChange: setLanguages,
          basePrice: webBasePrice,
          extraPrice: webExtraPrice,
          totalPrice: webTotalPrice,
        }}
        currencySymbol={CURRENCY_SYMBOL}
        totalAmount={totalAmount}
        isAnnualBilling={isAnnualBilling}
        onToggleAnnualBilling={toggleBillingCycle}
        discountRate={ANNUAL_DISCOUNT_RATE}
        servicePriceMap={servicePriceMap}
      />

      <BudgetRequestSection
        clientName={clientName}
        clientPhone={clientPhone}
        clientEmail={clientEmail}
        onClientNameChange={setClientName}
        onClientPhoneChange={(value) => setClientPhone(value.replace(/\D/g, ""))}
        onClientEmailChange={setClientEmail}
        onSubmit={handleBudgetSubmit}
        isSubmitDisabled={isSubmitDisabled}
        namePattern={NAME_PATTERN}
        phonePattern={PHONE_PATTERN}
        emailPattern={EMAIL_PATTERN}
      />

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
