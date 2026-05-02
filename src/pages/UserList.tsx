// liste de tous les auteurs, meme logique que PostList
import { getUsers } from '../services/api'
import { useFetch } from '../hooks/useFetch'
import UserCard from '../components/UserCard'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'

export default function UserList() {
  const { data: users, loading, error } = useFetch(getUsers)

  if (loading) return <Loader />
  if (error) return <ErrorMessage message={error} />
  if (!users) return null

  return (
    <section>
      <h1 className="page-title">Les auteurs</h1>
        <div className="grid">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
    </section>
  )
}
