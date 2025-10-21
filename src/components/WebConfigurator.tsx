import "./WebConfigurator.css"
import HelpModal from "./HelpModal"
import { useState } from "react"
import { CURRENCY_SYMBOL } from "../constants/web"

type WebConfiguratorProps = {
  pages: number
  languages: number
  onPagesChange: (value: number) => void
  onLanguagesChange: (value: number) => void
  basePrice: number
  extraPrice: number
}

type HelpTopic = "pages" | "languages"

const MIN_VALUE = 0

const getTopicText = (topic: HelpTopic | null) => {
  if (topic === "pages") {
    return { plural: "páginas", singular: "página", articlePlural: "las" }
  }

  if (topic === "languages") {
    return { plural: "idiomas", singular: "idioma", articlePlural: "los" }
  }

  return null
}

type CounterControlProps = {
  label: string
  value: number
  onChange: (value: number) => void
  onHelp?: () => void
}

const CounterControl = ({ label, value, onChange, onHelp }: CounterControlProps) => {
  const increase = () => onChange(value + 1)
  const decrease = () => onChange(Math.max(MIN_VALUE, value - 1))

  return (
    <div className="web-configurator__control">
      <div className="web-configurator__label">
        {onHelp && (
          <button type="button" className="btn btn-circle web-configurator__info-button" onClick={onHelp}>
            i
          </button>
        )}
        <span>{label}</span>
      </div>

      <div className="web-configurator__counter">
        <button
          type="button"
          className="btn btn-circle web-configurator__counter-button"
          onClick={decrease}
          aria-label={`Reducir ${label}`}
          disabled={value <= MIN_VALUE}
        >
          -
        </button>
        <span>{value}</span>
        <button
          type="button"
          className="btn btn-circle web-configurator__counter-button"
          onClick={increase}
          aria-label={`Aumentar ${label}`}
        >
          +
        </button>
      </div>
    </div>
  )
}

const WebConfigurator = ({
  pages,
  languages,
  onPagesChange,
  onLanguagesChange,
  basePrice,
  extraPrice,
}: WebConfiguratorProps) => {
  const [helpTopic, setHelpTopic] = useState<HelpTopic | null>(null)
  const total = basePrice + extraPrice

  const openHelp = (topic: HelpTopic) => () => setHelpTopic(topic)
  const closeHelp = () => setHelpTopic(null)

  const topicInfo = getTopicText(helpTopic)
  const modalTitle = topicInfo ? `Número de ${topicInfo.plural}` : undefined

  return (
    <div className="web-configurator">
      <p className="web-configurator__helper">
        Ajusta el número de páginas e idiomas para personalizar tu presupuesto.
      </p>

      <dl className="web-configurator__totals">
        <div className="web-configurator__totals-group">
          <dt>Importe base</dt>
          <dd>{`${basePrice} ${CURRENCY_SYMBOL}`}</dd>
        </div>
        <div className="web-configurator__totals-group">
          <dt>Extra por configuración</dt>
          <dd>{`${extraPrice} ${CURRENCY_SYMBOL}`}</dd>
        </div>
        <div className="web-configurator__totals-group web-configurator__totals-item--highlight">
          <dt>Total servicio web</dt>
          <dd>{`${total} ${CURRENCY_SYMBOL}`}</dd>
        </div>
      </dl>

      <div className="web-configurator__controls">
        <CounterControl label="Número de páginas" value={pages} onChange={onPagesChange} onHelp={openHelp("pages")} />
        <CounterControl label="Número de idiomas" value={languages} onChange={onLanguagesChange} onHelp={openHelp("languages")} />
      </div>

      <HelpModal open={helpTopic !== null} title={modalTitle} onClose={closeHelp}>
        {topicInfo && (
          <>
            <p>{`Agrega ${topicInfo.articlePlural} ${topicInfo.plural} que tendrá tu proyecto.`}</p>
            <p>{`El coste de cada ${topicInfo.singular} es de 30 ${CURRENCY_SYMBOL}.`}</p>
          </>
        )}
      </HelpModal>
    </div>
  )
}

export default WebConfigurator