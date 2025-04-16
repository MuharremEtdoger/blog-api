import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const login = () => {
    navigate('/login');
  };

  const register = () => {
    navigate('/register');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
      <div className="container">
        <Link to="/" className="navbar-brand">BLOG API</Link>
        <div className="navbar-nav">
          <Link to="/" className="nav-link">Anasayfa</Link>
          <Link to="/create" className="nav-link">Yeni Gönderi</Link>
        </div>
        {isLoggedIn ? (
          <button className="btn btn-outline-danger ms-auto" onClick={logout}>Çıkış</button>
        ) : (
          <div className='buttons-header float-end'>
          <button className="btn btn-outline-primary ms-2" onClick={login}>Giriş Yap</button>
          <button className="btn btn-outline-primary ms-2" onClick={register}>Kayıt Ol</button>
          </div>
          
        )}
      </div>
    </nav>
  );
}
