import "./CounterControl.css"

const MIN_VALUE = 0

type CounterControlProps = {
  label: string
  value: number
  onChange: (value: number) => void
  onHelp?: () => void
}

export const CounterControl = ({ label, value, onChange, onHelp }: CounterControlProps) => {
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