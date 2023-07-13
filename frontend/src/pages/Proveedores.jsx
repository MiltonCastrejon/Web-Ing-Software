import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components'; // Agrega esta línea
import Header from '../components/Header';
import FormularioProveedores from '../components/FormProveedores';
import '../styles/Prove.css';

const Proveedores = () => {
  const [proveedores, setProveedores] = useState([]);
  const [editProveedor, setEditProveedor] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const tableRef = useRef(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [proveedorToDelete, setProveedorToDelete] = useState(null);

  useEffect(() => {
    fetchProveedores();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (tableRef.current) {
        const tableHeight = tableRef.current.offsetHeight;
        const containerHeight = tableRef.current.parentNode.offsetHeight;
        setShowScrollBar(tableHeight > containerHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const fetchProveedores = () => {
    axios
      .get('http://localhost:3000/Proveedores')
      .then((response) => {
        setProveedores(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEliminarProveedor = () => {
    axios
      .delete(`http://localhost:3000/Proveedores/${proveedorToDelete}`)
      .then((response) => {
        fetchProveedores();
      })
      .catch((error) => {
        console.error(error);
      });
    setShowConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const handleOpenForm = () => {
    setShowForm(true);
    setEditProveedor(null);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleSaveForm = () => {
    fetchProveedores();
    handleCloseForm();
  };

  const handleEditarProveedor = (proveedor) => {
    setEditProveedor(proveedor);
    setShowForm(true);
  };

  const [showScrollBar, setShowScrollBar] = useState(false);

  return (
    <div>
      <Header Title="Proveedores" />
      <button className="add-button" onClick={handleOpenForm}>
        Nuevo Proveedor
      </button>
      <div
        className={`proveedores-container ${showScrollBar ? 'scrollable' : ''}`}
      >
        {Array.isArray(proveedores) && proveedores.length > 0 ? (
          <table className="proveedores-table" ref={tableRef}>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Dirección</th>
                <th>Teléfono</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {proveedores.map((proveedor) => (
                <tr key={proveedor.id}>
                  <td>{proveedor.nombre}</td>
                  <td>{proveedor.direccion}</td>
                  <td>{proveedor.telefono}</td>
                  <td className="btn-container">
                    <button
                      className="btn-editar"
                      onClick={() => handleEditarProveedor(proveedor)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn-eliminar"
                      onClick={() => {
                        setProveedorToDelete(proveedor.id);
                        setShowConfirmation(true);
                      }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay proveedores disponibles</p>
        )}
      </div>

      {showForm && (
        <div className="floating-form">
          <FormularioProveedores
            proveedor={editProveedor}
            onClose={handleCloseForm}
            onSave={handleSaveForm}
          />
        </div>
      )}
      {showConfirmation && (
        <ConfirmationDialogBox
          message="¿Estás seguro de eliminar a este proveedor?"
          onCancel={handleCancelDelete}
          onConfirm={handleEliminarProveedor}
        />
      )}
    </div>
  );
};

export default Proveedores;

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
