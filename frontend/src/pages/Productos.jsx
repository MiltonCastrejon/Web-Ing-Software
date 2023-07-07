import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import CardProductos from '../components/CardProductos';
import axios from 'axios';
import FormularioProductos from '../components/FormProductos';

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [editProducto, setEditProducto] = useState(null);

  useEffect(() => {
    fetchProductos();
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

  const handleGuardarProducto = (producto) => {
    if (editProducto) {
      axios
        .put(`http://localhost:3000/Productos/${editProducto.id}`, producto)
        .then((response) => {
          fetchProductos();
          setEditProducto(null);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      axios
        .post('http://localhost:3000/Productos', producto)
        .then((response) => {
          fetchProductos();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  const handleEditarProducto = (producto) => {
    setEditProducto(producto);
  };
  const handleEliminarProducto = (productoId) => {
    axios
      .delete(`http://localhost:3000/Productos/${productoId}`)
      .then((response) => {
        fetchProductos();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <Header
        Title="PRODUCTOS"
        AddButton="Añadir Producto"
        FormComponent={FormularioProductos}
        onSave={handleGuardarProducto}
      />
      <div className="Card-Container">
        {productos.map((producto) => (
          <CardProductos
            key={producto.id}
            ProTitle={producto.nombre}
            ProImage={producto.imagen}
            ProPrice={`S/ ${producto.precio}`}
            ProDescription={producto.descripcion}
          />
        ))}
        
      </div>

      <FormularioProductos
        onClose={() => setEditProducto(null)}
        producto={editProducto}
        
      />
    </div>
  );
}
