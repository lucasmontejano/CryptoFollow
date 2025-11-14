// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Outlet } from 'react-router-dom'; // Importante para layout
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import MarketPage from './components/MarketTable';
import './App.css'; // Manter para os estilos da tabela

/* O Layout Mestre com a Navbar */
function Layout() {
  return (
    <div>
      <Navbar />
      <div className="App"> {/* Classe do App.css para centralizar o conteúdo */}
        <Outlet /> {/* O 'Outlet' renderiza a página da rota atual */}
      </div>
    </div>
  );
}

/* O Roteador Principal */
function App() {
  return (
    <Routes>
      {/* Todas as rotas dentro do 'Layout' terão a Navbar */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        {/* <Route path="*" element={<h1>Página não encontrada</h1>} /> */}
      </Route>
    </Routes>
  );
}

export default App;