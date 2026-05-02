import { createContext, useContext, useState } from 'react'

// ce fichier gere la connexion / deconnexion dans toute l'app

interface AuthContextType {
  user: string | null
  login: (username: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // on recupere l'user depuis le localStorage si il etait deja connecte
  const [user, setUser] = useState<string | null>(
    localStorage.getItem('blog_user')
  )

  function login(username: string, password: string): boolean {
    // identifiants en dur, c'est pas securise mais c'est pour apprendre
    if (username === 'admin' && password === '1234') {
      setUser(username)
      localStorage.setItem('blog_user', username)
      return true
    }
    return false  // mauvais identifiants
  }

  function logout() {
    setUser(null)
    localStorage.removeItem('blog_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// hook pour utiliser le contexte dans n'importe quel composant
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth doit etre utilise dans AuthProvider')
  return ctx
}
