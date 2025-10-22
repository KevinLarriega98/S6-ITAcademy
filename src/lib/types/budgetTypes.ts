export type ServiceOption = {
  id: string
  title: string
  description: string
  price: number
}

export type BillingCycle = "monthly" | "annual"

export type SavedBudget = {
  id: string
  clientName: string
  phone: string
  email: string
  services: string[]
  total: number
  createdAt: string
  billingCycle: BillingCycle
  discountRate: number
}
