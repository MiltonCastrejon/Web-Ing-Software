// codigo de rutes.jsx
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import About from '../pages/About';
import Productos from '../pages/Productos';
import Clientes from '../pages/Clientes';
import Pedido from '../pages/Pedido';
import Proveedores from '../pages/Proveedores';
import Categorias from '../pages/Categorias';
import Operaciones from '../pages/Operaciones';



export function Rutas() {
  return (
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/About" element={<About />} />
        <Route path="/Categorias" element={<Categorias />} />
        <Route path="/Productos" element={<Productos />} />
        <Route path="/Pedido" element={<Pedido />} />
        <Route path="/Clientes" element={<Clientes />} />
        <Route path="/Operaciones" element={<Operaciones />} />
        <Route path="/Proveedores" element={<Proveedores />} />
      </Routes>
   
  );
}
