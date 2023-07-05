import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

export default function FormularioProveedores({ onClose }) {
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    telefono: '',
  });

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    axios
      .post('http://localhost:3000/Proveedores', formData)
      .then((response) => {
        // La solicitud se completó correctamente, puedes realizar acciones adicionales si es necesario
        console.log(response.data);
        setFormData({ nombre: '', direccion: '', telefono: '' });
        onClose();
      })
      .catch((error) => {
        // Ocurrió un error al realizar la solicitud
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
      <button type="submit">Guardar</button>
      <button type="button" onClick={handleCancel}>
        Cancelar
      </button>
    </form>
  );
}
