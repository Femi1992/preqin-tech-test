import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InvestorsList from './InvestorList'
import InvestorDetails from './InvestorDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InvestorsList />} />
        <Route path="/investor/:id" element={<InvestorDetails />} />
      </Routes>
    </Router>
  );
}

export default App;