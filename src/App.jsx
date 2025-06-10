import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useState, createContext } from 'react';
import Home from './pages/Home';
import Exchanges from './pages/Exchanges'
import Coins from './pages/Coins'
import News from './pages/News'
import Favorites from './components/Favorites'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'

export const AppContext = createContext();

const App = () => {
  const [currency, setCurrency] = useState("bitcoin");
  const [vsCurrency, setVsCurrency] = useState("usd");
  const [showCapSide, setShowCapSide] = useState(false);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/coins",
      element: <Coins />,
    },
    {
      path: "/exchanges",
      element: <Exchanges />,
    },
    {
      path: "/news",
      element: <News />
    },
    {
      path: "/favorites",
      element: (
        <ProtectedRoute>
          <Favorites />
        </ProtectedRoute>
      )
    },
    {
      path: "/login",
      element: <Login />
    }
  ]);

  return (
    <AuthProvider>
      <AppContext.Provider value={{currency, setCurrency, vsCurrency, setVsCurrency, showCapSide, setShowCapSide}}>
        <div className='bg-[#181A20]'>
          <RouterProvider router={router} />
        </div>
      </AppContext.Provider>
    </AuthProvider>
  )
}

export default App
