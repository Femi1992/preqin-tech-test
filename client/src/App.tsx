import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InvestorsList from './InvestorList.tsx'
import InvestorDetails from './InvestorDetail.tsx';

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