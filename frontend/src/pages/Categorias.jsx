import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import styled from 'styled-components';
import FormularioCategorias from '../components/FormCategorias';

export default function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [editCategoria, setEditarCategoria] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showScrollBar, setShowScrollBar] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [categoriaToDelete, setCategoriaToDelete] = useState(null);

  useEffect(() => {
    fetchCategorias();
  }, []);

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

  const handleEliminarCategoria = (categoriaId) => {
    setCategoriaToDelete(categoriaId);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    axios
      .delete(`http://localhost:3000/Categorias/${categoriaToDelete}`)
      .then((response) => {
        fetchCategorias();
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
    setEditarCategoria(null);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleSaveForm = () => {
    fetchCategorias();
    handleCloseForm();
  };

  const handleEditarCategoria = (categoria) => {
    setEditarCategoria(categoria);
    setShowForm(true);
  };

  return (
    <div>
      <Header Title="Categorias" />
      <button className="add-button" onClick={handleOpenForm}>
        Nueva Categoria
      </button>
      <div
        className={`proveedores-container ${showScrollBar ? 'scrollable' : ''}`}
      >
        {Array.isArray(categorias) && categorias.length > 0 ? (
          <table className="proveedores-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripcion</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {categorias.map((categoria) => (
                <tr key={categoria.idCategoria}>
                  <td>{categoria.nombrecategoria}</td>
                  <td>{categoria.descripcionCategoria}</td>
                  <td className="btn-container">
                    <button
                      className="btn-editar"
                      onClick={() => handleEditarCategoria(categoria)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn-eliminar"
                      onClick={() =>
                        handleEliminarCategoria(categoria.idCategoria)
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
          <p>No hay categorias disponibles</p>
        )}
      </div>

      {showForm && (
        <div className="floating-form">
          <FormularioCategorias
            categoria={editCategoria}
            onClose={handleCloseForm}
            onSave={handleSaveForm}
          />
        </div>
      )}

      {showConfirmation && (
        <ConfirmationDialogBox
          message="¿Estás seguro de eliminar esta categoría?"
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
