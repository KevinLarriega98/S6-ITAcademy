import "./WebConfigurator.css"

type WebConfiguratorProps = {
  pages: number
  languages: number
  onPagesChange: (value: number) => void
  onLanguagesChange: (value: number) => void
  basePrice: number
  extraPrice: number
}

const MIN_VALUE = 0
const CURRENCY_SYMBOL = "€"

type CounterControlProps = {
  label: string
  value: number
  onChange: (value: number) => void
}

const CounterControl = ({ label, value, onChange }: CounterControlProps) => {
  const increase = () => onChange(value + 1)
  const decrease = () => onChange(Math.max(MIN_VALUE, value - 1))

  return (
    <div className="web-configurator__control">
      <span>{label}</span>
      <div className="web-configurator__counter">
        <button type="button" onClick={decrease} aria-label={`Reducir ${label}`}>
          -
        </button>
        <span>{value}</span>
        <button type="button" onClick={increase} aria-label={`Aumentar ${label}`}>
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
  return (
    <div className="web-configurator">
      <p className="web-configurator__helper">
        Ajusta el número de páginas e idiomas para personalizar tu presupuesto.
      </p>
      <dl className="web-configurator__totals">
        <div>
          <dt>Importe base</dt>
          <dd>{`${basePrice} ${CURRENCY_SYMBOL}`}</dd>
        </div>
        <div>
          <dt>Extra por configuración</dt>
          <dd>{`${extraPrice} ${CURRENCY_SYMBOL}`}</dd>
        </div>
        <div className="web-configurator__totals-item--highlight">
          <dt>Total servicio web</dt>
          <dd>{`${basePrice + extraPrice} ${CURRENCY_SYMBOL}`}</dd>
        </div>
      </dl>

      <div className="web-configurator__controls">
        <CounterControl label="Número de páginas" value={pages} onChange={onPagesChange} />
        <CounterControl label="Número de idiomas" value={languages} onChange={onLanguagesChange} />
      </div>
    </div>
  )
}

export default WebConfigurator