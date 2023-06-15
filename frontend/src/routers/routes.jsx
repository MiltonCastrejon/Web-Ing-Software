import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import About from '../pages/About';
import Product from '../pages/Product';


export function Rutas() {
  return (
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/About" element={<About />} />
        <Route path="/Product" element={<Product />} />
      </Routes>
   
  );
}
