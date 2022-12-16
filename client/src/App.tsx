import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Deposit from './Pages/Deposit';
import Home from './Pages/Home';
import WithDraw from './Pages/WithDraw';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/deposit' element={<Deposit/>}/>
          <Route path='/withdraw' element={<WithDraw/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
