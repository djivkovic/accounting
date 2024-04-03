import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Nav from './components/Nav';
import PricingPlan from './pages/PricingPlan';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Nav/>
      <Routes>
        <Route path="pricing-plan" element={<PricingPlan />}/>
        <Route path="/" element={<Home />}/>
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
