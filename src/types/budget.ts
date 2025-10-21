export type ServiceOption = {
  id: string
  title: string
  description: string
  price: number
}

export type SavedBudget = {
  id: string
  clientName: string
  phone: string
  email: string
  services: string[]
  total: number
  createdAt: string
}