import { useEffect } from "react"
import "./HelpModal.css"

type HelpModalProps = {
  open: boolean
  title?: string
  children?: React.ReactNode
  onClose: () => void
}

const HelpModal = ({ open, title, children, onClose }: HelpModalProps) => {
  useEffect(() => {
    if (!open) {
      document.body.style.overflow = ""
      return
    }

    document.body.style.overflow = "hidden"

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        onClose()
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  if (!open) {
    return null
  }

  return (
    <div
      className="help-modal__backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="help-modal-title"
      onClick={onClose}
    >
      <div
        className="help-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="help-modal__header">
          <h2 id="help-modal-title">{title ?? "Help"}</h2>
          <button
            type="button"
            className="btn btn-circle help-modal__close"
            aria-label="Cerrar ayuda"
            onClick={onClose}
          >
            &times;
          </button>
        </header>

        <div className="help-modal__body">{children}</div>

        <footer className="help-modal__footer">
          <button type="button" className="btn help-modal__ok" onClick={onClose}>
            OK
          </button>
        </footer>
      </div>
    </div>
  )
}

export default HelpModal