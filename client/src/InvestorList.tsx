import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

interface Investor {
  id: number;
  investor_name: string;
  investor_type: string;
  investor_country: string;
  date_added: string;
  investor_last_updated: string;
  total_commitment_billion: number;
}

function InvestorsList() {
  const [investors, setInvestors] = useState<Investor[]>([]);

  useEffect(() => {
    fetch("/investors").then(
      res => res.json()
    ).then(
      data => {
        setInvestors(data);
      }
    )
  }, []);

  return (
    <div className="investors-list">
      {investors.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <table className="investors-table">
          <thead>
            <tr>
              <th>ID</th>  
              <th>Name</th>
              <th>Type</th>
              <th>Date Added</th>
              <th>Country</th>
              <th>Total Commitment</th>
            </tr>
          </thead>
          <tbody>
            {investors.map((investor, i) => (
              <tr key={i}>
                <td>{investor.id}</td>
                <td><Link to={`/investor/${investor.id}`}>{investor.investor_name}</Link></td>
                <td>{investor.investor_type}</td>
                <td>{investor.date_added}</td>
                <td>{investor.investor_country}</td>
                <td>{investor.total_commitment_billion}B</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default InvestorsList;