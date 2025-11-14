// src/components/CryptoChartCard.jsx
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './CryptoChartCard.css'; // Vamos criar este CSS

// Formata o Tooltip (caixa que aparece no hover)
const CustomTooltip = ({ active, payload, label, coinName }) => {
  if (active && payload && payload.length) {
    const date = new Date(label).toLocaleDateString();
    const price = payload[0].value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    return (
      <div className="chart-tooltip">
        <p>{date}</p>
        <p>{coinName}: <strong>{price}</strong></p>
      </div>
    );
  }
  return null;
};

// O Componente Principal do Card
function CryptoChartCard({ coinId, coinName, chartColor }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchChartData() {
      try {
        setLoading(true);
        const response = await fetch(`http://127.0.0.1:8000/api/coin/${coinId}/history`);
        const apiData = await response.json();

        // A API retorna [timestamp, price]. Recharts prefere objetos.
        const formattedData = apiData.map(item => ({
          timestamp: item[0],
          price: item[1]
        }));
        setData(formattedData);

      } catch (error) {
        console.error(`Falha ao buscar gráfico ${coinId}:`, error);
      } finally {
        setLoading(false);
      }
    }
    fetchChartData();
  }, [coinId]); // Roda de novo se o coinId mudar

  return (
    <div className="chart-card">
      <h3 className="chart-title" style={{ color: chartColor }}>{coinName} (30d)</h3>
      
      {loading && <p>Carregando gráfico...</p>}
      
      {!loading && (
        <div className="chart-wrapper">
          {/* ResponsiveContainer faz o gráfico se adaptar ao tamanho do card */}
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={data}>
              <defs>
                {/* Cria o gradiente para a área do gráfico */}
                <linearGradient id={`color-${coinId}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartColor} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={chartColor} stopOpacity={0.1} />
                </linearGradient>
              </defs>

              <XAxis dataKey="timestamp" hide /> {/* Esconde o eixo X */}
              
              <Tooltip 
                content={<CustomTooltip coinName={coinName} />} 
                cursor={{ stroke: '#e53935', strokeWidth: 1 }} // Linha vermelha no hover
              />
              
              <Area
                type="monotone"
                dataKey="price"
                stroke={chartColor} // Cor da linha
                fill={`url(#color-${coinId})`} // Cor do preenchimento (gradiente)
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default CryptoChartCard;