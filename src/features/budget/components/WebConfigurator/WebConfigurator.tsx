import "./WebConfigurator.css"
import { useState } from "react"
import HelpModal from "../../../../shared/components/HelpModal/HelpModal"
import { CURRENCY_SYMBOL } from "../../constants/pricingConstants"
import { CounterControl } from "./counter/CounterControl"
import { useWebConfiguratorHelp } from "../../hooks/useWebConfiguratorHelp"

type WebConfiguratorProps = {
  pages: number
  languages: number
  onPagesChange: (value: number) => void
  onLanguagesChange: (value: number) => void
  basePrice: number
  extraPrice: number
}

const WebConfigurator = ({
  pages,
  languages,
  onPagesChange,
  onLanguagesChange,
  basePrice,
  extraPrice,
}: WebConfiguratorProps) => {
  const [helpTopic, setHelpTopic] = useState<"pages" | "languages" | null>(null)
  const { topicInfo, openHelp, closeHelp, modalTitle } = useWebConfiguratorHelp(helpTopic, setHelpTopic)
  const total = basePrice + extraPrice

  return (
    <div className="web-configurator">
      <p className="web-configurator__helper">
        Ajusta el número de páginas y lenguajes para personalizar tu presupuesto.
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
        <CounterControl
          label="Número de páginas"
          value={pages}
          onChange={onPagesChange}
          onHelp={openHelp("pages")}
        />
        <CounterControl
          label="Número de lenguajes"
          value={languages}
          onChange={onLanguagesChange}
          onHelp={openHelp("languages")}
        />
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