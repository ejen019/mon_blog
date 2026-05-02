import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import PostList from './pages/PostList'
import PostDetail from './pages/PostDetail'
import UserList from './pages/UserList'
import UserProfile from './pages/UserProfile'
import Login from './pages/Login'

// le composant principal
// AuthProvider enveloppe tout pour que l'auth soit accessible partout
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:id" element={<UserProfile />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
