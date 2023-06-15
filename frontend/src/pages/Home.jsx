import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [auth, sethAuth] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000').then((res) => {
      if (res.data.status === 'Bienvenido') {
        sethAuth(true);
        setName(res.data.name);
      } else {
        sethAuth(false);
        setMessage(res.data.message);
      }
    });
  }, []);

  const handleLogout = () => {
    axios
      .get('http://localhost:3000/logout')
      .then((res) => {
        if (res.data.status === 'Bienvenido') {
          sethAuth(false);
          setName('');
        }
        location.reload(true);
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
