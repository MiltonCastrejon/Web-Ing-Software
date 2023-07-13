import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import '../styles/Prove.css';
import jsPDF from 'jspdf';
import FormularioVentas from '../components/FormVentas';

export default function Ventas() {
  const [ventas, setVentas] = useState([]);
  const [editVenta, setEditVenta] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetchVentas();
    fetchProductos();
  }, []);

  const fetchVentas = () => {
    axios
      .get('http://localhost:3000/Ventas')
      .then((response) => {
        setVentas(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

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

  const handleOpenForm = () => {
    setShowForm(true);
    setEditVenta(null);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleSaveForm = () => {
    fetchVentas();
    handleCloseForm();
  };

  const handleEditarVenta = (venta) => {
    setEditVenta(venta);
    setShowForm(true);
  };
  const generarPDF = (venta) => {
    const doc = new jsPDF();

    // Título de la factura
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('Factura de Venta', 105, 20, { align: 'center' });

    // Datos de la venta
    doc.setFontSize(12);
    doc.text(`Cliente: ${venta.NombreCliente}`, 20, 40);
    doc.text(`Fecha: ${venta.fechaVenta}`, 20, 50);

    // Tabla con los detalles de la venta
    const detalles = [
      ['Descripción', 'Precio Uni.', 'Cantidad', 'Subtotal'],
      ['Producto 1', '10.00', '2', '20.00'],
      ['Producto 2', '5.00', '3', '15.00'],
      ['Producto 3', '8.00', '1', '8.00'],
    ];
    const tableHeight = 20;
    const tableWidth = 170;
    const cellSpacing = 2;
    const xOffset = 20;
    const yOffset = 60;

    doc.setFillColor(230, 230, 230);
    doc.rect(xOffset, yOffset, tableWidth, tableHeight, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.text('Descripción', xOffset + cellSpacing, yOffset + 12);
    doc.text('Precio Uni.', xOffset + 60, yOffset + 12);
    doc.text('Cantidad', xOffset + 100, yOffset + 12);
    doc.text('Subtotal', xOffset + 140, yOffset + 12);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    for (let i = 0; i < detalles.length; i++) {
      const row = detalles[i];
      for (let j = 0; j < row.length; j++) {
        doc.text(row[j], xOffset + cellSpacing + j * 40, yOffset + 24 + i * 12);
      }
    }

    // Total de la venta
    const total = venta.TotalVenta;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text(`Total: S/${total.toFixed(2)}`, 20, yOffset + tableHeight + 30);
    const pdfBlob = doc.output('blob');

    // Crear una URL del objeto Blob
    const pdfURL = URL.createObjectURL(pdfBlob);

    // Abrir una nueva ventana o pestaña del navegador con la URL del PDF
    const printWindow = window.open(pdfURL, '_blank');
    //doc.save(venta.NombreCliente+'.pdf');
  };
  const handleImprimir = (venta) => {
    generarPDF(venta);
  };
  return (
    <div>
      <Header Title="Ventas" />
      <button className="add-button" onClick={handleOpenForm}>
        Nueva Venta
      </button>
      <div
        className={`proveedores-container ${
          ventas.length > 0 ? 'scrollable' : ''
        }`}
      >
        {Array.isArray(ventas) && ventas.length > 0 ? (
          <table className="proveedores-table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Fecha</th>
                <th>Precio Uni.</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {ventas.map((venta) => (
                <tr key={venta.idVenta}>
                  <td>{venta.NombreCliente}</td>
                  <td>{venta.fechaVenta}</td>
                  <td> {venta.precio}</td>
                  <td>S/ {venta.TotalVenta}</td>
                  <td className="btn-container">
                    <button
                      className="btn-editar"
                      onClick={() => handleEditarVenta(venta)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn-descargar"
                      onClick={() => handleImprimir(venta)}
                    >
                      IMPRIMIR
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay ventas disponibles</p>
        )}
      </div>
      {showForm && (
        <div className="floating-form">
          <FormularioVentas
            venta={editVenta}
            onClose={handleCloseForm}
            onSave={handleSaveForm}
            productos={productos}
          />
        </div>
      )}
    </div>
  );
}
