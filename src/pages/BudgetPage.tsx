import { useNavigate } from 'react-router-dom'

const BudgetPage = () => {
  const navigate = useNavigate()

  return (
    <main>
      <h1>Calculadora de presupuesto</h1>
      <p>
        Aquí podrás configurar los servicios que necesitas para tu web y ver cómo cambia el precio
        total.
      </p>
      <button type="button" onClick={() => navigate('/')}>
        Volver al inicio
      </button>
    </main>
  )
}

export default BudgetPage