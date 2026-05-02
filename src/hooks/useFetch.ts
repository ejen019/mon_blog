import { useState, useEffect } from 'react'

// ce hook je l'ai fait pour pas repeter le meme code dans chaque page
// il gere le chargement, les donnees et les erreurs

interface FetchState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export function useFetch<T>(fetchFn: () => Promise<T>): FetchState<T> {

  // les 3 etats : les donnees, est-ce que ca charge, l'erreur
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // useEffect se lance quand le composant s'affiche
  useEffect(() => {
    let cancelled = false

    setLoading(true)
    setError(null)

    fetchFn()
      .then((result) => {
        // cancelled sert a eviter une erreur si on quitte la page trop vite
        if (!cancelled) {
          setData(result)
          setLoading(false)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError('Une erreur est survenu. Veuillez réessayer.')
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [])  // le [] c'est pour que ca se lance qu'une seule fois

  return { data, loading, error }
}
