import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Rutas } from './routers/routes';
import styled from 'styled-components';
import { Sidebar } from './components/Sidebar';

function App() {
  const [sidebarOpen, setsidebarOpen] = useState(false);

  return (
    <>
      <BrowserRouter>
        <Container
          className={sidebarOpen ? 'sidebarState Activado' : 'sidebarState'}
        >
          <Sidebar sidebarOpen={sidebarOpen} setsidebarOpen={setsidebarOpen} />
          <Rutas />
        </Container>
      </BrowserRouter>
    </>
  );
}

const Container = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 90px auto;
  background: #f5f5f5;
  &.Activado {
    grid-template-columns: 250px auto;
  }
`;

export default App;
