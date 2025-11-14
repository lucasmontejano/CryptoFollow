// src/App.jsx
import { useState, useEffect } from 'react';
import '../App.css';

function    MarketTable() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch('http://127.0.0.1:8000/api/top100');
        const data = await response.json();
        setCoins(data);
      } catch (error) {
        console.error("Falha ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    // (Pode adicionar o intervalo de 5min aqui depois)
  }, []);

  return (
    <div className="App">
      <h1>Dashboard de Criptomoedas</h1>

      {loading && <p>Carregando dados...</p>}

      {!loading && (
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Moeda</th>
              <th>Preço (USD)</th>
              <th>Mudança (24h)</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <tr key={coin.id}>
                <td>{coin.market_cap_rank}</td>
                
                {/* --- Célula da Moeda (Atualizada) --- */}
                <td>
                  <div className="coin-cell">
                    <img src={coin.image} alt={coin.name} className="coin-logo" />
                    {coin.name} ({coin.symbol.toUpperCase()})
                  </div>
                </td>
                
                <td>${coin.current_price.toLocaleString()}</td>
                
                {/* --- Célula de Preço (Atualizada) --- */}
                {/* Usamos classes CSS em vez de 'style' inline */}
                <td className={coin.price_change_percentage_24h > 0 ? 'price-up' : 'price-down'}>
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MarketTable;