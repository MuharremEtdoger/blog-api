import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

export default function BlogDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    api.get(`/posts/${id}`).then(res => {
      setPost(res.data);
    }).catch((error) => {
      console.error('API hatası:', error);
    });
  }, [id]);

  if (!post) {
    return <div>Yükleniyor...</div>;
  }

  const authorName = post.user ? post.user.name : 'Yazar bilgisi yok';

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">{post.title}</h2>
          <p className="card-text">{post.content}</p>
        </div>
      </div>
    </div>
  );
}
