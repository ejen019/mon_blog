import type { Post, Comment, User } from '../types'

// l'url de base de l'api, je la mets ici pour pas la repeter partout
const BASE_URL = 'https://jsonplaceholder.typicode.com'

// recupere tous les articles
export async function getPosts(): Promise<Post[]> {
  const response = await fetch(`${BASE_URL}/posts`)
  // console.log(response)
  return response.json()
}

// recupere un seul article avec son id
export async function getPost(id: number): Promise<Post> {
   const response = await fetch(`${BASE_URL}/posts/${id}`)
   return response.json()
}

// recupere les commentaires d'un article
export async function getPostComments(postId: number): Promise<Comment[]> {
  const response = await fetch(`${BASE_URL}/posts/${postId}/comments`)
  return response.json()
}

// tous les utilisateurs
export async function getUsers(): Promise<User[]> {
  const response = await fetch(`${BASE_URL}/users`)
  return response.json()
}

export async function getUser(id: number): Promise<User> {
  const response = await fetch(`${BASE_URL}/users/${id}`)
  return response.json()
}

// les articles d'un utilisateur precis
export async function getUserPosts(userId: number): Promise<Post[]> {
  const response = await fetch(`${BASE_URL}/users/${userId}/posts`)
  return response.json()
}
