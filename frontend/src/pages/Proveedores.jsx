import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import FormularioProveedores from '../components/FormProveedores';
import '../styles/Prove.css';

const Proveedores = () => {
  const [proveedores, setProveedores] = useState([]);
  const [editProveedor, setEditProveedor] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const tableRef = useRef(null);

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

  const handleEliminarProveedor = (proveedorId) => {
    axios
      .delete(`http://localhost:3000/Proveedores/${proveedorId}`)
      .then((response) => {
        fetchProveedores();
      })
      .catch((error) => {
        console.error(error);
      });
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
                  <td>
                    <button onClick={() => handleEditarProveedor(proveedor)}>
                      Editar
                    </button>
                    <button
                      onClick={() => handleEliminarProveedor(proveedor.id)}
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
    </div>
  );
};

export default Proveedores;

/*
  const handleGuardarProveedor = (proveedor) => {
    if (editProveedor) {
      axios
        .put(`http://localhost:3000/Proveedores/${editProveedor.id}`, proveedor)
        .then((response) => {
          setEditProveedor(null);
          fetchProveedores(); // Actualiza la lista de proveedores después de la edición
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      axios
        .post('http://localhost:3000/Proveedores', proveedor)
        .then((response) => {
          fetchProveedores(); // Actualiza la lista de proveedores después de la creación
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleEditarProveedor = (proveedor) => {
    setEditProveedor(proveedor);
  };
  */
