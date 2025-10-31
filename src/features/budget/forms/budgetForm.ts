export type BudgetFormFieldKey = "name" | "phone" | "email"

export type BudgetFormValues = Record<BudgetFormFieldKey, string>
export type BudgetFormValidity = Record<BudgetFormFieldKey, boolean>

export type BudgetFormField = {
  key: BudgetFormFieldKey
  label: string
  placeholder: string
  type: "text" | "tel" | "email"
  title: string
  required: boolean
  pattern?: string
  inputMode?: "numeric" | "email"
  autoComplete?: string
}

const PHONE_PATTERN = "\\d{9}"
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const budgetFormFields: BudgetFormField[] = [
  {
    key: "name",
    label: "Nombre",
    placeholder: "Nombre",
    type: "text",
    title: "Introduce al menos dos letras.",
    required: true,
    autoComplete: "name",
  },
  {
    key: "phone",
    label: "Teléfono",
    placeholder: "Teléfono",
    type: "tel",
    title: "Introduce un número de teléfono de 9 dígitos.",
    required: true,
    pattern: PHONE_PATTERN,
    inputMode: "numeric",
    autoComplete: "tel",
  },
  {
    key: "email",
    label: "Correo electrónico",
    placeholder: "Correo electrónico",
    type: "email",
    title: "Introduce un correo electrónico válido (p. ej., nombre@dominio.com).",
    required: true,
    inputMode: "email",
    autoComplete: "email",
  },
]

export const createBudgetFormValues = (): BudgetFormValues => ({
  name: "",
  phone: "",
  email: "",
})

export const validateBudgetForm = (values: BudgetFormValues): BudgetFormValidity => ({
  name: values.name.trim().length >= 2,
  phone: /^\d{9}$/.test(values.phone),
  email: emailRegex.test(values.email.trim()),
})

export const isBudgetFormValid = (validity: BudgetFormValidity) =>
  Object.values(validity).every(Boolean)