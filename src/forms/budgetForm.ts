import {
  EMAIL_PATTERN,
  NAME_PATTERN,
  PHONE_PATTERN,
  normalize as normalizeValue,
  isEmailValid,
  isNameValid,
  isPhoneValid,
} from "../utils/validation"

export type BudgetFormFieldKey = "name" | "phone" | "email"

export type BudgetFormValues = Record<BudgetFormFieldKey, string>

export type BudgetFormValidity = Record<BudgetFormFieldKey, boolean>

type BudgetFormCommonField = {
  key: BudgetFormFieldKey
  label: string
  placeholder: string
  type: "text" | "tel" | "email"
  pattern: string
  title: string
  inputMode?: "numeric" | "email"
  autoComplete?: string
  required?: boolean
  sanitize?: (value: string) => string
}

export type BudgetFormField = BudgetFormCommonField

export const budgetFormFields: BudgetFormField[] = [
  {
    key: "name",
    label: "Nombre",
    placeholder: "Nombre",
    type: "text",
    pattern: NAME_PATTERN,
    title: "Introduce al menos dos letras. No se permiten números.",
    autoComplete: "name",
    required: true,
  },
  {
    key: "phone",
    label: "Teléfono",
    placeholder: "Teléfono",
    type: "tel",
    pattern: PHONE_PATTERN,
    title: "Introduce un número de teléfono de 9 dígitos.",
    inputMode: "numeric",
    autoComplete: "tel",
    required: true,
    sanitize: (value: string) => value.replace(/\D/g, ""),
  },
  {
    key: "email",
    label: "Correo electrónico",
    placeholder: "Correo electrónico",
    type: "email",
    pattern: EMAIL_PATTERN,
    title: "Introduce un correo electrónico válido (por ejemplo, nombre@dominio.com).",
    inputMode: "email",
    autoComplete: "email",
    required: true,
  },
]

export const createBudgetFormValues = (): BudgetFormValues => ({
  name: "",
  phone: "",
  email: "",
})

export const normalizeBudgetFormValues = (values: BudgetFormValues): BudgetFormValues => ({
  name: normalizeValue(values.name),
  phone: normalizeValue(values.phone),
  email: normalizeValue(values.email),
})

export const validateBudgetForm = (values: BudgetFormValues): BudgetFormValidity => ({
  name: isNameValid(values.name),
  phone: isPhoneValid(values.phone),
  email: isEmailValid(values.email),
})

export const isBudgetFormValid = (validity: BudgetFormValidity) =>
  Object.values(validity).every(Boolean)