import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainLayout from './MainLayout';
import { ThemeProvider, useTheme } from './components/ThemeContext'; // <- make sure useTheme is exported

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <MainLayout />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
