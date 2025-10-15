import { useNavigate } from "react-router-dom"
import "./WelcomePage.css"

const WelcomePage = () => {
  const navigate = useNavigate()

  return (
    <main className="welcome-page">
      <section className="welcome-page__panel">
        <header className="welcome-page__header">
          <h1 className="welcome-page__title">Calcula el presupuesto ideal para tu web</h1>
          <div className="welcome-page__eyebrow-group">
            <span className="welcome-page__eyebrow">Planifica tu proyecto</span>
            <div className="welcome-page__separator" aria-hidden="true" />
          </div>
        </header>
        <div className="welcome-page__intro">
          <p className="welcome-page__description">
            Selecciona los servicios que mejor se ajustan a tus necesidades y obtén al instante una
            estimación clara del coste total. Sin sorpresas, solo datos útiles para tomar decisiones
            rápidas.
          </p>
        </div>

        <ul className="welcome-page__benefits">
          <li>Define qué necesitas sin hojas de cálculo ni fórmulas.</li>
          <li>Ajusta páginas e idiomas y visualiza el precio en tiempo real.</li>
          <li>Toma decisiones informadas con cifras transparentes.</li>
        </ul>

        <button className="welcome-page__cta" type="button" onClick={() => navigate("/budget")}>
          Empezar a calcular
        </button>
      </section>
    </main>
  )
}

export default WelcomePage