import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import PostForm from '../components/PostForm';

export default function EditPost() {
  const { id } = useParams(); // URL'deki post ID'yi al
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // Post verisini çek
  useEffect(() => {
    api.get(`/posts/${id}`)
      .then(res => {
        setPost(res.data);
        setLoading(false);
      })
      .catch(() => {
        alert('Gönderi bulunamadı.');
        navigate('/');
      });
  }, [id]);

  const handleUpdate = async (data) => {
    try {
      await api.put(`/posts/${id}`, data);
      navigate('/');
    } catch (err) {
      alert('Güncelleme başarısız.');
    }
  };

  if (loading) return <p>Yükleniyor...</p>;

  return (
    <div>
      <h2>Gönderiyi Düzenle</h2>
      <PostForm initialData={post} onSubmit={handleUpdate} />
    </div>
  );
}
