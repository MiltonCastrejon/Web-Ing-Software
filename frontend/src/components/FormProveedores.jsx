import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

export default function FormularioProveedores({ onClose, onSave, proveedor }) {
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    telefono: '',
  });

  axios.defaults.withCredentials = true;

  useEffect(() => {
    if (proveedor) {
      setFormData(proveedor);
    } else {
      setFormData({
        nombre: '',
        direccion: '',
        telefono: '',
      });
    }
  }, [proveedor]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    if (proveedor) {
      // Editar proveedor existente
      axios
        .put(`http://localhost:3000/Proveedores/${proveedor.id}`, formData)
        .then((response) => {
          console.log(response.data);
          onClose();
          onSave();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // Agregar nuevo proveedor
      axios
        .post('http://localhost:3000/Proveedores', formData)
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
      nombre: '',
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
        <h2>{proveedor ? 'Editar Proveedor' : 'Añadir Proveedor'}</h2>
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
            <button type="submit">{proveedor ? 'Guardar' : 'Crear'}</button>
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
  /* Estilos para la ventana flotante */
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 9999;
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

const Overlay = styled.div`
  /* Estilos para la capa semi-transparente */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9998;
`;
