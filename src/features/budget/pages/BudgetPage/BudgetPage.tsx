import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import ServiceSelectionSection from "../../components/ServiceSelectionSection/ServiceSelectionSection"
import BudgetRequestSection from "../../components/BudgetRequestSection/BudgetRequestSection"
import BudgetListSection from "../../components/BudgetListSection/BudgetListSection"
import { SERVICE_OPTIONS, WEB_BASE_PRICE } from "../../data/services"
import { WEB_SERVICE_ID, CURRENCY_SYMBOL, ANNUAL_DISCOUNT_RATE } from "../../constants/pricingConstants"
import { useBudgetQueryParams } from "../../hooks/useBudgetQueryParams"
import { useBudgetPageController } from "../../hooks/useBudgetPageController"
import "./BudgetPage.css"

const BudgetPage = () => {
  const navigate = useNavigate()
  const { queryState, replaceQuery, queryString } = useBudgetQueryParams(SERVICE_OPTIONS, WEB_SERVICE_ID)
  const initialQueryStateRef = useRef(queryState)

  const { selection, form, budgets } = useBudgetPageController({
    services: SERVICE_OPTIONS,
    webServiceId: WEB_SERVICE_ID,
    webBasePrice: WEB_BASE_PRICE,
    discountRate: ANNUAL_DISCOUNT_RATE,
    initialSelectedServices: initialQueryStateRef.current.selectedServices,
    initialWebPages: initialQueryStateRef.current.webPages,
    initialWebLanguages: initialQueryStateRef.current.webLanguages,
    initialIsAnnualBilling: initialQueryStateRef.current.isAnnualBilling,
    urlSync: {
      queryState,
      queryString,
      replaceQuery,
      services: SERVICE_OPTIONS,
    },
  })

  return (
    <main className="budget-page">
      <h1 className="budget-page__title">Calculadora de presupuesto</h1>

      <ServiceSelectionSection
        services={SERVICE_OPTIONS}
        controller={selection}
        webServiceId={WEB_SERVICE_ID}
        currencySymbol={CURRENCY_SYMBOL}
      />

      <BudgetRequestSection form={form} />

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
