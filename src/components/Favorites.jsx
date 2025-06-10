import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const { favorites, isAuthenticated, toggleFavorite } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl text-white mb-4">Please Sign In to View Favorites</h2>
        <Link to="/login" className="bg-gradient-to-b from-white to-[#886AFF] text-black rounded-md px-6 py-2">
          Sign In
        </Link>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl text-white mb-4">No Favorite Coins Yet</h2>
        <p className="text-gray-400">Add coins to your favorites to track them here</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl text-white mb-6">Favorite Coins</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {favorites.map((coin) => (
          <div key={coin.id} className="bg-[#2A2D3A] rounded-lg p-4 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <img src={coin.image} alt={coin.name} className="w-8 h-8" />
                <h3 className="text-white font-bold">{coin.name}</h3>
              </div>
              <button
                onClick={() => toggleFavorite(coin)}
                className="text-yellow-400 hover:text-yellow-300"
              >
                ★
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-gray-400">Price</p>
                <p className="text-white">${coin.current_price?.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-400">24h Change</p>
                <p className={`${coin.price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {coin.price_change_percentage_24h?.toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites; 