import { useState, useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=BTC', {
          method:'GET',
          headers: {
            "X-CMC_PRO_API_KEY":'533f68e6-ea99-4243-8aca-e68e6eaa2386',
            'Accept':'application/json',
            "Access-Control-Allow-Origin":"*"
          },
        });
        if (!response.ok){
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        let price = response.json.data.BTC
        alert(price);
        setData(response.json);
        setError(null);
      } catch (err){
        setData(null);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  
  return (
    <>
    <div className="flex">
      <div className="w-52 sm:w-80 flex justify-center items-center">
        {loading && (
          <div className="text-xl font-medium">Loading</div>
        )}
        {error && <div className="text-red-700">{error}</div>}

        <div className="bg-gray-100 flex-1 p-4 min-h-[550px]">
          <p>Hello</p>
        </div>
      </div>
  </div>
  </>
  )
}

export default App
