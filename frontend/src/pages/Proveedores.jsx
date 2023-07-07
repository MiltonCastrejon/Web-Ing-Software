import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import FormularioProveedores from '../components/FormProveedores';
import '../styles/Prove.css';

const Proveedores = () => {
  const [proveedores, setProveedores] = useState([]);
  const [editProveedor, setEditProveedor] = useState(null);

  useEffect(() => {
    fetchProveedores();
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

  const handleGuardarProveedor = (proveedor) => {
    if (editProveedor) {
      axios
        .put(`http://localhost:3000/Proveedores/${editProveedor.id}`, proveedor)
        .then((response) => {
          fetchProveedores();
          setEditProveedor(null);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      axios
        .post('http://localhost:3000/Proveedores', proveedor)
        .then((response) => {
          fetchProveedores();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleEditarProveedor = (proveedor) => {
    setEditProveedor(proveedor);
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

  return (
    <div>
      <Header
        Title="Proveedores"
        AddButton="Agregar"
        FormComponent={FormularioProveedores}
        onSave={handleGuardarProveedor}
      />
      <div className="proveedores-container">
        {Array.isArray(proveedores) && proveedores.length > 0 ? (
          <table className="proveedores-table">
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

      {editProveedor && (
        <FormularioProveedores
          onClose={() => setEditProveedor(null)}
          proveedor={editProveedor}
        />
      )}
    </div>
  );
};

export default Proveedores;
