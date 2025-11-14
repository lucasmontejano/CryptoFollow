// src/pages/HomePage.jsx
import React from 'react';
import CryptoChartCard from '../components/CryptoChartCard';
import MarketTable from '../components/MarketTable'; // <-- 1. IMPORTAR
import './HomePage.css';

function HomePage() {
  return (
    // 2. ADICIONAR O GRID CONTAINER
    <div className="home-layout-grid"> 

      {/* --- COLUNA DA ESQUERDA --- */}
      <div className="left-column">
        <header className="home-header">
          <h1>Bem-vindo ao <span className="highlight-red">CryptoFollow</span></h1>
          <p>Sua visão instantânea do mercado.</p>
        </header>

        <h2>Principais Moedas</h2>

        <div className="charts-grid">
          <CryptoChartCard 
            coinId="bitcoin" 
            coinName="Bitcoin" 
            chartColor="#f7931a" 
          />
          <CryptoChartCard 
            coinId="ethereum" 
            coinName="Ethereum" 
            chartColor="#627eea" 
          />
          <CryptoChartCard 
            coinId="solana" 
            coinName="Solana" 
            chartColor="#9945FF" 
          />
          <CryptoChartCard 
            coinId="binancecoin" 
            coinName="BNB" 
            chartColor="#F0B90B" 
          />
        </div>
      </div>

      {/* --- COLUNA DA DIREITA --- */}
      <div className="right-column">
        <h2>Mercado Completo</h2>
        <MarketTable /> {/* <-- 3. RENDERIZAR A TABELA AQUI */}
      </div>

    </div>
  );
}

export default HomePage;