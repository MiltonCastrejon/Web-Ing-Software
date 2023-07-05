import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import axios from "axios";
import FormProveedores from "../components/FormProveedores";
import "../styles/Prove.css"

export default function Proveedores() {
  const [proveedores, setProveedores] = useState([]);

  useEffect(() => {
    fetchProveedores();
  }, []);

  const fetchProveedores = () => {
    axios
      .get("http://localhost:3000/Proveedores")
      .then((response) => {
        setProveedores(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleGuardarProveedor = (proveedor) => {
    axios
      .post("http://localhost:3000/Proveedores", proveedor)
      .then((response) => {
        fetchProveedores();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Header
        Title="Proveedores"
        AddButton="Agregar"
        FormComponent={FormProveedores}
        onSave={handleGuardarProveedor} // Agregar el manejador de guardar proveedor
      />
      <div className="proveedores-container">
        {Array.isArray(proveedores) ? (
          proveedores.map((proveedor) => (
            <div key={proveedor.id} className="proveedor-card">
              <h3>{proveedor.nombre}</h3>
              <p>Dirección: {proveedor.direccion}</p>
              <p>Teléfono: {proveedor.telefono}</p>
            </div>
          ))
        ) : (
          <p>No hay proveedores disponibles</p>
        )}
      </div>
    </>
  );
}


