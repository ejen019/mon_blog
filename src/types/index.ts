// les types typescript pour les donnees qu'on recoit de l'api
// si je mets pas ca typescript crie partout

// un article
export interface Post {
  id: number
  userId: number  // l'id de celui qui a ecrit l'article
  title: string
  body: string
}

// un commentaire sur un article
export interface Comment {
  id: number
  postId: number  // l'article auquel appartient ce commentaire
  name: string
  email: string
  body: string
}

// l'adresse d'un utilisateur
export interface Address {
  street: string
  city: string
}

export interface Company {
  name: string
}

// un auteur / utilisateur
export interface User {
  id: number
  name: string
  username: string
  email: string
  address: Address
  company: Company
}
