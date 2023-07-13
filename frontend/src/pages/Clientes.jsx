import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import styled from 'styled-components';
import FormularioClientes from '../components/FormClientes';

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [editCliente, setEditarCliente] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showScrollBar, setShowScrollBar] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [clienteToDelete, setClienteToDelete] = useState(null);

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = () => {
    axios
      .get('http://localhost:3000/Clientes')
      .then((response) => {
        setClientes(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleEliminarClientes = (clienteId) => {
    setClienteToDelete(clienteId);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    axios
      .delete(`http://localhost:3000/Clientes/${clienteToDelete}`)
      .then((response) => {
        fetchClientes();
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
    setEditarCliente(null);
  };
  const handleCloseForm = () => {
    setShowForm(false);
  };
  const handleSaveCliente = (cliente) => {
    fetchClientes();
    setShowForm(false);
  };
  const handleEditarClientes = (cliente) => {
    setEditarCliente(cliente);
    setShowForm(true);
  };
  return (
    <div>
      <Header Title="CLIENTES" />
      <button className="add-button" onClick={handleOpenForm}>
        Agregar Cliente
      </button>
      <div
        className={`proveedores-container ${showScrollBar ? 'scrollable' : ''}`}
      >
        {Array.isArray(clientes) && clientes.length > 0 ? (
          <table className="proveedores-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>DNI</th>
                <th>Direccion</th>
                <th>Telefono</th>
                <th>Acciones</th>

              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <tr key={cliente.idCliente}>
                  <td>{cliente.nombreCliente}</td>
                  <td>{cliente.DNI}</td>
                  <td>{cliente.direccion}</td>
                  <td>{cliente.telefono}</td>
                  <td className="btn-container">
                    <button
                      className="btn-editar"
                      onClick={() => handleEditarClientes(cliente)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn-eliminar"
                      onClick={() => handleEliminarClientes(cliente.idCliente)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay clientes disponibles</p>
        )}
      </div>

      {showForm && (
        <div className="floating-form">
          <FormularioClientes
            cliente={editCliente}
            onClose={handleCloseForm}
            onSave={handleSaveCliente}
          />
        </div>
      )}

      {showConfirmation && (
        <ConfirmationDialogBox
          message="¿Estás seguro de eliminar Cliente?"
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}

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
