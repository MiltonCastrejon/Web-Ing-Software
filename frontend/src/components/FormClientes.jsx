import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

export default function FormularioClientes({ onClose, onSave, cliente }) {
  const [formData, setFormData] = useState({
    nombreCliente: '',
    DNI: '',
    direccion: '',
    telefono: '',
  });

  axios.defaults.withCredentials = true;

  useEffect(() => {
    if (cliente) {
      setFormData(cliente);
    } else {
      setFormData({
        nombreCliente: '',
        DNI: '',
        direccion: '',
        telefono: '',
      });
    }
  }, [cliente]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    if (cliente) {
      axios
        .put(`http://localhost:3000/Clientes/${cliente.idCliente}`, formData)
        .then((response) => {
          console.log(response.data);
          onClose();
          onSave();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // Agregar nuevo cliente
      axios
        .post('http://localhost:3000/Clientes', formData)
        .then((response) => {
          console.log(response.data);
          onClose();
          onSave();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleCancel = () => {
    setFormData({
      nombreCliente: '',
      DNI: '',
      direccion: '',
      telefono: '',
    });
    onClose();
    onSave();
  };

  return (
    <>
      <Overlay />
      <ContainerForm>
        <h2>{cliente ? 'Editar cliente' : 'Añadir Cliente'}</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="inputbox">
            <input
              type="text"
              name="nombreCliente"
              value={formData.nombreCliente}
              onChange={handleInputChange}
              required
            />
            <span>Nombre Completo</span>
            <i></i>
          </div>
          <div className="inputbox">
            <input
              type="number"
              name="DNI"
              value={formData.DNI}
              onChange={handleInputChange}
              required
            />
            <span>DNI</span>
            <i></i>
          </div>
          <div className="inputbox">
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleInputChange}
              required
            />
            <span>Direccion</span>
            <i></i>
          </div>
          <div className="inputbox">
            <input
              type="number"
              pattern="[0-9]{9}"
              name="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
              required
            />
            <span>Telefono</span>
            <i></i>
          </div>
          <div className="button-container">
            <button type="submit">{cliente ? 'Actualizar' : 'Guardar'}</button>
            <button type="button" onClick={handleCancel}>
              Cancelar
            </button>
          </div>
        </form>
      </ContainerForm>
    </>
  );
}

const ContainerForm = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 50px;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 9999;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 0px;
  }
  h2 {
    margin: 0;
    margin-bottom: 20px;
    font-weight: 800;
    text-align: center;
  }
  .inputbox {
    position: relative;
    width: 196px;
    margin: 10px;
  }
  .inputbox input {
    position: relative;
    width: 100%;
    padding: 20px 10px 10px;
    background: transparent;
    outline: none;
    box-shadow: none;
    border: none;
    color: #23242a;
    font-size: 1em;
    letter-spacing: 0.05em;
    transition: 0.5s;
    z-index: 10;
  }

  .inputbox span {
    position: absolute;
    left: 0;
    padding: 25px 10px 10px;
    font-size: 1em;
    color: #8f8f8f;
    letter-spacing: 00.05em;
    transition: 0.5s;
    pointer-events: none;
  }

  .inputbox input:valid ~ span,
  .inputbox input:focus ~ span {
    color: #4287ef;
    transform: translateX(-10px) translateY(-34px);
    font-size: 0, 75em;
  }

  .inputbox i {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background: #4287ef;
    border-radius: 4px;
    transition: 0.5s;
    pointer-events: none;
    z-index: 9;
  }

  .inputbox input:valid ~ i,
  .inputbox input:focus ~ i {
    height: 38px;
  }

  form .button-container {
    width: 100%;
    margin-top: 20px;
    height: auto;
    display: flex;
    justify-content: space-evenly;
  }
  form button {
    margin: 10px;
    width: 100px;
    height: 30px;
    border-radius: 6px;
    border: 2px solid #4287ef;
    background: #fff;
    color: #4287ef;
    font-weight: bold;
    cursor: pointer;
  }
  form button:hover {
    background-color: #4287ef;
    color: #fff;
  }
`;
const Overlay = styled.div`
  /* Estilos para la capa semi-transparente */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9998;
  backdrop-filter: blur(6px);
`;
