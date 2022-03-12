import React from 'react';
import { SnackbarProvider } from 'notistack';
import MenuPrincipal from './componets/menu';

function App() {
  return (
    <div>
      <SnackbarProvider maxSnack={3}>
        <MenuPrincipal/>
      </SnackbarProvider>
    </div>
  );
}

export default App;
