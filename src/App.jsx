import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import './style.css';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function App() {
  const [multiplier, setMultiplier] = useState(1);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newMultiplier = (Math.random() * 10).toFixed(2);
      setMultiplier(newMultiplier);
      setHistory(prev => [...prev.slice(-9), newMultiplier]);
      const crashSound = new Audio('/crash.mp3');
      crashSound.play();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const data = {
    labels: history.map((_, i) => i + 1),
    datasets: [{
      label: 'Histórico',
      data: history,
      borderColor: 'red',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      tension: 0.4,
      fill: true,
    }]
  };

  return (
    <div className="app">
      <h1>Aviator Simulador</h1>
      <div className="multiplier">{multiplier}x</div>
      <Line data={data} />
    </div>
  );
}