import React, { useState, useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { Rutas } from './routers/routes';
import styled from 'styled-components';
import { Sidebar } from './components/Sidebar';

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/Login';
  const [sidebarOpen, setSidebarOpen] = useState(!isLoginPage);

  useEffect(() => {
    setSidebarOpen(!isLoginPage);
  }, [isLoginPage]);

  return (
    <Container
      className={sidebarOpen ? 'Activado' : 'Desactivado'}
      isLoginPage={isLoginPage}
      sidebarOpen={sidebarOpen}
    >
      {!isLoginPage && (
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      )}
      <Rutas />
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  ${({ isLoginPage }) => !isLoginPage && 'display: grid;'}
  ${({ isLoginPage, sidebarOpen }) =>
    !isLoginPage && sidebarOpen
      ? 'grid-template-columns: 250px auto;'
      : 'grid-template-columns: 90px auto;'}
`;

export default function Root() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
