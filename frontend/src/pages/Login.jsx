import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

export default function Login() {
  const [values, setValues] = useState({
    usuario: '',
    password: '',
  });

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3000/Login', values)
      .then((res) => {
        if (res.data.status === 'Bienvenido') {
          localStorage.setItem('token', res.data.token); // Almacena el token en localStorage
          navigate('/');
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div className=".cardSingIn">
        <div>
          <img className='logo' alt='MDN'>
          </img>
        </div>
        <h1>Iniciar sesión</h1>       
        <form onSubmit={handleSubmit}>
          <div className="formr">
            <input
              type="text"
              name="usuario"
              required
              onChange={(e) =>
                setValues({ ...values, usuario: e.target.value })
              }
              className="inputName"
            />
            <label className="labelName">Usuario</label>
            <input
              type="password"
              name="contrasena"
              required
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              className="inputPassword"
            />
            <label className="labelPassword">Contraseña</label>
          </div>
          <button type="Submit" className="btn">
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}

