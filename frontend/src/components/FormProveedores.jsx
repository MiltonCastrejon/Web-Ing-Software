import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

export default function FormularioProveedores({ onClose, proveedor }) {
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    telefono: '',
  });

  axios.defaults.withCredentials = true;

  useEffect(() => {
    if (proveedor) {
      setFormData(proveedor);
    }
  }, [proveedor]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    axios
      .post('http://localhost:3000/Proveedores', formData)
      .then((response) => {
        console.log(response.data);
        setFormData({ nombre: '', direccion: '', telefono: '' });
        onClose();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCancel = () => {
    setFormData({ nombre: '', direccion: '', telefono: '' });
    onClose();
  };

  return (
    <ContainerForm>
      <h2>Añadir Proveedor</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleInputChange}
          placeholder="Nombre"
          required
        />
        <input
          type="text"
          name="direccion"
          value={formData.direccion}
          onChange={handleInputChange}
          placeholder="Dirección"
          required
        />
        <input
          type="text"
          name="telefono"
          value={formData.telefono}
          onChange={handleInputChange}
          placeholder="Teléfono"
          required
        />
        <div className="button-container">
          <button type="submit">Guardar</button>
          <button type="button" onClick={handleCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </ContainerForm>
  );
}

const ContainerForm = styled.div`
  form {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 0px;
  }
  form input {
    margin: 5px;
    width: 250px;
    height: 30px;
    border-radius: 6px;
    border: 2px solid #ccc;
    padding: 5px;
  }
  form input:focus {
    outline: none;
    border: 2px solid #9247fc;
  }
  form .button-container {
    width: 100%;
    margin-top: 10px;
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
