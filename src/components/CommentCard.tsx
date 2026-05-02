import { useState } from 'react'
import type { Comment } from '../types'

interface Props {
  comment: Comment
  isLoggedIn: boolean
  onDelete: (id: number) => void
  onEdit: (id: number, newBody: string) => void
}

// affiche un commentaire avec les boutons edit/delete si on est connecte
export default function CommentCard({ comment, isLoggedIn, onDelete, onEdit }: Props) {
  const [editing, setEditing] = useState(false)
  const [newBody, setNewBody] = useState(comment.body)

  function handleSave() {
    onEdit(comment.id, newBody)
    setEditing(false)
  }

  return (
    <div className="comment">
      <div className="comment-header">
        <strong>{comment.name}</strong>
        <span className="comment-email">{comment.email}</span>
      </div>

      {/* mode edition : on affiche un textarea */}
      {editing ? (
        <div>
          <textarea
            className="edit-textarea"
            value={newBody}
            onChange={(e) => setNewBody(e.target.value)}
          />
          <div className="comment-actions">
            <button className="btn-save" onClick={handleSave}>Sauvegarder</button>
            <button className="btn-cancel" onClick={() => setEditing(false)}>Annuler</button>
          </div>
        </div>
      ) : (
        <>
          <p>{comment.body}</p>
          {/* on montre les boutons seulement si l'utilisateur est connecte */}
          {isLoggedIn && (
            <div className="comment-actions">
              <button className="btn-edit" onClick={() => setEditing(true)}>Modifier</button>
              <button className="btn-delete" onClick={() => onDelete(comment.id)}>Supprimer</button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
