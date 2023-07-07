import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

export default function FormularioProductos({ onClose, producto }) {
  const [formData, setFormData] = useState({
    nombre: '',
    imagen: '',
    precio: '',
    descripcion: '',
  });

  axios.defaults.withCredentials = true;

  useEffect(() => {
    if (producto) {
      setFormData(producto);
    }
  }, [producto]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    axios
      .post('http://localhost:3000/Productos', formData)
      .then((response) => {
        console.log(response.data);
        setFormData({ nombre: '', imagen: '', precio: '', descripcion: '' });
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
    setFormData({ nombre: '', imagen: '', precio: '', descripcion: '' });
    onClose();
  };

  return (
    <ProductForm>
      <h2>Añadir Producto</h2>
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
          name="imagen"
          value={formData.imagen}
          onChange={handleInputChange}
          placeholder="Imagen"
          required
        />
        <input
          type="text"
          name="precio"
          value={formData.precio}
          onChange={handleInputChange}
          placeholder="Precio"
          required
        />
        <input
          type="text"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleInputChange}
          placeholder="Descripcion"
          required
        />
        <div>
        <button type="submit">Guardar</button>
          <button type="button" onClick={handleCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </ProductForm>
  );
}

const ProductForm = styled.div`  
  form {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 30px;
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
