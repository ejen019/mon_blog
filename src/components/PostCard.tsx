import { Link } from 'react-router-dom'
import type { Post } from '../types'

interface Props {
  post: Post
}

// la carte pour afficher un apercu d'article dans la liste
export default function PostCard({ post }: Props) {
  return (
    <article className="card">
      <h2 className="card-title">{post.title}</h2>
      {/* slice(0, 100) ca coupe le texte pour pas tout afficher */}
      <p className="card-body">{post.body.slice(0, 100)}...</p>
      <Link to={`/posts/${post.id}`} className="card-link">
        Lire la suite
      </Link>
    </article>
  )
}
