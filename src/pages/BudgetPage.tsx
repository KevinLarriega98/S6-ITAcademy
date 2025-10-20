import { useState, useMemo } from "react"
import type { FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import ServiceSelectionSection from "../components/ServiceSelectionSection"
import BudgetRequestSection from "../components/BudgetRequestSection"
import BudgetListSection from "../components/BudgetListSection"
import type { SavedBudget } from "../types/budget"
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
import { SERVICE_OPTIONS, WEB_BASE_PRICE } from "../data/services"
import { WEB_SERVICE_ID, WEB_CONFIGURATION_UNIT_PRICE, CURRENCY_SYMBOL } from "../constants/web"
import { buildServiceLabel, calculateTotalAmount } from "../utils/budget"
import { generateId } from "../utils/id"

const BudgetPage = () => {
  const navigate = useNavigate()
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [webPages, setWebPages] = useState(0)
  const [webLanguages, setWebLanguages] = useState(0)
  const [clientName, setClientName] = useState("")
  const [clientPhone, setClientPhone] = useState("")
  const [clientEmail, setClientEmail] = useState("")
  const [budgets, setBudgets] = useState<SavedBudget[]>([])

  const toggleService = (serviceId: string) => {
    setSelectedServices((current) =>
      current.includes(serviceId)
        ? current.filter((id) => id !== serviceId)
        : [...current, serviceId],
    )
  }

  const calculateWebExtraPrice = (pages: number, languages: number) =>
    (pages + languages) * WEB_CONFIGURATION_UNIT_PRICE

  const webExtraPrice = calculateWebExtraPrice(webPages, webLanguages)
  const webTotalPrice = WEB_BASE_PRICE + webExtraPrice

  const totalAmount = useMemo(() => calculateTotalAmount(selectedServices, webTotalPrice), [selectedServices, webTotalPrice])
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

    const newBudget: SavedBudget = {
      id: generateId(),
      clientName: trimmedName,
      phone: trimmedPhone,
      email: trimmedEmail,
      services: selectedServices.map((serviceId) => buildServiceLabel(serviceId, webPages, webLanguages)),
      total: totalAmount,
    }

    setBudgets((current) => [newBudget, ...current])
    setClientName("")
    setClientPhone("")
    setClientEmail("")
    setSelectedServices([])
    setWebPages(0)
    setWebLanguages(0)
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
          onPagesChange: setWebPages,
          onLanguagesChange: setWebLanguages,
          basePrice: WEB_BASE_PRICE,
          extraPrice: webExtraPrice,
          totalPrice: webTotalPrice,
        }}
        currencySymbol={CURRENCY_SYMBOL}
        totalAmount={totalAmount}
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
        <button type="button" onClick={() => navigate("/")}>
          Volver al inicio
        </button>
      </footer>
    </main>
  )
}

export default BudgetPage