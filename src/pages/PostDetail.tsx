// page de detail d'un article + CRUD commentaires
import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getPost, getPostComments } from '../services/api'
import { useFetch } from '../hooks/useFetch'
import { useAuth } from '../context/AuthContext'
import CommentCard from '../components/CommentCard'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import type { Comment } from '../types'

const API = 'https://jsonplaceholder.typicode.com'

export default function PostDetail() {
  const { id } = useParams<{ id: string }>()
  const postId = Number(id)
  const { user } = useAuth()

  // l'article : on garde useFetch
  const { data: post, loading: postLoading, error: postError } = useFetch(
    () => getPost(postId)
  )

  // les commentaires : on gere manuellement pour pouvoir faire le CRUD
  const [comments, setComments] = useState<Comment[]>([])
  const [commentsLoading, setCommentsLoading] = useState(true)

  // champs du formulaire ajout commentaire
  const [newName, setNewName] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newBody, setNewBody] = useState('')

  // on charge les commentaires au demarrage
  useEffect(() => {
    getPostComments(postId).then((data) => {
      setComments(data)
      setCommentsLoading(false)
    })
  }, [postId])

  // SUPPRIMER
  function handleDelete(commentId: number) {
    // l'api de jsonplaceholder accepte la requete mais ne supprime rien vraiment
    fetch(`${API}/comments/${commentId}`, { method: 'DELETE' })
    // donc on fait le vrai travail cote React avec filter
    setComments(comments.filter(c => c.id !== commentId))
  }

  // MODIFIER
  function handleEdit(commentId: number, newBody: string) {
    fetch(`${API}/comments/${commentId}`, {
      method: 'PUT',
      body: JSON.stringify({ body: newBody }),
      headers: { 'Content-type': 'application/json' },
    })
    // on met a jour dans le state local
    setComments(comments.map(c =>
      c.id === commentId ? { ...c, body: newBody } : c
    ))
  }

  // AJOUTER
  function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!newBody.trim() || !newName.trim()) return

    // on cree un objet commentaire avec un faux id
    const nouveauCommentaire: Comment = {
      id: Date.now(),
      postId,
      name: newName,
      email: newEmail || 'anonyme@blog.com',
      body: newBody,
    }

    fetch(`${API}/comments`, {
      method: 'POST',
      body: JSON.stringify(nouveauCommentaire),
      headers: { 'Content-type': 'application/json' },
    })

    setComments([...comments, nouveauCommentaire])

    // on vide le formulaire
    setNewName('')
    setNewEmail('')
    setNewBody('')
  }

  if (postLoading) return <Loader />
  if (postError) return <ErrorMessage message={postError} />
  if (!post) return null

  return (
    <article>
      <Link to="/" className="back-link">← Retour aux articles</Link>
      <h1 className="page-title">{post.title}</h1>
      <p className="post-body">{post.body}</p>

      <section className="comments-section">
        <h2>Commentaires ({comments.length})</h2>

        {commentsLoading ? (
          <Loader />
        ) : (
          comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              isLoggedIn={!!user}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))
        )}

        {/* formulaire visible seulement si connecte */}
        {user ? (
          <div className="add-comment-box">
            <h3>Ajouter un commentaire</h3>
            <form className="add-comment-form" onSubmit={handleAdd}>
              <div className="form-row">
                <input
                  type="text"
                  placeholder="Votre nom *"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="Votre email (optionel)"
                  value={newEmail}
                  onChange={e => setNewEmail(e.target.value)}
                />
              </div>
              <textarea
                placeholder="Votre commentaire..."
                value={newBody}
                onChange={e => setNewBody(e.target.value)}
                required
              />
              <button type="submit" className="btn-submit">Publier</button>
            </form>
          </div>
        ) : (
          <p className="login-prompt">
            <Link to="/login">Connectez-vous</Link> pour ajouter ou gerer les commentaires.
          </p>
        )}
      </section>
    </article>
  )
}
