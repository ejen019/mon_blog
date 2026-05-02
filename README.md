# Mon Blog — React + TypeScript

Un blog minimaliste construit avec React et TypeScript, qui consomme l'API publique JSONPlaceholder.
Ce projet est conçu pour apprendre les bases du développement React de façon concrète.

---

## Ce que fait cette application

- Afficher la liste de tous les articles
- Lire un article complet avec ses commentaires
- Consulter la liste des auteurs
- Voir le profil d'un auteur et tous ses articles

---

## Prérequis

Avant de commencer, assure-toi d'avoir installé sur ton ordinateur :

- [Node.js](https://nodejs.org/) version 18 ou plus récente
- npm (il est inclus avec Node.js)

Pour vérifier :

```bash
node --version
npm --version
```

---

## Installation et démarrage

### 1. Cloner ou télécharger le projet

Si tu as Git :

```bash
git clone <url-du-projet>
cd mon-blog
```

Sinon, télécharge le dossier et ouvre un terminal dedans.

### 2. Installer les dépendances

```bash
npm install
```

Cette commande télécharge tous les paquets nécessaires (React, React Router, etc.) dans un dossier `node_modules`.

### 3. Lancer le projet en mode développement

```bash
npm run dev
```

Ouvre ensuite ton navigateur à l'adresse affichée dans le terminal, généralement `http://localhost:5173`.

### 4. Construire pour la production (optionnel)

```bash
npm run build
```

Cela génère un dossier `dist/` avec les fichiers optimisés prêts à être hébergés.

---

## Structure des fichiers

```
mon-blog/
├── public/                  → fichiers statiques (favicon, etc.)
├── src/
│   ├── components/          → composants réutilisables
│   │   ├── Navbar.tsx       → barre de navigation
│   │   ├── PostCard.tsx     → carte d'aperçu d'un article
│   │   ├── CommentCard.tsx  → carte d'un commentaire
│   │   ├── UserCard.tsx     → carte d'un utilisateur
│   │   ├── Loader.tsx       → indicateur de chargement
│   │   └── ErrorMessage.tsx → affichage d'erreur
│   ├── hooks/
│   │   └── useFetch.ts      → hook générique pour les appels API
│   ├── pages/
│   │   ├── PostList.tsx     → page d'accueil : liste des articles
│   │   ├── PostDetail.tsx   → page de détail d'un article + commentaires
│   │   ├── UserList.tsx     → liste des auteurs
│   │   └── UserProfile.tsx  → profil d'un auteur + ses articles
│   ├── services/
│   │   └── api.ts           → toutes les fonctions d'appel API
│   ├── types/
│   │   └── index.ts         → les types TypeScript (Post, Comment, User)
│   ├── App.tsx              → configuration des routes
│   ├── index.css            → style global
│   └── main.tsx             → point d'entrée de React
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Les pages disponibles

| URL | Ce qu'elle affiche |
|---|---|
| `/` | Liste de tous les articles |
| `/posts/:id` | Détail d'un article et ses commentaires |
| `/users` | Liste de tous les auteurs |
| `/users/:id` | Profil d'un auteur et ses articles |

`:id` représente un nombre. Par exemple `/posts/3` affiche l'article numéro 3.

---

## L'API utilisée

Ce projet utilise [JSONPlaceholder](https://jsonplaceholder.typicode.com/), une API gratuite et publique qui simule un blog.

Elle fournit des données fictives — aucune inscription ni clé API n'est nécessaire.

Voici les endpoints (adresses) qu'on utilise :

- `GET /posts` → tous les articles
- `GET /posts/:id` → un article précis
- `GET /posts/:id/comments` → les commentaires d'un article
- `GET /users` → tous les utilisateurs
- `GET /users/:id` → un utilisateur précis
- `GET /users/:id/posts` → les articles d'un utilisateur

---

## La stack technique

| Outil | Rôle |
|---|---|
| [Vite](https://vite.dev/) | Création du projet et serveur de développement |
| [React 18](https://react.dev/) | Bibliothèque pour construire l'interface |
| [TypeScript](https://www.typescriptlang.org/) | Typage du code JavaScript |
| [React Router DOM v6](https://reactrouter.com/) | Navigation entre les pages |
| `fetch` natif | Appels vers l'API (aucune bibliothèque externe) |
| CSS classique | Mise en forme de l'interface |

---

## Ce qu'on apprend avec ce projet

### Les composants React
Un composant est une fonction qui retourne du HTML (en réalité du JSX). Il peut recevoir des données en entrée (on appelle ça des `props`) et afficher quelque chose en conséquence.

Exemple — `PostCard` reçoit un post et affiche son titre :
```tsx
function PostCard({ post }: { post: Post }) {
  return <h2>{post.title}</h2>
}
```

### Les hooks
Les hooks sont des fonctions spéciales qui commencent par `use`. Les deux principaux :

- `useState` — crée une variable que React surveille. Quand elle change, l'affichage se met à jour.
- `useEffect` — exécute du code après l'affichage du composant. Utilisé ici pour lancer les appels API.

### Le routing côté client
React Router regarde l'URL et affiche le bon composant. Pas de rechargement de page — tout se passe dans le navigateur.

### TypeScript et les interfaces
Une interface décrit la forme d'un objet. Si on essaie d'utiliser un champ qui n'existe pas, TypeScript prévient avant même de lancer le code.

```ts
interface Post {
  id: number
  title: string
  body: string
}
```

### Le pattern "service"
Tous les appels API sont regroupés dans `src/services/api.ts`. Si l'URL de l'API change, il n'y a qu'un seul fichier à modifier.

### Le hook `useFetch`
Un hook personnalisé qui encapsule la logique commune à tous les appels API : gestion du chargement, de la réponse et des erreurs. On l'utilise ainsi :

```ts
const { data: posts, loading, error } = useFetch(getPosts)
```

---

## Commandes disponibles

| Commande | Action |
|---|---|
| `npm run dev` | Lance le serveur de développement |
| `npm run build` | Compile et optimise pour la production |
| `npm run preview` | Prévisualise la version de production en local |

---

## Pour aller plus loin

Une fois à l'aise avec ce projet, voici des idées d'améliorations :

- Ajouter une barre de recherche pour filtrer les articles
- Afficher le nom de l'auteur sur chaque carte d'article
- Ajouter une pagination (l'API renvoie 100 articles par défaut)
- Gérer les erreurs réseau de façon plus détaillée
- Remplacer le CSS par Tailwind CSS pour accélérer le style
