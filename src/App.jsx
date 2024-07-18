import './App.css'
import { Link } from 'react-router-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/header/Header'
import Blog from './pages/blog/Blog.jsx'
import Home from './pages/home/Home'
import CreateBlog from './pages/create Blog/CreateBlog.jsx'
import SignUp from './pages/Signup/SignUp.jsx'
import Login from './login/Login.jsx'
import Footer from './components/footer/Footer.jsx'

function App() {
 

  return (
    <>
     <BrowserRouter>
     <Header />
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/CreateBlog" element={<CreateBlog />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />

     </BrowserRouter>
    </>
  )
}

export default App
