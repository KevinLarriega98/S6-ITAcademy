import "@testing-library/jest-dom/vitest"
import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { expect, test } from "vitest"
import ServiceSelectionSection from "./ServiceSelectionSection"
import { SERVICE_OPTIONS, WEB_BASE_PRICE } from "../data/services"
import { useBudgetCalculator } from "../hooks/useBudgetCalculator"
import {
  ANNUAL_DISCOUNT_RATE,
  CURRENCY_SYMBOL,
  WEB_SERVICE_ID,
} from "../lib/constants/pricingConstants"

const TotalLabel = /Presupuesto total:/i
const WebSummaryLabel = /Total servicio web/i

const TestConfigurator = () => {
  const calculator = useBudgetCalculator({
    services: SERVICE_OPTIONS,
    webServiceId: WEB_SERVICE_ID,
    webBasePrice: WEB_BASE_PRICE,
    discountRate: ANNUAL_DISCOUNT_RATE,
  })

  const { pages, languages, setPages, setLanguages } = calculator.webConfig
  const { webBasePrice, webExtraPrice, webTotalPrice, totalAmount } = calculator.pricing

  return (
    <ServiceSelectionSection
      services={SERVICE_OPTIONS}
      selectionState={{
        selectedServices: calculator.selectedServices,
        toggleService: calculator.toggleService,
        webServiceId: WEB_SERVICE_ID,
        webConfig: {
          pages,
          languages,
          onPagesChange: setPages,
          onLanguagesChange: setLanguages,
          basePrice: webBasePrice,
          extraPrice: webExtraPrice,
          totalPrice: webTotalPrice,
        },
      }}
      priceInfo={{
        currencySymbol: CURRENCY_SYMBOL,
        totalAmount,
        servicePriceMap: calculator.servicePriceMap,
      }}
      billingState={{
        isAnnualBilling: calculator.isAnnualBilling,
        toggleAnnualBilling: calculator.toggleBillingCycle,
        discountRate: calculator.discountRate,
      }}
    />
  )
}

const getCheckbox = (title: string) => {
  const headings = screen.getAllByRole("heading", { name: title })
  const card = headings[headings.length - 1]?.closest("article")
  if (!card) throw new Error(`Service card not found: ${title}`)
  return within(card).getByRole("checkbox")
}

const getServiceCard = (title: string) => {
  const headings = screen.getAllByRole("heading", { name: title })
  const card = headings[headings.length - 1]?.closest("article")
  if (!card) throw new Error(`Service card not found: ${title}`)
  return card
}

const getSummaryElement = () => {
  const labels = screen.getAllByText(TotalLabel)
  const label = labels[labels.length - 1]
  return label?.closest("strong")
}

const expectTotal = (value: number) => {
  const summary = getSummaryElement()
  if (!summary) throw new Error("Budget summary not found")
  expect(summary).toHaveTextContent(`Presupuesto total:${value} ${CURRENCY_SYMBOL}`)
}

const expectConfiguratorVisible = (visible: boolean) => {
  const webCard = getServiceCard("Web")
  const matcher = WebSummaryLabel
  const query = within(webCard).queryByText(matcher)
  visible ? expect(query).toBeInTheDocument() : expect(query).toBeNull()
}

test("select services updates total and shows configurator", async () => {
  const user = userEvent.setup()
  render(<TestConfigurator />)

  await user.click(getCheckbox("SEO"))
  expectTotal(300)

  await user.click(getCheckbox("Ads"))
  expectTotal(700)

  await user.click(getCheckbox("Web"))
  expectTotal(1200)
  expectConfiguratorVisible(true)
})

test("deselect services resets total and hides configurator", async () => {
  const user = userEvent.setup()
  render(<TestConfigurator />)

  await user.click(getCheckbox("SEO"))
  await user.click(getCheckbox("Ads"))
  await user.click(getCheckbox("Web"))
  expectTotal(1200)

  await user.click(getCheckbox("Web"))
  expectTotal(700)
  expectConfiguratorVisible(false)

  await user.click(getCheckbox("Ads"))
  expectTotal(300)

  await user.click(getCheckbox("SEO"))
  expectTotal(0)
})