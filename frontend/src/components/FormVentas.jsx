import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

export default function FormularioVentas({
  onClose,
  onSave,
  venta,
  productos,
}) {
  const [precioProducto, setPrecioProducto] = useState(0);
  const [formData, setFormData] = useState({
    fecha: '',
    total: '',
    idCliente: '',
    idProducto: '',
    productosSeleccionados: [],
  });

  useEffect(() => {
    if (venta) {
      setFormData(venta);
    } else {
      setFormData({
        total: '',
        idCliente: '',
        idProducto: '',
      });
    }
  }, [venta]);


  const handleFormSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    if (venta) {
      axios
        .put(`http://localhost:3000/Ventas/${venta.idVenta}`, formData)
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
        .post('http://localhost:3000/Ventas', formData)
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
    const { name, value } = e.target;
  
    if (name === 'idProducto') {
      const productoSeleccionado = productos.find(
        (producto) => producto.idProducto === value
      );
  
      if (productoSeleccionado) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          idProducto: value,
          precioUnitario: productoSeleccionado.precio,

        }));
        setPrecioProducto(productoSeleccionado.precio);
      }
    } else if (name === 'cantidadVendida') {
      const cantidad = parseInt(value);
      const total = cantidad * precioUnitario;
  
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: cantidad,
        TotalVenta: total,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };
  

  const handleCancel = () => {
    setFormData({
      fecha: '',
      total: '',
      idCliente: '',
      idProducto: '',
    });
    onClose();
    onSave();
  };

  return (
    <>
      <Overlay />
      <ContainerForm>
        <h2>{venta ? 'Editar Venta' : 'Nueva Venta'}</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="inputbox">
            <input
              type="text"
              name="idDetalleVenta"
              value={formData.idDetalleVenta}
              onChange={handleInputChange}
              required
            />
            <span>Id Detalle Venta</span>
            <i></i>
          </div>
          <div className="inputbox">
            <input
              type="text"
              name="idVenta"
              value={formData.idVenta}
              onChange={handleInputChange}
              required
            />
            <span>Id Venta</span>
            <i></i>
          </div>
          <div className="inputbox">
            <input
              type="text"
              name="NombreCliente"
              value={formData.NombreCliente}
              onChange={handleInputChange}
              required
            />
            <span>Cliente</span>
            <i></i>
          </div>
          <div className="inputbox">
            <select
              name="idProducto"
              value={formData.idProducto}
              onChange={handleInputChange}
              required
            >
              <option value="">Seleccione un producto</option>
              {productos.map((producto) => (
                <option key={producto.idProducto} value={producto.idProducto}>
                  {producto.nombre}
                </option>
              ))}
            </select>
            <div>
        <label>
          Productos:
          <select
            name="idProducto"
            value={formData.idProducto}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccione un producto</option>
            {productos.map((producto) => (
              <option key={producto.idProducto} value={producto.idProducto}>
                {producto.nombre}
              </option>
            ))}
          </select>
          <input
            type="number"
            name="cantidadVendida"
            value={formData.cantidadVendida}
            onChange={handleInputChange}
            required
          />
          <button
            type="button"
            onClick={() => handleAddProducto(formData.idProducto, formData.cantidadVendida)}
          >
            Agregar Producto
          </button>
        </label>
        <ul>
          {formData.productosSeleccionados.map((producto) => (
            <li key={producto.idProducto}>
              {producto.nombre} - Cantidad: {formData.cantidadVendida}
            </li>
          ))}
        </ul>
      </div>
          </div>
          <div className="inputbox">
            <input
              type="text"
              name="cantidadVendida"
              value={formData.cantidadVendida}
              onChange={handleInputChange}
              required
            />
            <span>Cantidad</span>
            <i></i>
          </div>
          <div className="inputbox">
            <input
              type="text"
              name="precioUnitario"
              value={formData.precio}
              onChange={handleInputChange}
              required
            />
            <span>Precio</span>
            <i></i>
          </div>
          <div className="inputbox">
            <input
              type="datetime-local"
              name="fecha"
              value={formData.fecha}
              onChange={handleInputChange}
              required
            />
            <i></i>
          </div>
          <div className="inputbox">
            <input
              type="text"
              name="TotalVenta"
              value={formData.TotalVenta}
              onChange={handleInputChange}
              contentEditable="false"
              required
            />
            <span>Total</span>
            <i></i>
          </div>
          <div className="button-container">
            <button type="submit">{venta ? 'Actualizar' : 'Guardar'}</button>
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
