import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

export default function FormularioProductos({
  onClose,
  onSave,
  producto,
  categorias,
}) {
  const [formData, setFormData] = useState({
    categoriaId: '',
    categoria: '',
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    fabricante: '',
  });

  axios.defaults.withCredentials = true;

  useEffect(() => {
    if (producto) {
      setFormData(producto);
    } else {
      setFormData({
        categoriaId: '',
        categoria: '',
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        fabricante: '',
      });
    }
  }, [producto]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    if (producto) {
      axios
        .put(
          `http://localhost:3000/Productos/${producto.idProductos}`,
          formData
        )
        .then((response) => {
          console.log(response.data);
          onClose();
          onSave();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      axios
        .post('http://localhost:3000/Productos', formData)
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
    if (e.target.name === 'categoria') {
      const categoriaId = e.target.value;
      const categoria = categorias.find(
        (categoria) => categoria.idCategoria === categoriaId
      );
      setFormData((prevFormData) => ({
        ...prevFormData,
        categoriaId,
        categoria,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleCancel = () => {
    setFormData({
      categoriaId: '',
      categoria: '',
      nombre: '',
      descripcion: '',
      precio: '',
      stock: '',
      fabricante: '',
    });
    onClose();
    onSave();
  };

  return (
    <>
      <Overlay />
      <ProductForm>
        <h2>{producto ? 'Editar Producto' : 'Añadir producto'}</h2>
        <form onSubmit={handleFormSubmit}>
          <select
            name="categoria"
            value={formData.categoriaId} // Usa formData.categoriaId como valor del select
            onChange={handleInputChange}
            required
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.idCategoria} value={categoria.idCategoria}>
                {categoria.nombrecategoria}
              </option>
            ))}
          </select>
          <div className="inputbox">
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              required
            />
            <span>Nombre</span>
            <i></i>
          </div>
          <div className="inputbox">
            <input
              type="text"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleInputChange}
              required
            />
            <span>Decsripcicion</span>
            <i></i>
          </div>
          <div className="inputbox">
            <input
              type="text"
              name="precio"
              value={formData.precio}
              onChange={handleInputChange}
              required
            />
            <span>Precio</span>
            <i></i>
          </div>
          <div className="inputbox">
            <input
              type="text"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              required
            />
            <span>Stock</span>
            <i></i>
          </div>
          <div className="inputbox">
            <input
              type="text"
              name="fabricante"
              value={formData.fabricante}
              onChange={handleInputChange}
              required
            />
            <span>Fabricante</span>
            <i></i>
          </div>
          <div>
            <div className="button-container">
              <button type="submit">
                {producto ? 'Actualizar' : 'Guardar'}
              </button>
              <button type="button" onClick={handleCancel}>
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </ProductForm>
    </>
  );
}

const ProductForm = styled.div`
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
  select {
    width: 100%;
    padding: 20px 10px 10px;
    background: transparent;
    box-shadow: none;
    border: none;
    color: #23242a;
    
    transition: 0.5s;
    z-index: 10;
  }
  .inputbox {
    position: relative;
    width: 300px;
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
