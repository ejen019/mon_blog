// page d'accueil - affiche tous les articles
import { getPosts } from '../services/api'
import { useFetch } from '../hooks/useFetch'
import PostCard from '../components/PostCard'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'

export default function PostList() {
  // useFetch s'occupe de tout : charger, attendre, erreur
  const { data: posts, loading, error } = useFetch(getPosts)

  // si ca charge encore on montre le loader
  if (loading) return <Loader />
  if (error) return <ErrorMessage message={error} />
  if (!posts) return null

  // console.log('posts recus:', posts)

  return (
    <section>
      <h1 className="page-title">Tous les articles</h1>
      <div className="grid">
        {/* le map() parcourt le tableau et cree une PostCard pour chaque article */}
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  )
}
