import { Link } from 'react-router-dom'
import type { User } from '../types'

interface Props {
  user: User
}

// carte pour un utilisateur dans la liste des auteurs
export default function UserCard({ user }: Props) {
  return (
    <div className="card">
      <h2 className="card-title">{user.name}</h2>
      <p className="card-meta">@{user.username} — {user.email}</p>
      <p className="card-meta">{user.company.name}</p>
      <Link to={`/users/${user.id}`} className="card-link">
        Voir le profil
      </Link>
    </div>
  )
}
