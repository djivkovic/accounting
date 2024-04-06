import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Nav from "./components/Nav";
import PricingPlan from './pages/PricingPlan';

function App() {
  const [name, setName] = useState("");
  const [user_type, setUserType] = useState("");
  const [user_id, setUserId] = useState("");
  return (
    <div className="App">
     <BrowserRouter>
     <Nav name={name} setName={setName} setUserType={setUserType} user_id={user_id} setUserId={setUserId}/>
      <Routes>
        <Route path="pricing-plan" element={<PricingPlan name={name} user_type={user_type} user_id={user_id} />}/>
        <Route path="/" element={<Home name={name} user_type={user_type}/>}/>
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
