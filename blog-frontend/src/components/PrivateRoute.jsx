import { Navigate } from 'react-router-dom';

function PrivateRoute({ element }) {
  const isLoggedIn = localStorage.getItem('token'); // Token kontrolü

  if (!isLoggedIn) {
    return <Navigate to="/login" />; // Giriş yapılmamışsa login sayfasına yönlendir
  }

  return element; // Eğer giriş yapılmışsa, istenilen sayfayı render et
}

export default PrivateRoute;
