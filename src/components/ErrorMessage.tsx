interface Props {
  message: string
}

// affiche un message quand quelque chose se passe mal
export default function ErrorMessage({ message }: Props) {
  return <div className="error-message">{message}</div>
}
