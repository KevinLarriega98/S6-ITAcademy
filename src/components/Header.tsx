import { Link } from "react-router-dom"
import "./Header.css"

const Header = () => {
  return (
    <header className="app-header">
      <Link to="/" className="app-header__brand">
        Frontender.itacademy
      </Link>
    </header>
  )
}

export default Header