import React, { useState, useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { Rutas } from './routers/routes';
import styled from 'styled-components';
import { Sidebar } from './components/Sidebar';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Ocultar el sidebar si está en la página de Login
    if (location.pathname === '/Login') {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [location]);

  return (
    <>
      <Container
        className={sidebarOpen ? 'sidebarState Activado' : 'sidebarState'}
      >
        {sidebarOpen && (
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}  />
        )}
        <Rutas />
      </Container>
    </>
  );
}

const Container = styled.div`

  display: grid;
  height: 100vh;
  grid-template-columns:  auto;
  background: transparent;
  &.Activado {
    grid-template-columns: 250px auto;
  }&.sidebarState{
  }
`;

export default function Root() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
