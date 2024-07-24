import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import Blog from './pages/blog/Blog.jsx';
import CreateBlog from './pages/create Blog/CreateBlog.jsx';
import SignUp from './pages/Signup/SignUp.jsx';
import Login from './login/Login.jsx';
import Footer from './components/footer/Footer.jsx';
import { AuthProvider } from './Auth/AuthContext.jsx';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditBlog from './pages/editblog/Editblog.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Blog />
                </ProtectedRoute>
              }
            />
            <Route
              path="/CreateBlog"
              element={
                <ProtectedRoute>
                  <CreateBlog />
                </ProtectedRoute>
              }
            />
             <Route path="/edit/:id" element={ <ProtectedRoute><EditBlog /></ProtectedRoute>} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <Footer />
          <ToastContainer />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
