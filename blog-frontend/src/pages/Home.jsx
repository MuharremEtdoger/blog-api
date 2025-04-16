import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Kullanıcı giriş yaptıysa, token'ı kontrol et
    const token = localStorage.getItem('token'); // veya sessionStorage.getItem('token')
    if (token) {
      setIsLoggedIn(true);
    }

    // API'ye istek atarak blog gönderilerini al
    api.get('/posts').then(res => {
      setPosts(res.data);
    });
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Silmek istediğinize emin misiniz?')) {
      await api.delete(`/posts/${id}`);
      setPosts(posts.filter(p => p.id !== id));
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-primary">Blog Gönderileri</h2>

      {posts.length === 0 ? (
        <div className="alert alert-warning text-center">
          Henüz blog gönderisi yok.
        </div>
      ) : (
        <div className="row">
          {posts.map(post => (
            <div key={post.id} className="col-md-4 mb-4">
              <div className="card shadow-sm h-100 border-light">
                <img 
                  src="https://placehold.co/600X400" 
                  alt={post.title} 
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title text-truncate" style={{ maxWidth: '100%' }}>
                    {post.title}
                  </h5>
                  <p className="card-text text-muted" style={{ fontSize: '0.9rem' }}>
                    {post.content.length > 100 ? `${post.content.substring(0, 100)}...` : post.content}
                  </p>

                  <div className="mt-3 d-flex justify-content-between">
                    {/* Düzenle Butonu */}
                    {isLoggedIn && (
                      <Link to={`/edit/${post.id}`} className="btn btn-warning btn-sm">
                        <i className="bi bi-pencil"></i> Düzenle
                      </Link>
                    )}

                    {/* Sil Butonu */}
                    {isLoggedIn && (
                      <button 
                        onClick={() => handleDelete(post.id)} 
                        className="btn btn-danger btn-sm"
                      >
                        <i className="bi bi-trash"></i> Sil
                      </button>
                    )}

                    {/* Görüntüle Butonu */}
                    <Link to={`/post/${post.id}`} className="btn btn-info btn-sm">
                      <i className="bi bi-eye"></i> Görüntüle
                    </Link>
                  </div>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
