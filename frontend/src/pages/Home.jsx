import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import fondo from '../assets/background_img.jpg';

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
          navigate('/Login');
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
          navigate('/Login');
        }
      })
      .catch((err) => console.log(err));
  };
  

  return (
    <Container>
    <div className="contenedor">
      {auth ? (
        <div>
          <h1>Bienvenido, {name}</h1>
          <button className="btnSalir" onClick={handleLogout}>
        SALIR
      </button>
        </div>
      ) : (
        <div>
          <h1>{message}</h1>
          <h1>Iniciar sesión</h1>
          <Link className="btn" to="/Login">
            Iniciar
          </Link>
        </div>
      )}
      <div>
        <div className="card">

        </div>
      </div>
    </div>
    </Container>
  );
}

export default Home;

const Container = styled.div`
background-size: cover;
background-position: center;
background-repeat: no-repeat;
height: 100vh;
width: 100%;
display: flex;
justify-content: center;`

