import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import styled from 'styled-components';
import FormularioProductos from '../components/FormProductos';

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [editProducto, setEditProducto] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showScrollBar, setShowScrollBar] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [productoToDelete, setProductoToDelete] = useState(null);

  useEffect(() => {
    fetchProductos();
    fetchCategorias();
  }, []);

  const fetchProductos = () => {
    axios
      .get('http://localhost:3000/Productos')
      .then((response) => {
        setProductos(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchCategorias = () => {
    axios
      .get('http://localhost:3000/Categorias')
      .then((response) => {
        setCategorias(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEliminarProducto = (productoId) => {
    setProductoToDelete(productoId);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    axios
      .delete(`http://localhost:3000/Productos/${productoToDelete}`)
      .then((response) => {
        fetchProductos();
      })
      .catch((error) => {
        console.error(error);
      });
    setShowConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const handleEditarProducto = (producto) => {
    setEditProducto(producto);
    setShowForm(true);
  };

  const handleOpenForm = () => {
    setEditProducto(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleSaveForm = () => {
    fetchProductos();
    handleCloseForm();
  };

  useEffect(() => {
    const handleResize = () => {
      const tableHeight =
        document.getElementById('productos-table')?.offsetHeight;
      const containerHeight = document.getElementById(
        'productos-container'
      )?.offsetHeight;
      setShowScrollBar(tableHeight > containerHeight);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <Header Title="PRODUCTOS" />
      <button className="add-button" onClick={handleOpenForm}>
        Nuevo Producto
      </button>
      <ProductsContainer
        className={`productos-container ${showScrollBar ? 'scrollable' : ''}`}
      >
        {productos.length > 0 ? (
          <table className="proveedores-table" id="productos-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Fabricante</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr key={producto.idProductos}>
                  <td>{producto.nombre}</td>
                  <td>{producto.descripcion}</td>
                  <td>S/ {producto.precio}</td>
                  <td>{producto.stock}</td>
                  <td>{producto.fabricante}</td>

                  <td>
                    <button
                      className="btn-editar"
                      onClick={() => handleEditarProducto(producto)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn-eliminar"
                      onClick={() =>
                        handleEliminarProducto(producto.idProductos)
                      }
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay productos disponibles</p>
        )}
      </ProductsContainer>

      {showForm && (
        <div className="floating-form">
          <FormularioProductos
            onClose={handleCloseForm}
            onSave={handleSaveForm}
            producto={editProducto}
            categorias={categorias}
          />
        </div>
      )}

      {showConfirmation && (
        <ConfirmationDialogBox
          message="¿Estás seguro de eliminar este producto?"
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}
const ProductsContainer = styled.div`
  overflow-x: auto;
  max-height: 85vh;
  display: grid;
  place-items: center;
  margin-top: 25px;
  position: relative;
}
`;
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9998;
  backdrop-filter: blur(6px);
`;

const ConfirmationDialog = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 9999;
`;

const ConfirmationMessage = styled.p`
  margin-bottom: 10px;
`;

const ConfirmationButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ConfirmationButton = styled.button`
  margin: 15px 5px 0;
  padding: 8px 16px;
  border-radius: 6px;
  border: 2px solid #4287ef;
  background: #fff;
  color: #4287ef;
  font-weight: bold;
  cursor: pointer;
  &: hover {
    background: #4287ef;
    color: #fff;
  }
`;

function ConfirmationDialogBox({ message, onCancel, onConfirm }) {
  return (
    <Overlay>
      <ConfirmationDialog>
        <ConfirmationMessage>{message}</ConfirmationMessage>
        <ConfirmationButtonContainer>
          <ConfirmationButton onClick={onCancel}>Cancelar</ConfirmationButton>
          <ConfirmationButton onClick={onConfirm}>Aceptar</ConfirmationButton>
        </ConfirmationButtonContainer>
      </ConfirmationDialog>
    </Overlay>
  );
}
