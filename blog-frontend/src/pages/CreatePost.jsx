import PostForm from '../components/PostForm';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    try {
      await api.post('/posts', data);
      navigate('/');
    } catch (err) {
      alert('Gönderi oluşturulamadı.');
    }
  };

  return (
    <div>
      <h2>Yeni Gönderi</h2>
      <PostForm onSubmit={handleCreate} />
    </div>
  );
}
