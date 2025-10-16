import { useState } from "react"
import type { FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import ServiceSelectionSection from "../components/ServiceSelectionSection"
import BudgetRequestSection from "../components/BudgetRequestSection"
import BudgetListSection from "../components/BudgetListSection"
import type { SavedBudget, ServiceOption } from "../types/budget"
import "./BudgetPage.css"

const SERVICE_OPTIONS: ServiceOption[] = [
  {
    id: "seo",
    title: "Seo",
    description: "Programación de una web responsive completa",
    price: 300,
  },
  {
    id: "ads",
    title: "Ads",
    description: "Programación de una web responsive completa",
    price: 400,
  },
  {
    id: "web",
    title: "Web",
    description: "Programación de una web responsive completa",
    price: 500,
  },
]

const WEB_SERVICE_ID = "web"
const WEB_CONFIGURATION_UNIT_PRICE = 30
const WEB_BASE_PRICE = SERVICE_OPTIONS.find((service) => service.id === WEB_SERVICE_ID)?.price ?? 0
const CURRENCY_SYMBOL = "€"
const NAME_PATTERN = "^[A-Za-zÀ-ÿ]{2,}(?:\\s[A-Za-zÀ-ÿ]+)*$"
const PHONE_PATTERN = "^\\d{9}$"
const EMAIL_PATTERN = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$"
const NAME_REGEX = new RegExp(NAME_PATTERN, "u")
const PHONE_REGEX = new RegExp(PHONE_PATTERN)
const EMAIL_REGEX = new RegExp(EMAIL_PATTERN)

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

  const buildServiceLabel = (serviceId: string, pages: number, languages: number) => {
    if (serviceId === WEB_SERVICE_ID) {
      const pagesLabel = `${pages} ${pages === 1 ? "página" : "páginas"}`
      const languagesLabel = `${languages} ${languages === 1 ? "idioma" : "idiomas"}`
      return `Web (${pagesLabel} y ${languagesLabel})`
    }

    const service = SERVICE_OPTIONS.find((item) => item.id === serviceId)
    return service?.title ?? serviceId
  }

  const calculateTotalAmount = (services: string[], webTotal: number) =>
    services.reduce((amount, serviceId) => {
      if (serviceId === WEB_SERVICE_ID) {
        return amount + webTotal
      }

      const service = SERVICE_OPTIONS.find((item) => item.id === serviceId)
      return service ? amount + service.price : amount
    }, 0)

  const totalAmount = calculateTotalAmount(selectedServices, webTotalPrice)
  const trimmedName = clientName.trim()
  const trimmedPhone = clientPhone.trim()
  const trimmedEmail = clientEmail.trim()
  const isNameValid = NAME_REGEX.test(trimmedName)
  const isPhoneValid = PHONE_REGEX.test(trimmedPhone)
  const isEmailValid = EMAIL_REGEX.test(trimmedEmail)

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
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
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
