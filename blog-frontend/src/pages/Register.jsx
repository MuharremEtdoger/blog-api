import { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/register', form);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
        console.error(err.response?.data || err.message);
      alert('Kayıt başarısız');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Kayıt Ol</h2>
      <div className="mb-3">
        <input type="text" className="form-control" placeholder="Ad" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      </div>
      <div className="mb-3">
        <input type="email" className="form-control" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      </div>
      <div className="mb-3">
        <input type="password" className="form-control" placeholder="Şifre" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      </div>
      <button className="btn btn-success">Kayıt Ol</button>
    </form>
  );
}
