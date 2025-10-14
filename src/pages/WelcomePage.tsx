import { useNavigate } from 'react-router-dom'

const WelcomePage = () => {
  const navigate = useNavigate()

  return (
    <main>
      <h1>Hola, bienvenido/a</h1>
      <p>
        Esta aplicación te ayuda a calcular el presupuesto de un sitio web. Elige las opciones que
        necesitas y obtén el precio estimado al instante.
      </p>
      <button type="button" onClick={() => navigate('/budget')}>
        Calcula el presupuesto
      </button>
    </main>
  )
}

export default WelcomePage