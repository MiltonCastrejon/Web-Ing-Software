import React, { useState } from 'react';
import '../styles/Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [values, setValues] = useState({
    usuario: '',
    password: '',
  });

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    console.log(values);
    e.preventDefault();
    axios
      .post('http://localhost:3000/login', values)
      .then((res) => {
        if (res.data.status === 'Bienvenido') {
          navigate('/');
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div className="card">
        <div>
          <img className='logo' alt='MDN'>
          </img>
        </div>
        <h1>Iniciar sesion</h1>       
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
            Iniciar sesion{' '}
          </button>
        </form>
      </div>
    </div>
  );
}
