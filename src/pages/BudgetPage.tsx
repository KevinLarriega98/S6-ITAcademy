import { useState } from "react"
import { useNavigate } from "react-router-dom"
import WebConfigurator from "../components/WebConfigurator"
import "./BudgetPage.css"

type ServiceOption = {
  id: string
  title: string
  description: string
  price: number
}

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

const BudgetPage = () => {
  const navigate = useNavigate()
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [webPages, setWebPages] = useState(0)
  const [webLanguages, setWebLanguages] = useState(0)

  const toggleService = (serviceId: string) => {
    setSelectedServices((current) =>
      current.includes(serviceId)
        ? current.filter((id) => id !== serviceId)
        : [...current, serviceId],
    )
  }

  const isSelected = (serviceId: string) => selectedServices.includes(serviceId)

  const webExtraPrice = (webPages + webLanguages) * WEB_CONFIGURATION_UNIT_PRICE
  const webTotalPrice = WEB_BASE_PRICE + webExtraPrice

  let totalAmount = 0
  selectedServices.forEach((serviceId) => {
    if (serviceId === WEB_SERVICE_ID) {
      totalAmount += webTotalPrice
      return
    }

    const service = SERVICE_OPTIONS.find((item) => item.id === serviceId)
    if (service) {
      totalAmount += service.price
    }
  })

  return (
    <main className="budget-page">
      <h1 className="budget-page__title">Calculadora de presupuesto</h1>

      <section className="service-list">
        {SERVICE_OPTIONS.map((service) => {
          const selected = isSelected(service.id)
          const displayPrice = service.id === WEB_SERVICE_ID ? webTotalPrice : service.price

          return (
            <article
              key={service.id}
              className={`service-card${selected ? " service-card--selected" : ""}`}
            >
              <div className="service-card__row">
                <h2 className="service-card__title">{service.title}</h2>
                <strong className="service-card__price">{`${displayPrice} ${CURRENCY_SYMBOL}`}</strong>
              </div>

              <div className="service-card__row service-card__row--bottom">
                <p className="service-card__description">{service.description}</p>
                <label className="service-card__action">
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => toggleService(service.id)}
                  />
                  <span>Añadir</span>
                </label>
              </div>

              {selected && service.id === WEB_SERVICE_ID && (
                <WebConfigurator
                  pages={webPages}
                  languages={webLanguages}
                  onPagesChange={setWebPages}
                  onLanguagesChange={setWebLanguages}
                  basePrice={WEB_BASE_PRICE}
                  extraPrice={webExtraPrice}
                />
              )}
            </article>
          )
        })}
      </section>

      <section className="budget-summary">
        <strong className="budget-summary__value">
          <span className="budget-summary__label">Presupuesto total:</span>
          {`${totalAmount} ${CURRENCY_SYMBOL}`}
        </strong>
      </section>

      <footer className="budget-page__footer">
        <button type="button" onClick={() => navigate("/")}>
          Volver al inicio
        </button>
      </footer>
    </main>
  )
}

export default BudgetPage