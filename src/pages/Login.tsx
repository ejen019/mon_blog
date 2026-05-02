import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [erreur, setErreur]  = useState('')

  const { login } = useAuth()
  const navigate = useNavigate()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const ok = login(username, password)
    if (ok) {
      navigate('/')  // on redirige vers l'accueil si ca marche
    } else {
      setErreur('Mauvais identifiants. Essaie admin / 1234')
    }
  }

  return (
    <div className="login-page">
      <div className="login-box">
        <h1>Connexion</h1>
        <p className="login-hint">admin / 1234</p>

        {erreur && <p className="login-error">{erreur}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nom d'utilisateur</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
            />
          </div>

          <div className="form-group">
            <label>Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="1234"
            />
          </div>

          <button type="submit" className="btn-login">Se connecter</button>
        </form>

        <p style={{ marginTop: '1rem', fontSize: '0.85rem' }}>
          <Link to="/">Retour au blog</Link>
        </p>
      </div>
    </div>
  )
}
