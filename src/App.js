import React from 'react';
import { SnackbarProvider } from 'notistack';
import './App.css'
import MenuPrincipal from './componets/menu';
import Tabla from './componets/Tabla';
import { Container } from '@mui/material';


function App() {
  return (
    <div>
      <SnackbarProvider maxSnack={3}>
        <MenuPrincipal/>
        <Container>
          <Tabla /> 
        </Container>
      </SnackbarProvider>
    </div>
  );
}

export default App;
