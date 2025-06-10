<<<<<<< HEAD
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
=======
import React from "react"
import { useContext } from "react";
import { AppContext } from "../App";
import Currencies from "../components/Currencies";
import { useState, useEffect } from "react";
import { getAllCurrencies } from "../context/coinContext";
import Navbar from "../components/Navbar";

const Coins = () => {
  const {currency, vsCurrency, setVsCurrency, showCapSide, setShowCapSide} = useContext(AppContext);
  const [currencies, setCurrencies] = useState([]);
  const currencyChange = (event) => {
    setVsCurrency(event.target.value);
  }
  useEffect(() => {
    const getCurrency = async () => {
      const data = await getAllCurrencies(vsCurrency);
      setCurrencies([...data])
    }
    getCurrency();
  }, [vsCurrency]);
  
  return (
    <div>
      <Navbar/>
      <div className= "mx-[100px] flex flex-col gap-10 y-[50px]">
        <div className="flex flex-col">
          <h1 className="text-[3rem] text-white">Todays Top 100 Currencies</h1>
          <div className="text-gray-400 font-medium text-2xl">The global crypto market cap is</div>

        </div>
        
        <div className="bg-purple-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-100">
          <div className="border-t-[1px] border-gray-100">
            {currencies.map((coin) => 
                    <Currencies
                      key={coin.name}
                      name={coin.name} 
                      image={coin.image} 
                      currentPrice={coin.current_price}
                      marketCap={coin.market_cap}
                      id={coin.id}
                      pickedCurrency={currency}
                      volume={coin.total_volume}
                      symbol={coin.symbol}
                      />
                  )}

          </div>
          
        </div>
        
      </div>
      
    </div>
  )
}

export default Coins
>>>>>>> 7475bcd75ece947ac85eba8bb4077e3c417fae0b
