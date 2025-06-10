import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, toggleFavorite, isFavorite } = useAuth();

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
        );
        const data = await response.json();
        setCoins(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching coins:', error);
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#181A20]">
        <Navbar />
        <div className="flex justify-center items-center h-[80vh]">
          <div className="text-white text-2xl">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#181A20]">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl text-white mb-8">Top 100 Cryptocurrencies</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {coins.map((coin) => (
            <div key={coin.id} className="bg-[#2A2D3A] rounded-lg p-4 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <img src={coin.image} alt={coin.name} className="w-8 h-8" />
                  <h3 className="text-white font-bold">{coin.name}</h3>
                </div>
                <button
                  onClick={() => toggleFavorite(coin)}
                  className={`text-2xl ${isFavorite(coin.id) ? 'text-yellow-400' : 'text-gray-400'} hover:text-yellow-300`}
                  title={isAuthenticated ? "Add to favorites" : "Sign in to add favorites"}
                >
                  ★
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-400">Price</p>
                  <p className="text-white">${coin.current_price.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-400">24h Change</p>
                  <p className={`${coin.price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Market Cap</p>
                  <p className="text-white">${coin.market_cap.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-400">Volume</p>
                  <p className="text-white">${coin.total_volume.toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Coins;