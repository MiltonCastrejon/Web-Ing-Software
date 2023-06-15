import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('auth');
    if (isAuthenticated) {
      setAuth(true);
      setName(localStorage.getItem('name'));
    } else {
      axios.get('http://localhost:3000').then((res) => {
        if (res.data.status === 'Bienvenido') {
          setAuth(true);
          setName(res.data.name);
          localStorage.setItem('auth', true);
          localStorage.setItem('name', res.data.name);
        } else {
          setAuth(false);
          setMessage(res.data.message);
          navigate('/login');
        }
      });
    }
  }, [navigate]);

  const handleLogout = () => {
    axios
      .get('http://localhost:3000/logout')
      .then((res) => {
        if (res.data.message === 'Sesión cerrada') {
          setAuth(false);
          setName('');
          localStorage.removeItem('auth');
          localStorage.removeItem('name');
          navigate('/login');
        }
      })
      .catch((err) => console.log(err));
  };
  

  return (
    <div className="contenedor">
      {auth ? (
        <div>
          <h1>Bienvenido, {name}</h1>
          <button className="btn" onClick={handleLogout}>
            SALIR
          </button>
        </div>
      ) : (
        <div>
          <h1>{message}</h1>
          <h1>Iniciar sesión</h1>
          <Link className="btn" to="/login">
            Iniciar
          </Link>
        </div>
      )}
    </div>
  );
}

export default Home;

