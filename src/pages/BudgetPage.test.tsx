import "@testing-library/jest-dom/vitest"
import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom"
import { expect, test } from "vitest"
import BudgetPage from "./BudgetPage"

const renderBudgetPage = () =>
  render(
    <MemoryRouter initialEntries={["/budget"]}>
      <BudgetPage />
    </MemoryRouter>,
  )

const getServiceCheckbox = (title: string) => {
  const card = screen.getByRole("heading", { name: title }).closest("article")
  if (!card) throw new Error(`Service card not found: ${title}`)
  return within(card).getByRole("checkbox")
}

/**
 * Scenario: valid form data and one selected service enable the submit button
 * Given the request form starts vacío
 * When the user fills all fields con valores válidos y marca un servicio
 * Then el botón de envío pasa a estar habilitado
 */
test("valid inputs and a selected service enable submit button", async () => {
  const user = userEvent.setup()
  renderBudgetPage()

  const nameInput = screen.getByPlaceholderText(/nombre/i)
  const phoneInput = screen.getByPlaceholderText(/tel/i)
  const emailInput = screen.getByPlaceholderText(/correo/i)
  const submitButton = screen.getByRole("button", { name: /Solicitar presupuesto/i })

  expect(submitButton).toBeDisabled()

  await user.type(nameInput, "Kevin Larriega")
  await user.type(phoneInput, "123456789")
  await user.type(emailInput, "kevin@example.com")

  expect(submitButton).toBeDisabled()

  await user.click(getServiceCheckbox("SEO"))

  expect(submitButton).toBeEnabled()
})