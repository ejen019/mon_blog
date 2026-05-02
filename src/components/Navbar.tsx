import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// la barre en haut presente sur toutes les pages
export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">Mon Blog</Link>
      <div className="navbar-links">
        <Link to="/">Articles</Link>
        <Link to="/users">Auteurs</Link>

        {/* si connecte on affiche le nom + bouton deconnexion, sinon le lien connexion */}
        {user ? (
          <span className="navbar-user-zone">
            <span className="navbar-user">Bonjour, {user}</span>
            <button className="btn-logout" onClick={logout}>Deconnexion</button>
          </span>
        ) : (
          <Link to="/login" className="btn-connect">Connexion</Link>
        )}
      </div>
    </nav>
  )
}
