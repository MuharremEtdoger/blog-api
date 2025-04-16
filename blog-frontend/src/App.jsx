import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Navbar from './components/Navbar';
import EditPost from './pages/EditPost';
import BlogDetail from './pages/BlogDetail';
import PrivateRoute from './components/PrivateRoute';
import './styles/custom.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create"  element={<PrivateRoute element={<CreatePost />} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register"  element={<Register />} />
          <Route path="/edit/:id" element={<PrivateRoute element={<EditPost />} />}  />
          <Route path="/post/:id" element={<BlogDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
