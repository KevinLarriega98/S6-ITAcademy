import "@testing-library/jest-dom/vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useState } from "react"
import { expect, test } from "vitest"
import WebConfigurator from "./WebConfigurator"
import { WEB_CONFIGURATION_UNIT_PRICE } from "../../constants/pricingConstants"
import { calculateWebExtraPrice } from "../../utils/budgetPricing"

const BASE_PRICE = 500

const TestConfigurator = () => {
  const state = useWebConfigState()

  return (
    <WebConfigurator
      pages={state.pages}
      languages={state.languages}
      onPagesChange={state.setPages}
      onLanguagesChange={state.setLanguages}
      basePrice={BASE_PRICE}
      extraPrice={state.extraPrice}
    />
  )
}

const useWebConfigState = () => {
  const [pages, setPages] = useState(0)
  const [languages, setLanguages] = useState(0)
  const extraPrice = calculateWebExtraPrice(pages, languages)

  return { pages, languages, setPages, setLanguages, extraPrice }
}

const getExtraAmount = () => {
  const extraTerm = screen.getByText(/Extra por configuración/i)
  const extraValue = extraTerm.parentElement?.querySelector("dd")?.textContent ?? ""
  return Number(extraValue.split(" ")[0])
}

const getTotalAmount = () => {
  const totalTerm = screen.getByText(/Total servicio web/i)
  const totalValue = totalTerm.parentElement?.querySelector("dd")?.textContent ?? ""
  return Number(totalValue.split(" ")[0])
}

const getControls = () => {
  const increaseButtons = screen.getAllByRole("button", { name: /Aumentar/i })
  const decreaseButtons = screen.getAllByRole("button", { name: /Reducir/i })

  return {
    increasePages: increaseButtons[0],
    increaseLanguages: increaseButtons[1],
    decreasePages: decreaseButtons[0],
    decreaseLanguages: decreaseButtons[1],
  }
}

/**
 * Scenario: the web configurator updates the extra price in steps of 30 €
 * Given the configurator starts with 0 pages and 0 languages
 * When the user increases and decreases the counters
 * Then the extra price and the total change in 30 € increments and never drop below 0
 */
test("adjust web configurator updates prices in steps of 30", async () => {
  const user = userEvent.setup()
  render(<TestConfigurator />)

  const expectAmountsForUnits = (unitCount: number) => {
    const extra = unitCount * WEB_CONFIGURATION_UNIT_PRICE
    expect(getExtraAmount()).toBe(extra)
    expect(getTotalAmount()).toBe(BASE_PRICE + extra)
  }

  expectAmountsForUnits(0)

  await user.click(getControls().increasePages)
  expectAmountsForUnits(1)

  await user.click(getControls().increaseLanguages)
  expectAmountsForUnits(2)

  await user.click(getControls().decreaseLanguages)
  expectAmountsForUnits(1)

  await user.click(getControls().decreasePages)
  expectAmountsForUnits(0)

  const finalDecrease = getControls().decreasePages
  expect(finalDecrease).toBeDisabled()
  await user.click(finalDecrease)
  expectAmountsForUnits(0)
})