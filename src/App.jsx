import { useState, useEffect } from 'react';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur";

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }
      let json = await response.json(); // Attendre que la promesse soit résolue
      let price = json.bitcoin.eur;
      setData(price);
      setError(null);
    } catch (err) {
      setData(null);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      setLoading(true);
      fetchData();
    }, 20000); // Mise à jour toutes les 20 secondes

    return () => clearInterval(interval); // Nettoyage de l'intervalle
  }, []);

  return (
    <>
        <div className="card">
          {loading ? (
            <div className="loading">Loading...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            <div>
              <h1 className="title">Bitcoin Price</h1>
              <h2 className="price">{data} €</h2>
            </div>
          )}
        </div>
    </>
  );
}

export default App;
