import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './App.css';

function InvestorDetails() {
  const { id } = useParams();
  const [investor, setInvestor] = useState(null);
  const [commitments, setCommitments] = useState([]);

  useEffect(() => {
    fetch(`/investor/${id}`).then(
      res => res.json()
    ).then(
      data => {
        setInvestor(data.investor);
        setCommitments(data.commitments);
      }
    )
  }, [id]);

  return (
    <div className="investor-details">
      {investor ? (
        <div>
          <h2>{investor.investor_name}</h2>
          <p>Type: {investor.investor_type}</p>
          <p>Country: {investor.investor_country}</p>
          <p>Date Added: {investor.date_added}</p>
          <p>Last Updated: {investor.investor_last_updated}</p>
          <h3>Commitments</h3>
          <table className="commitments-table">
            <thead>
              <tr>
                <th>Asset Class</th>
                <th>Amount</th>
                <th>Currency</th>
              </tr>
            </thead>
            <tbody>
              {commitments.map((commitment, i) => (
                <tr key={i}>
                  <td>{commitment.commitment_asset_class}</td>
                  <td>{commitment.commitment_amount}</td>
                  <td>{commitment.commitment_currency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default InvestorDetails;