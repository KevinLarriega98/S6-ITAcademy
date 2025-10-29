import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { expect, test } from "vitest"
import ServiceSelectionSection from "./ServiceSelectionSection"
import { SERVICE_OPTIONS, WEB_BASE_PRICE } from "../data/services"
import { useBudgetCalculator } from "../hooks/useBudgetCalculator"
import { ANNUAL_DISCOUNT_RATE, WEB_SERVICE_ID } from "../lib/constants/pricingConstants"

type ServicePrice = {
  id: string
  title: string
  amount: number
}

const monthlyPrices: ServicePrice[] = [
  { id: "seo", title: "SEO", amount: 300 },
  { id: "ads", title: "Ads", amount: 400 },
  { id: "web", title: "Web", amount: 500 },
]

const annualPrices: ServicePrice[] = [
  { id: "seo", title: "SEO", amount: 240 },
  { id: "ads", title: "Ads", amount: 320 },
  { id: "web", title: "Web", amount: 400 },
]

const mapToString = (prices: ServicePrice[]) => prices.map(({ id, amount }) => `${id}:${amount}`).join(",")

const TestConfigurator = () => {
  const calculator = useBudgetCalculator({
    services: SERVICE_OPTIONS,
    webServiceId: WEB_SERVICE_ID,
    webBasePrice: WEB_BASE_PRICE,
    discountRate: ANNUAL_DISCOUNT_RATE,
  })

  const { pages, languages, setPages, setLanguages } = calculator.webConfig
  const { webBasePrice, webExtraPrice, webTotalPrice, totalAmount } = calculator.pricing

  const priceMapString = Array.from(calculator.servicePriceMap.entries())
    .map(([id, value]) => `${id}:${value}`)
    .join(",")

  return (
    <>
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
          currencySymbol: "",
          totalAmount,
          servicePriceMap: calculator.servicePriceMap,
        }}
        billingState={{
          isAnnualBilling: calculator.isAnnualBilling,
          toggleAnnualBilling: calculator.toggleBillingCycle,
          discountRate: calculator.discountRate,
        }}
      />
      <div data-testid="price-map">{priceMapString}</div>
    </>
  )
}

const getCardPriceText = (title: string) => {
  const card = screen.getByRole("heading", { name: title }).closest("article")
  const price = card?.querySelector(".service-card__price")?.textContent ?? ""
  return price.trim()
}

const getPriceMapString = () => screen.getByTestId("price-map").textContent ?? ""

/**
 * Scenario: toggle billing applies and removes the annual discount
 * Given the monthly prices are visible
 * When the user switches to annual billing
 * Then all service prices and the internal map reflect the 20% discount
 * And switching back to monthly restores the original values
 */
test("toggle billing applies and removes the annual discount", async () => {
  const user = userEvent.setup()
  render(<TestConfigurator />)

  monthlyPrices.forEach(({ title, amount }) => {
    expect(getCardPriceText(title)).toContain(String(amount))
  })
  expect(getPriceMapString()).toBe(mapToString(monthlyPrices))

  await user.click(screen.getByRole("button", { name: /Cambiar a pago anual/i }))

  annualPrices.forEach(({ title, amount }) => {
    expect(getCardPriceText(title)).toContain(String(amount))
  })
  expect(getPriceMapString()).toBe(mapToString(annualPrices))

  await user.click(screen.getByRole("button", { name: /Cambiar a pago mensual/i }))

  monthlyPrices.forEach(({ title, amount }) => {
    expect(getCardPriceText(title)).toContain(String(amount))
  })
  expect(getPriceMapString()).toBe(mapToString(monthlyPrices))
})