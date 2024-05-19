import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, redirect } from 'react-router-dom';
import Home from './pages/Home';
import Nav from "./components/Nav";
import PricingPlan from './pages/PricingPlan';
import EditPricingPlan from './pages/EditPricingPlan';
import ViewAllPricingPlans from './pages/ViewAllPricingPlans';
import NotFound from './pages/NotFound';
import PricingPlanShop from './pages/PricingPlansShop';
import ViewAllTransactions from './pages/ViewAllTransactions';
import Statistic from './pages/Statistic';
import ViewAllContracts from './pages/ViewAllContracts';
import ViewAllAcceptedContracts from './pages/ViewAllAcceptedContracts';
import StatisticByMonth from './pages/StatisticByMonth';

function App() {
  const [name, setName] = useState("");
  const [user_type, setUserType] = useState("");
  const [user_id, setUserId] = useState("");
  return (
    <div className="App">
     <BrowserRouter>
     <Nav name={name} setName={setName} setUserType={setUserType} user_id={user_id} setUserId={setUserId} user_type={user_type}/>
      <Routes>
        <Route path="pricing-plan" element={<PricingPlan name={name} user_type={user_type} user_id={user_id} />}/>
        <Route path="pricing-plan-shop" element={<PricingPlanShop name={name} user_type={user_type} user_id={user_id}/>}/>
        <Route path="edit-pricing-plan/:id" element={<EditPricingPlan name={name} user_type={user_type} user_id={user_id} />}/>
        <Route path="view-all-pricing-plans" element={<ViewAllPricingPlans name={name} user_type={user_type} user_id={user_id}/>}/>
        <Route path="view-all-transactions" element={<ViewAllTransactions name={name} user_type={user_type} user_id={user_id}/>}/>
        <Route path="statistic" element={<Statistic/>}/>
        <Route path="view-all-contracts" element={<ViewAllContracts user_type={user_type}/>}/>
        <Route path="view-accepted-contracts" element={<ViewAllAcceptedContracts user_type={user_type}/>}/>
        <Route path="view-transactions-by-month" element={<StatisticByMonth />}/>
        <Route path="/" element={<Home name={name} user_type={user_type}/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
