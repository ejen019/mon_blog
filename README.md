# Mon Blog — React + TypeScript

Un blog minimaliste construit avec React et TypeScript, qui consomme l'API publique JSONPlaceholder.

---

## Ce que fait cette application

- Afficher la liste de tous les articles
- Lire un article complet avec ses commentaires avec auth et CRUD
- Consulter la liste des auteurs
- Voir le profil d'un auteur et tous ses articles

---

## Prérequis

Avant de commencer, s'assurer d'avoir installé sur son ordinateur :
```bash
node --version
npm --version
```

---

## Installation et démarrage

### 1. Cloner ou téléchargerr le projet

Git :

```bash
git clone <url-du-projet>
cd mon-blog
```

Sinon, téléchargerr le dossier et ouvre un terminal dedans.

### 2. Installer les dépendances

```bash
npm install
```

Cette commande télécharger tous les paquets nécessaires (React, React Router, etc.) dans un dossier `node_modules`.

### 3. Lancer le projet en mode développement

```bash
npm run dev
```

adresse affichée dans le terminal, généralement `http://localhost:5173`.

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


Voici les adresses qu'on utilise :

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

## Commandes disponibles

| Commande | Action |
|---|---|
| `npm run dev` | Lance le serveur de développement |
| `npm run build` | Compile et optimise pour la production |
| `npm run preview` | Prévisualise la version de production en local |

---