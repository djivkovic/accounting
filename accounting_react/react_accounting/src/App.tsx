import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, redirect } from 'react-router-dom';
import Home from './pages/Home';
import Nav from "./components/Nav";
import PricingPlan from './pages/PricingPlan';
import EditPricingPlan from './pages/EditPricingPlan';
import ViewAllPricingPlans from './pages/ViewAllPricingPlans';
import NotFound from './pages/NotFound';

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
        <Route path="edit-pricing-plan" element={<EditPricingPlan />}/>
        <Route path="view-all-pricing-plans" element={<ViewAllPricingPlans />}/>
        <Route path="/" element={<Home name={name} user_type={user_type}/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
