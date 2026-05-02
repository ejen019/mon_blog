// profil d'un auteur avec ses infos et ses articles
import { useParams, Link } from 'react-router-dom'
import { getUser, getUserPosts } from '../services/api'
import { useFetch } from '../hooks/useFetch'
import PostCard from '../components/PostCard'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'

export default function UserProfile() {
  // on recupere l'id dans l'url
  const { id } = useParams<{ id: string }>()
  const userId = Number(id)

  const { data: user, loading: userLoading, error: userError } = useFetch(
    () => getUser(userId)
  )
  // les articles de cet utilisateur
  const { data: posts, loading: postsLoading } = useFetch(
    () => getUserPosts(userId)
  )

  if (userLoading) return <Loader />
  if (userError) return <ErrorMessage message={userError} />
  if (!user) return null

  return (
    <div>
      <Link to="/users" className="back-link">← Retour aux auteur</Link>

      <section className="user-profile">
        <h1 className="page-title">{user.name}</h1>
        <p className="card-meta">@{user.username}</p>
        <p className="card-meta">{user.email}</p>
        <p className="card-meta">{user.address.street}, {user.address.city}</p>
        <p className="card-meta">Entreprise : {user.company.name}</p>
      </section>

      <section>
        <h2 className="section-title">Articles de {user.name}</h2>
        {postsLoading ? (
          <Loader />
        ) : (
          <div className="grid">
            {posts?.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
