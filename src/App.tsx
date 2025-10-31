import { Routes, Route, Navigate } from 'react-router-dom'
import WelcomePage from './features/welcome/pages/WelcomePage'
import BudgetPage from './features/budget/pages/BudgetPage/BudgetPage'
import Header from './shared/components/Header/Header'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/budget" element={<BudgetPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
